import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

interface LogEntry {
    timestamp: Date;
    ip: string;
    fullResponse: any;
}

export async function GET(request: Request) {
    const cookie = request.headers.get('cookie') || '';
    if (!cookie.includes('admin_auth=true')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 10;
    const skip = (page - 1) * limit;
    const sortOrder = searchParams.get('sort') === 'asc' ? 1 : -1;

    // Date filters
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const filter: any = {};

    if (dateFrom || dateTo) {
        filter.timestamp = {};
        if (dateFrom) filter.timestamp.$gte = new Date(dateFrom);
        if (dateTo) filter.timestamp.$lte = new Date(dateTo);
    }

    try {
        const client = await clientPromise;
        const db = client.db();

        const total = await db.collection('ipapiresponses').countDocuments(filter);
        // const cityFilter = await db.collection('ipapiresponses').distinct("fullResponse.city")
        // const regionFilter = await db.collection('ipapiresponses').distinct("fullResponse.region_name")
        // const countryFilter = await db.collection('ipapiresponses').distinct("fullResponse.country_name")
        const logs = await db
            .collection<LogEntry>('ipapiresponses')
            .find(filter)
            .sort({ timestamp: sortOrder })
            .skip(skip)
            .limit(limit)
            .toArray();

        return NextResponse.json({
            logs,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch logs' },
            { status: 500 }
        );
    }
}
