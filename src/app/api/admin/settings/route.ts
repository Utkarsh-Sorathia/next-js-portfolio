import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db();
        const settings = await db.collection('settings').findOne({ id: 'global' });
        
        return NextResponse.json({
            openToWork: settings?.openToWork ?? false
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { openToWork } = await request.json();
        const client = await clientPromise;
        const db = client.db();
        
        await db.collection('settings').updateOne(
            { id: 'global' },
            { $set: { openToWork } },
            { upsert: true }
        );
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
