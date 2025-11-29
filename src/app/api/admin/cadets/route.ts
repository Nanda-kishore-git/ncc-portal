import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cadets } from '@/db/schema';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Access denied' }, { status: 401 });
  }

  try {
    const cadetData = await db.select().from(cadets).orderBy(cadets.cadetName);
    return NextResponse.json(cadetData);
  } catch (error) {
    console.error('Error fetching cadets:', error);
    return NextResponse.json({ error: 'Failed to fetch cadets' }, { status: 500 });
  }
}