import clientPromise from '@/lib/mongodb';

export async function getSettings() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const settings = await db.collection('settings').findOne({ id: 'global' });
    
    // Return openToWork from DB, default to false if not found
    // Mirrors logic in /api/admin/settings
    return { 
      openToWork: settings?.openToWork ?? false 
    };
  } catch (error) {
    console.error('Failed to fetch settings from DB:', error);
    // Fallback to env var if DB fails, similar to how client-side initialized state
    return { 
      openToWork: process.env.NEXT_PUBLIC_OPEN_TO_WORK === 'true' 
    };
  }
}
