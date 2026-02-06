import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Filter out non-page requests
    if (
        path.startsWith('/_next') || 
        path.startsWith('/api') || 
        path.startsWith('/admin') ||
        path.startsWith('/favicon') ||
        path.includes('.')
    ) {
        return NextResponse.next();
    }

    // 2. Extract Vercel Geolocation Headers
    const geo = {
        city: request.headers.get('x-vercel-ip-city') ?? 'Unknown',
        country: request.headers.get('x-vercel-ip-country') ?? 'Unknown',
        region: request.headers.get('x-vercel-ip-country-region') ?? 'Unknown',
        latitude: request.headers.get('x-vercel-ip-latitude') ?? 'Unknown',
        longitude: request.headers.get('x-vercel-ip-longitude') ?? 'Unknown',
        timezone: request.headers.get('x-vercel-ip-timezone') ?? 'Unknown',
    };

    const ip = request.headers.get('x-real-ip') ?? '127.0.0.1';
    const ua = request.headers.get('user-agent') ?? 'Unknown';
    const referer = request.headers.get('referer') ?? 'Direct';

    // 3. Track in background (relative URL for same-origin)
    const trackUrl = new URL('/api/stats/track', request.url);
    
    fetch(trackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, geo, path, ua, referer }),
    }).catch(err => console.error("Proxy Tracking Error:", err));

    return NextResponse.next();
}

// Optimization: Monitor main landing paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
