import { NextResponse } from "next/server";
// @ts-ignore: types for 'resend' are .d.mts and not compatible with current moduleResolution
import { Resend } from "resend";
import clientPromise from "@/lib/mongodb";
import { getWelcomeEmailHtml } from "@/emails/WelcomeEmail";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
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
      const welcomeHtml = getWelcomeEmailHtml(email, token); // <-- pass token
      await resend.emails.send({
        from: `Utkarsh Sorathia <${process.env.NEWSLETTER_FROM_EMAIL || "contact@utkarshsorathia.in"}>`,
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
