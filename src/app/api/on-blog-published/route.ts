import { NextResponse } from "next/server";
import { Resend } from "resend";
import clientPromise from "@/lib/mongodb";
import { getNewBlogEmailHtml } from "@/emails/NewBlogEmail";
import { baseURL } from "@/utils/api";
import { hasValidSecret } from "@/lib/webhookSecret";

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend's batch endpoint accepts up to 100 emails per call.
const BATCH_SIZE = 100;

interface NewsletterSend {
  _id: string; // post slug
  status: "sending" | "sent" | "failed";
  sentCount: number;
  updatedAt: Date;
}

export async function POST(req: Request) {
  if (!hasValidSecret(req, process.env.SANITY_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title : "";
  const excerpt = typeof body?.excerpt === "string" ? body.excerpt : undefined;
  const slug = typeof body?.slug === "string" ? body.slug : body?.slug?.current;

  if (!title || typeof slug !== "string" || !slug) {
    return NextResponse.json({ error: "Missing title or slug" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const sends = db.collection<NewsletterSend>("newsletter_sends");

  // Idempotency: Sanity retries failed webhooks and also fires on edits to an
  // already-published post. Only one send per slug; a failed send resumes from
  // where it stopped instead of re-emailing everyone.
  const existing = await sends.findOne({ _id: slug });
  if (existing && existing.status !== "failed") {
    return NextResponse.json({ message: `Newsletter already ${existing.status} for this post` });
  }

  let sentCount = existing?.sentCount ?? 0;
  if (existing) {
    // Claim the failed send atomically so two concurrent retries can't both resume it.
    const claimed = await sends.updateOne(
      { _id: slug, status: "failed" },
      { $set: { status: "sending", updatedAt: new Date() } }
    );
    if (claimed.modifiedCount === 0) {
      return NextResponse.json({ message: "Newsletter already in progress" });
    }
  } else {
    try {
      await sends.insertOne({ _id: slug, status: "sending", sentCount: 0, updatedAt: new Date() });
    } catch {
      // Duplicate key: a concurrent delivery of the same webhook claimed it first.
      return NextResponse.json({ message: "Newsletter already in progress" });
    }
  }

  try {
    // Stable order so a resumed send skips exactly the subscribers already emailed.
    const subscribers = await db
      .collection("subscribers")
      .find({}, { projection: { email: 1, token: 1 } })
      .sort({ _id: 1 })
      .skip(sentCount)
      .toArray();

    const blogUrl = `${baseURL}/blogs/${slug}`;
    const from = `Utkarsh Sorathia <${process.env.NEWSLETTER_FROM_EMAIL || "contact@utkarshsorathia.in"}>`;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);
      const { error } = await resend.batch.send(
        batch.map((sub) => ({
          from,
          to: sub.email,
          subject: `New Blog: ${title}`,
          html: getNewBlogEmailHtml({ title, excerpt, blogUrl, token: sub.token }),
        }))
      );
      if (error) throw new Error(`Resend batch failed: ${error.message}`);

      sentCount += batch.length;
      await sends.updateOne({ _id: slug }, { $set: { sentCount, updatedAt: new Date() } });
    }

    await sends.updateOne({ _id: slug }, { $set: { status: "sent", updatedAt: new Date() } });
    return NextResponse.json({ message: "Newsletter sent!", sentCount });
  } catch (error) {
    console.error("Newsletter send failed:", error);
    await sends.updateOne({ _id: slug }, { $set: { status: "failed", updatedAt: new Date() } });
    return NextResponse.json({ error: "Error sending newsletter" }, { status: 500 });
  }
}
