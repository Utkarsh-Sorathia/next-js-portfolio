import { NextResponse } from "next/server";
// @ts-ignore: types for 'resend' are .d.mts and not compatible with current moduleResolution
import { Resend } from "resend";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import Strings from "@/constants/strings";
import { contactRatelimit, getClientIp, isAllowed } from "@/lib/ratelimit";
import { verifyRecaptcha } from "@/lib/recaptcha";

import { getContactNotificationEmailHtml } from "@/emails/ContactNotificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

// Strings only (blocks NoSQL operator objects) with sane length caps.
const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  gRecaptchaToken: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    if (!(await isAllowed(contactRatelimit, ip))) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }

    const parsed = contactSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please fill in all fields with valid values." },
        { status: 400 }
      );
    }
    const { name, email, subject, message, gRecaptchaToken } = parsed.data;

    // reCAPTCHA verification — fails closed: any verification failure blocks submission
    const recaptcha = await verifyRecaptcha(gRecaptchaToken);
    if (!recaptcha.ok) {
      return NextResponse.json({ error: recaptcha.error }, { status: recaptcha.status });
    }

    const client = await clientPromise;
    const db = client.db();

    // Log the contact inquiry in DB
    await db.collection("contact_inquiries").insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

    // Send notification email to the owner
    try {
      const emailHtml = getContactNotificationEmailHtml(name, email, subject, message);
      await resend.emails.send({
        from: `${Strings.fullName} <${process.env.CONTACT_FROM_EMAIL || "contact@utkarshsorathia.in"}>`,
        to: process.env.PERSONAL_EMAIL || "utkarshsor03@gmail.com",
        replyTo: email,
        // Strip newlines so a crafted subject can't inject extra headers/lines
        subject: `[Portfolio] ${name}: ${subject}`.replace(/[\r\n]+/g, " "),
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
      // We still return success because it was logged to DB
    }

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
