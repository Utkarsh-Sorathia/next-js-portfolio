import { NextResponse } from "next/server";
// @ts-ignore: types for 'resend' are .d.mts and not compatible with current moduleResolution
import { Resend } from "resend";
import clientPromise from "@/lib/mongodb";
import Strings from "@/constants/strings";

import { getContactNotificationEmailHtml } from "@/emails/ContactNotificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiter: 5 submissions per 15 min per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }

    const { name, email, subject, message, gRecaptchaToken } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // reCAPTCHA verification — fails closed: any verification failure blocks submission
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    if (!gRecaptchaToken) {
      return NextResponse.json({ error: "Security token missing" }, { status: 400 });
    }

    try {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${gRecaptchaToken}`,
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json(
          { error: "Security check failed. Please try again." },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
      return NextResponse.json(
        { error: "Security verification unavailable. Please try again later." },
        { status: 503 }
      );
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
