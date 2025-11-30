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
  criminalCourt: boolean;
  criminalCourtDetails?: string;
  willingMilitaryTraining: boolean;
  willingServeNcc: boolean;
  previouslyAppliedEnrollment: boolean;
  dismissedFromNccTaAf: boolean;
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
    criminalCourt: false,
    criminalCourtDetails: '',
    willingMilitaryTraining: true,
    willingServeNcc: true,
    previouslyAppliedEnrollment: false,
    dismissedFromNccTaAf: false,
    wingType: 'Army',
    aadharNumber: '123456789012',
    aadharNumberFather: '123456789013',
    aadharNumberMother: '123456789014',
    bankAccount: '123456789',
    ifscNo: 'IFSC0001',
    branchName: 'Branch A',
    apparId: 'APPAR001',
    category: 'A',
    regimentalNo: undefined,
    campsAttendedWithDates: undefined,
    nationalCampsAttendedWithDates: undefined,
  },
  // Category B
  {
    cadetName: 'Jane Doe B',
    fatherName: 'Father B',
    motherName: 'Mother B',
    educationQualification: 'B.Tech',
    dateOfBirth: new Date('1999-05-15'),
    gender: 'SD',
    mobileNo: '1234567891',
    email: 'janeb@example.com',
    bloodGroup: 'A+',
    nationality: 'Indian',
    permanentAddress: 'Address B',
    interMarksDiploma: '90%',
    identificationMarks: 'Birthmark on arm',
    medicalComplaint: 'Allergic to dust',
    nokName: 'NOK B',
    nokRelationship: 'Sister',
    nokContactNumber: '9876543211',
    nokAddress: 'NOK Address B',
    extraCurricularActivity: 'Music',
    achievements: 'National level performer',
    criminalCourt: false,
    criminalCourtDetails: '',
    willingMilitaryTraining: true,
    willingServeNcc: true,
    previouslyAppliedEnrollment: false,
    dismissedFromNccTaAf: false,
    wingType: 'Navy',
    aadharNumber: '123456789013',
    aadharNumberFather: '123456789014',
    aadharNumberMother: '123456789015',
    bankAccount: '123456790',
    ifscNo: 'IFSC0002',
    branchName: 'Branch B',
    apparId: 'APPAR002',
    category: 'B',
    regimentalNo: 'REG001',
    campsAttendedWithDates: 'Camp1: 2023-01-01 to 2023-01-05',
    nationalCampsAttendedWithDates: 'National Camp: 2023-06-01 to 2023-06-10',
  },
  // Category C
  {
    cadetName: 'Alex Doe C',
    fatherName: 'Father C',
    motherName: 'Mother C',
    educationQualification: 'MBA',
    dateOfBirth: new Date('1998-09-20'),
    gender: 'SD',
    mobileNo: '1234567892',
    email: 'alexc@example.com',
    bloodGroup: 'B+',
    nationality: 'Indian',
    permanentAddress: 'Address C',
    interMarksDiploma: '88%',
    identificationMarks: 'Tattoo',
    medicalComplaint: 'None',
    nokName: 'NOK C',
    nokRelationship: 'Parent',
    nokContactNumber: '9876543212',
    nokAddress: 'NOK Address C',
    extraCurricularActivity: 'Debate',
    achievements: 'Inter college winner',
    criminalCourt: 'No',
    criminalCourtDetails: '',
    willingMilitaryTraining: 'Yes',
    willingServeNcc: 'Yes',
    previouslyAppliedEnrollment: 'No',
    dismissedFromNccTaAf: 'No',
    wingType: 'Air Force',
    aadharNumber: '123456789014',
    aadharNumberFather: '123456789015',
    aadharNumberMother: '123456789016',
    bankAccount: '123456791',
    ifscNo: 'IFSC0003',
    branchName: 'Branch C',
    apparId: 'APPAR003',
    category: 'C',
    regimentalNo: 'REG002',
    campsAttendedWithDates: 'Camp2: 2022-03-01 to 2022-03-07',
    nationalCampsAttendedWithDates: 'National Camp 2: 2022-07-01 to 2022-07-15',
  },
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
        criminalCourt: cadet.criminalCourt,
        criminalCourtDetails: cadet.criminalCourtDetails,
        willingMilitaryTraining: cadet.willingMilitaryTraining,
        willingServeNcc: cadet.willingServeNcc,
        previouslyAppliedEnrollment: cadet.previouslyAppliedEnrollment,
        dismissedFromNccTaAf: cadet.dismissedFromNccTaAf,
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