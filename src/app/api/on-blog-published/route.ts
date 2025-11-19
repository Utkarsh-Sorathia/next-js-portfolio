import { NextResponse } from "next/server";
import { Resend } from "resend";
import clientPromise from "@/lib/mongodb";
import { getNewBlogEmailHtml } from "@/emails/NewBlogEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt } = body;

    const client = await clientPromise;
    const db = client.db();

    const subscribers = await db.collection("subscribers").find().toArray();
    if (!subscribers.length) {
      return NextResponse.json({ message: "No subscribers" });
    }

    const blogUrl = `https://utkarshsorathia.in/blogs/${slug?.current || slug}`;

    // Send emails
    await Promise.all(
      subscribers.map((sub) =>
        resend.emails.send({
          from: "Utkarsh Sorathia <contact@utkarshsorathia.in>",
          to: sub.email,
          subject: `New Blog: ${title}`,
          html: getNewBlogEmailHtml({
            title,
            excerpt,
            blogUrl,
            token: sub.token
          }),
        })
      )
    );

    return NextResponse.json({ message: "Newsletter sent!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error sending newsletter" }, { status: 500 });
  }
}
