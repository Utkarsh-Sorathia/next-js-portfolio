import { NextRequest, NextResponse } from 'next/server';
import { Reader, ReaderModel } from '@maxmind/geoip2-node';
import clientPromise from '@/lib/mongodb';
import path from 'path';

let readerCache: ReaderModel | null = null;

async function getReader(): Promise<ReaderModel> {
  if (!readerCache) {
    const dbPath = path.resolve(
      process.cwd(),
      process.env.GEOIP_DB_PATH || './data/GeoLite2-City.mmdb'
    );
    readerCache = await Reader.open(dbPath);
  }
  return readerCache;
}

export async function GET(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  let ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';

  // Strip IPv4-mapped IPv6 prefix (e.g. ::ffff:116.72.18.164 → 116.72.18.164)
  ip = ip.replace(/^::ffff:/, '');

  let geoData: Record<string, unknown> = {};

  try {
    // Local dev — use bundled .mmdb file
    const reader = await getReader();
    const result = reader.city(ip);
    geoData = {
      city: result.city?.names?.en,
      region: result.subdivisions?.[0]?.names?.en,
      country: result.country?.names?.en,
      country_code: result.country?.isoCode,
      zip: result.postal?.code,
      latitude: result.location?.latitude,
      longitude: result.location?.longitude,
      timezone: result.location?.timeZone,
      continent: result.continent?.names?.en,
    };
  } catch {
    // Production (Vercel) — fall back to Vercel's edge geo headers
    const city = request.headers.get('x-vercel-ip-city');
    geoData = {
      city: city ? decodeURIComponent(city) : undefined,
      region: request.headers.get('x-vercel-ip-country-region') ?? undefined,
      country_code: request.headers.get('x-vercel-ip-country') ?? undefined,
      latitude: request.headers.get('x-vercel-ip-latitude') ?? undefined,
      longitude: request.headers.get('x-vercel-ip-longitude') ?? undefined,
      timezone: request.headers.get('x-vercel-ip-timezone') ?? undefined,
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection('geo_visits').insertOne({
      timestamp: new Date(),
      ip,
      fullResponse: geoData,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    // Duplicate IP — already tracked, not an error
    if (e?.code === 11000) return NextResponse.json({ success: true });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
