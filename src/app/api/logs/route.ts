import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getSession } from '@/lib/auth';

interface IpApiResponse {
  city?: string;
  region_name?: string;
  country_name?: string;
  [key: string]: unknown;
}

interface LogEntry {
    timestamp: Date;
    ip: string;
    fullResponse: IpApiResponse;
}

export async function GET(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 10;
    const skip = (page - 1) * limit;
    const sortOrder = searchParams.get('sort') === 'asc' ? 1 : -1;
    const collection = searchParams.get('source') === 'legacy' ? 'ipapiresponses' : 'geo_visits';

    // Date filters
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const filter: { timestamp?: { $gte?: Date; $lte?: Date } } = {};

    if (dateFrom || dateTo) {
        filter.timestamp = {};
        if (dateFrom) filter.timestamp.$gte = new Date(dateFrom);
        if (dateTo) filter.timestamp.$lte = new Date(dateTo);
    }

    try {
        const client = await clientPromise;
        const db = client.db();

        const totalRecords = await db.collection(collection).countDocuments();
        const total = await db.collection(collection).countDocuments(filter);
        const logs = await db
            .collection<LogEntry>(collection)
            .find(filter)
            .sort({ timestamp: sortOrder })
            .skip(skip)
            .limit(limit)
            .toArray();

        return NextResponse.json({
            logs,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalRecords: totalRecords,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch logs' },
            { status: 500 }
        );
    }
}
