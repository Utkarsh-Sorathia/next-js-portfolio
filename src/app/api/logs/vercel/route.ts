import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

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

        const totalRecords = await db.collection('vercel_logs').countDocuments();
        const total = await db.collection('vercel_logs').countDocuments(filter);
        
        const logs = await db
            .collection('vercel_logs')
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
            { error: 'Failed to fetch Vercel logs' },
            { status: 500 }
        );
    }
}
