import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { adminLoginRatelimit, getClientIp } from '@/lib/ratelimit';

export async function POST(request: Request) {
  try {
    // Fails CLOSED (unlike the public routes' isAllowed): if Redis is down, a
    // brief admin lockout is better than unlimited password guesses. Note the
    // library itself returns success:true with reason "timeout" when Redis is
    // slow, so that case has to be rejected explicitly too.
    const ip = getClientIp(request);
    const result = await adminLoginRatelimit.limit(ip).catch(() => null);
    if (!result || !result.success || result.reason === 'timeout') {
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    const secretKey = body?.secretKey;
    if (typeof secretKey !== 'string' || !secretKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loggedIn = await login(secretKey);

    if (loggedIn) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
