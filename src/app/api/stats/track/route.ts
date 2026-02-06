import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { ip, geo, path, ua, referer } = body;

        const client = await clientPromise;
        const db = client.db();

        await db.collection('vercel_logs').insertOne({
            timestamp: new Date(),
            ip,
            path,
            userAgent: ua,
            referer: referer || 'Direct',
            city: geo.city,
            country: geo.country,
            region: geo.region,
            latitude: geo.latitude,
            longitude: geo.longitude,
            timezone: geo.timezone,
            isMobile: /Mobile|Android|iPhone/i.test(ua),
            isLocal: ip === '127.0.0.1' || ip === '::1'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking error:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
