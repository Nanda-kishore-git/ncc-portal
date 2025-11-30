import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from './src/db';
import { cadets } from './src/db/schema';

const toBool = (value: string | undefined): boolean | null => {
  if (value === 'Yes') return true;
  if (value === 'No') return false;
  return null;
};

const dummyCadets = [
  // Category A
  {
    cadetName: 'John Doe A',
    fatherName: 'Father A',
    motherName: 'Mother A',
    educationQualification: '12th Pass',
    dateOfBirth: new Date('2000-01-01'),
    gender: 'SD',
    mobileNo: '1234567890',
    email: 'johna@example.com',
    bloodGroup: 'O+',
    nationality: 'Indian',
    permanentAddress: 'Address A',
    wingType: 'Army',
    category: 'A',
    // Optional boolean fields
    criminalCourt: 'No',
    willingMilitaryTraining: 'Yes',
    willingServeNcc: 'Yes',
    willingToGetArrestedHd: 'No',
  },
  // Add more cadets as needed...
];

async function seed() {
  try {
    for (const cadet of dummyCadets) {
      const insertData = {
        cadetName: cadet.cadetName,
        fatherName: cadet.fatherName,
        motherName: cadet.motherName,
        educationQualification: cadet.educationQualification,
        dateOfBirth: cadet.dateOfBirth,
        gender: cadet.gender,
        mobileNo: cadet.mobileNo,
        email: cadet.email,
        bloodGroup: cadet.bloodGroup,
        nationality: cadet.nationality,
        permanentAddress: cadet.permanentAddress,
        interMarksDiploma: cadet.interMarksDiploma,
        identificationMarks: cadet.identificationMarks,
        medicalComplaint: cadet.medicalComplaint,
        nokName: cadet.nokName,
        nokRelationship: cadet.nokRelationship,
        nokContactNumber: cadet.nokContactNumber,
        nokAddress: cadet.nokAddress,
        extraCurricularActivity: cadet.extraCurricularActivity,
        achievements: cadet.achievements,
        wingType: cadet.wingType,
        aadharNumber: cadet.aadharNumber,
        aadharNumberFather: cadet.aadharNumberFather,
        aadharNumberMother: cadet.aadharNumberMother,
        bankAccount: cadet.bankAccount,
        ifscNo: cadet.ifscNo,
        branchName: cadet.branchName,
        apparId: cadet.apparId,
        category: cadet.category,
        regimentalNo: cadet.regimentalNo,
        campsAttendedWithDates: cadet.campsAttendedWithDates,
        nationalCampsAttendedWithDates: cadet.nationalCampsAttendedWithDates,
        // Convert YES/NO strings to boolean/null
        criminalCourt: toBool(cadet.criminalCourt),
        willingMilitaryTraining: toBool(cadet.willingMilitaryTraining),
        willingServeNcc: toBool(cadet.willingServeNcc),
        willingToGetArrestedHd: toBool(cadet.willingToGetArrestedHd),
        previouslyAppliedEnrollment: toBool(cadet.previouslyAppliedEnrollment),
        dismissedFromNccTaAf: toBool(cadet.dismissedFromNccTaAf),
      };

      await db.insert(cadets).values(insertData);
    }
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();