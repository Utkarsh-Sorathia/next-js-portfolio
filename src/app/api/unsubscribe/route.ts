import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Delete the subscriber
    const result = await db.collection("subscribers").deleteOne({ token });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
