import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const data = await req.json();

  const slug =
    typeof data.slug === "string"
      ? data.slug
      : data.slug?.current ?? null;

  if (!slug) {
    return NextResponse.json(
      { message: "Invalid slug format", received: data.slug },
      { status: 400 }
    );
  }

  try {
    // Revalidate the blog listing page
    revalidatePath("/blogs", "page");
    
    // Revalidate the specific blog post page
    revalidatePath(`/blogs/${slug}`, "page");
    
    // Revalidate the sitemap so Google discovers the new blog
    revalidatePath("/sitemap.xml", "page");

    return NextResponse.json({ 
      revalidated: true, 
      slug,
      paths: ["/blogs", `/blogs/${slug}`, "/sitemap.xml"]
    });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", err }, { status: 500 });
  }
}
