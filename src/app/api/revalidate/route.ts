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
    revalidatePath("/blogs", "page");
    revalidatePath(`/blogs/${slug}`, "page");

    return NextResponse.json({ revalidated: true, slug });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", err }, { status: 500 });
  }
}
