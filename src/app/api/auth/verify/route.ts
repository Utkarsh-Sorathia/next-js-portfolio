import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (session) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    } else {
      const response = NextResponse.json({ authenticated: false }, { status: 401 });
      response.cookies.delete("admin_session");
      return response;
    }
  } catch (error) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete("admin_session");
    return response;
  }
}
