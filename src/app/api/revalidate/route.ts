import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { hasValidSecret } from "@/lib/webhookSecret";
import { submitToIndexNow } from "@/lib/indexnow";

export async function POST(req: NextRequest) {
  if (!hasValidSecret(req, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const data = await req.json().catch(() => null);

  const slug =
    typeof data?.slug === "string"
      ? data.slug
      : typeof data?.slug?.current === "string"
        ? data.slug.current
        : null;

  // Slugs are used to build a path, so only allow URL-safe slug characters
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ message: "Invalid slug format" }, { status: 400 });
  }

  try {
    // Revalidate the blog listing page
    revalidatePath("/blogs", "page");
    
    // Revalidate the specific blog post page
    revalidatePath(`/blogs/${slug}`, "page");
    
    // Revalidate the sitemap so Google discovers the new blog
    revalidatePath("/sitemap.xml", "page");

    // Refresh the RSS feed so feed readers and cross-posting (dev.to,
    // Hashnode) pick up the post without waiting for the cache to expire
    revalidatePath("/rss.xml");

    // Tell Bing & co. right away (Google reads the sitemap instead)
    const indexNow = await submitToIndexNow([`/blogs/${slug}`, "/blogs"]);

    return NextResponse.json({ 
      revalidated: true, 
      slug,
      paths: ["/blogs", `/blogs/${slug}`, "/sitemap.xml", "/rss.xml"],
      indexNow,
    });
  } catch (err) {
    console.error("Revalidation failed:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
