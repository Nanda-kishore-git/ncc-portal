import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/index';
import { cadets } from '../../../db/schema';
import { getVisibleFields } from '../../register/fieldConfig';

function toBool(value: string | undefined): boolean | null {
  if (value === "Yes") return true;
  if (value === "No") return false;
  return null; // Treat as optional, no 400 error for missing/non-matching values
}

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

    // Validate category - map A/B/C to proper names if needed
    let category = body.category;
    if (category === 'A') category = 'Junior Wing';
    else if (category === 'B') category = 'Senior Wing';
    else if (category === 'C') category = 'Girl Cadet';

    const validCategories = ['Junior Wing', 'Senior Wing', 'Girl Cadet'];
    if (!category || !validCategories.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    // Validate mobile number
    if (body.mobileNo && (body.mobileNo.length !== 10 || !/^\d+$/.test(body.mobileNo))) {
      return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (body.email && !emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
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
          const dateStr = body[field];
          if (!dateStr) {
            return NextResponse.json({ error: 'Missing date of birth' }, { status: 400 });
          }
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            return NextResponse.json({ error: 'Invalid date of birth' }, { status: 400 });
          }
          insertData[field] = date;
        } else if (field === 'gender') {
          const gender = body[field];
          if (gender === 'SD') {
            insertData[field] = 'Male';
          } else if (gender === 'SW') {
            insertData[field] = 'Female';
          } else {
            insertData[field] = gender;
          }
        } else {
          insertData[field] = body[field] || '';
        }
      } else {
        insertData[field] = '';
      }
    }

    console.log('Insert data keys:', Object.keys(insertData));

    // Validate enum fields
    const validGenders = ['SD', 'SW', 'Male', 'Female', 'Other'];
    if (body.gender && !validGenders.includes(body.gender)) {
      return NextResponse.json({ error: 'Invalid gender' }, { status: 400 });
    }
    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    if (body.bloodGroup && !validBloodGroups.includes(body.bloodGroup)) {
      return NextResponse.json({ error: 'Invalid blood group' }, { status: 400 });
    }
    const validWingTypes = ['Army', 'Navy', 'Air Force'];
    if (body.wingType && !validWingTypes.includes(body.wingType)) {
      return NextResponse.json({ error: 'Invalid wing type' }, { status: 400 });
    }

    // Apply boolean conversion and gender mapping
    const newCadet = {
      ...insertData,
      gender: mappedGender,
      criminalCourt: toBool(body.criminalCourt),
      willingMilitaryTraining: toBool(body.willingMilitaryTraining),
      willingServeNcc: toBool(body.willingServeNcc),
      previouslyAppliedEnrollment: toBool(body.previouslyAppliedEnrollment),
      dismissedFromNccTaAf: toBool(body.dismissedFromNccTaAf),
    };

    // Validate that all required fields (not these optional ones) are present to prevent incomplete inserts
    const requiredFields = ['cadetName', 'fatherName', 'educationQualification', 'dateOfBirth', 'gender', 'mobileNo', 'email', 'bloodGroup', 'wingType', 'category'];
    for (const field of requiredFields) {
      if (!newCadet[field] || newCadet[field] === '') {
        console.error(`Missing required field: ${field}`);
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Wrap the DB insert with try-catch for error handling
    try {
      await db.insert(cadets).values(newCadet);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err: any) {
      console.error("❌ DB Insert Failed:", err);
      return new Response(JSON.stringify({ error: "DB insert failed", details: err.message }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error('Error registering cadet:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}