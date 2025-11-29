import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/index';
import { cadets } from '../../../db/schema';
import { getVisibleFields } from '../../register/fieldConfig';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => {
      throw new Error('Invalid JSON');
    });
    console.log('Received registration data:', body);

    // Check password
    if (body.password !== process.env.CADET_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Validate mobile number
    if (body.mobileNo && (body.mobileNo.length !== 10 || !/^\d+$/.test(body.mobileNo))) {
      return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
    }

    // Get visible fields for the category
    const visibleFields = getVisibleFields(body.category);

    // Check if email or mobile already exists
    if (body.email) {
      const existingEmail = await db.select().from(cadets).where(eq(cadets.email, body.email)).limit(1);
      if (existingEmail.length > 0) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }
    }
    if (body.mobileNo) {
      const existingMobile = await db.select().from(cadets).where(eq(cadets.mobileNo, body.mobileNo)).limit(1);
      if (existingMobile.length > 0) {
        return NextResponse.json({ error: 'Mobile number already registered' }, { status: 400 });
      }
    }

    // Build insert data only from visible fields
    const insertData: any = {};
    for (const field of visibleFields) {
      if (field in body) {
        if (field === 'dateOfBirth') {
          insertData[field] = new Date(body[field]);
        } else {
          insertData[field] = body[field] || '';
        }
      } else {
        insertData[field] = '';
      }
    }

    console.log('Insert data keys:', Object.keys(insertData));

    await db.insert(cadets).values(insertData);

    console.log('Cadet registered successfully');
    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error registering cadet:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}