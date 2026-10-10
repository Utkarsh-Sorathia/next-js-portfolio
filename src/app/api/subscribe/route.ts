import { NextResponse } from "next/server";
// @ts-ignore: types for 'resend' are .d.mts and not compatible with current moduleResolution
import { Resend } from "resend";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { getWelcomeEmailHtml } from "@/emails/WelcomeEmail";
import crypto from "crypto";
import Strings from "@/constants/strings";
import { subscribeRatelimit, getClientIp, isAllowed } from "@/lib/ratelimit";
import { verifyRecaptcha } from "@/lib/recaptcha";

const resend = new Resend(process.env.RESEND_API_KEY);

// `email` must be a plain string — an object like {"$ne": null} would otherwise
// be passed straight into the MongoDB query as an operator.
const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  gRecaptchaToken: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    if (!(await isAllowed(subscribeRatelimit, ip))) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }

    const parsed = subscribeSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }
    const { email, gRecaptchaToken } = parsed.data;

    // reCAPTCHA verification — fails closed
    const recaptcha = await verifyRecaptcha(gRecaptchaToken);
    if (!recaptcha.ok) {
      return NextResponse.json({ error: recaptcha.error }, { status: recaptcha.status });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check existing
    const existing = await db.collection("subscribers").findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    // Generate UNIQUE token for this subscriber
    const token = crypto.randomBytes(32).toString("hex");

    // Save to DB
    await db.collection("subscribers").insertOne({
      email,
      token,
      subscribedAt: new Date(),
    });

    // Send welcome email
    try {
      const welcomeHtml = getWelcomeEmailHtml(email, token);
      await resend.emails.send({
        from: `${Strings.fullName} <${process.env.NEWSLETTER_FROM_EMAIL || "contact@utkarshsorathia.in"}>`,
        to: email,
        subject: "Welcome aboard! 🚀",
        html: welcomeHtml,
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
