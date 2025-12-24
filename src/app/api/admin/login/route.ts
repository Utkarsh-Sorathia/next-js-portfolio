// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { secretKey } = await request.json();

  if (secretKey === process.env.SECRET_KEY) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'strict',
    });
    return response;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
