import { NextResponse } from "next/server";
// @ts-ignore: types for 'resend' are .d.mts and not compatible with current moduleResolution
import { Resend } from "resend";
import clientPromise from "@/lib/mongodb";

import { getContactNotificationEmailHtml } from "@/emails/ContactNotificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
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
        from: `Portfolio Contact <${process.env.CONTACT_FROM_EMAIL || "contact@utkarshsorathia.in"}>`,
        to: process.env.PERSONAL_EMAIL || "utkarshsor03@gmail.com",
        replyTo: email,
        subject: `[Portfolio] ${name}: ${subject}`,
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
