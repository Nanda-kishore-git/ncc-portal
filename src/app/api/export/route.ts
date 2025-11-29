import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cadets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Access denied' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
const cadetData = category && category !== 'all'
  ? await db.select().from(cadets).where(eq(cadets.category, category)).orderBy(cadets.cadetName)
  : await db.select().from(cadets).orderBy(cadets.cadetName);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(cadetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Cadets');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const filename = `cadets-${category || 'all'}.xlsx`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  });
}