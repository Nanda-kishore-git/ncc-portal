import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from './src/db';
import { cadets } from './src/db/schema';

interface Cadet {
  cadetName: string;
  fatherName: string;
  motherName?: string;
  educationQualification: string;
  dateOfBirth: Date;
  gender: string;
  mobileNo: string;
  email: string;
  bloodGroup: string;
  nationality?: string;
  permanentAddress?: string;
  interMarksDiploma?: string;
  identificationMarks?: string;
  medicalComplaint?: string;
  nokName?: string;
  nokRelationship?: string;
  nokContactNumber?: string;
  nokAddress?: string;
  extraCurricularActivity?: string;
  achievements?: string;
  criminalCourt: string;
  criminalCourtDetails?: string;
  willingMilitaryTraining: string;
  willingServeNcc: string;
  previouslyAppliedEnrollment: string;
  dismissedFromNccTaAf: string;
  wingType: string;
  aadharNumber?: string;
  aadharNumberFather?: string;
  aadharNumberMother?: string;
  bankAccount?: string;
  ifscNo?: string;
  branchName?: string;
  apparId?: string;
  category: string;
  regimentalNo?: string;
  campsAttendedWithDates?: string;
  nationalCampsAttendedWithDates?: string;
}

function toBoolean(value: string): boolean | null {
  if (value === "Yes") return true;
  if (value === "No") return false;
  return null; // fallback if unexpected value
}

const dummyCadets: Cadet[] = [
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
    interMarksDiploma: '85%',
    identificationMarks: 'Scar on hand',
    medicalComplaint: 'None',
    nokName: 'NOK A',
    nokRelationship: 'Brother',
    nokContactNumber: '9876543210',
    nokAddress: 'NOK Address A',
    extraCurricularActivity: 'Sports',
    achievements: 'State level winner',
    criminalCourt: 'No',
    criminalCourtDetails: '',
    willingMilitaryTraining: 'Yes',
    willingServeNcc: 'Yes',
    previouslyAppliedEnrollment: 'No',
    dismissedFromNccTaAf: 'No',
    wingType: 'Army',
    aadharNumber: '123456789012',
    aadharNumberFather: '123456789013',
    aadharNumberMother: '123456789014',
    bankAccount: '123456789',
    ifscNo: 'IFSC0001',
    branchName: 'Branch A',
    apparId: 'APPAR001',
    category: 'A',
    regimentalNo: '',
    campsAttendedWithDates: '',
    nationalCampsAttendedWithDates: '',
  },
  // Add more cadets as needed...
];

async function seed() {
  try {
    for (const cadet of dummyCadets) {
      await db.insert(cadets).values({
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
        criminalCourt: toBoolean(cadet.criminalCourt),
        criminalCourtDetails: cadet.criminalCourtDetails,
        willingMilitaryTraining: toBoolean(cadet.willingMilitaryTraining),
        willingServeNcc: toBoolean(cadet.willingServeNcc),
        previouslyAppliedEnrollment: toBoolean(cadet.previouslyAppliedEnrollment),
        dismissedFromNccTaAf: toBoolean(cadet.dismissedFromNccTaAf),
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
      });
    }
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();