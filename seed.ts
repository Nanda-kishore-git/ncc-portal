import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from './src/db';
import { cadets } from './src/db/schema';

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
    willingMilitaryTraining: 'Yes',
    willingServeNcc: 'Yes',
    previouslyAppliedEnrollment: 'No',
    dismissedFromNccTaAf: 'No',
    wingType: 'Army',
    aadharNumber: '123456789012',
    aadharNumberFather: '123456789013',
    aadharNumberMother: '123456789014',
    bankAccount: '1234567890',
    ifscNo: 'IFSC0001',
    branchName: 'Branch A',
    apparId: 'APPAR001',
    category: 'A',
    // regimentalNo: not included for A
    // campsAttendedWithDates: not included
    // nationalCampsAttendedWithDates: not included
  },
  // Category B
  {
    cadetName: 'Jane Doe B',
    fatherName: 'Father B',
    motherName: 'Mother B',
    educationQualification: 'Graduation',
    dateOfBirth: new Date('1999-02-02'),
    gender: 'SW',
    mobileNo: '1234567891',
    email: 'janeb@example.com',
    bloodGroup: 'A+',
    nationality: 'Indian',
    permanentAddress: 'Address B',
    interMarksDiploma: '90%',
    identificationMarks: 'Birthmark',
    medicalComplaint: 'Allergy',
    nokName: 'NOK B',
    nokRelationship: 'Sister',
    nokContactNumber: '9876543211',
    nokAddress: 'NOK Address B',
    extraCurricularActivity: 'Debate',
    achievements: 'National participant',
    criminalCourt: 'No',
    willingMilitaryTraining: 'Yes',
    willingServeNcc: 'Yes',
    previouslyAppliedEnrollment: 'No',
    dismissedFromNccTaAf: 'No',
    wingType: 'Air Force',
    aadharNumber: '123456789015',
    aadharNumberFather: '123456789016',
    aadharNumberMother: '123456789017',
    bankAccount: '1234567891',
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
    educationQualification: 'Post Graduation',
    dateOfBirth: new Date('1998-03-03'),
    gender: 'SD',
    mobileNo: '1234567892',
    email: 'alexc@example.com',
    bloodGroup: 'B+',
    nationality: 'Indian',
    permanentAddress: 'Address C',
    interMarksDiploma: '95%',
    identificationMarks: 'Tattoo',
    medicalComplaint: 'None',
    nokName: 'NOK C',
    nokRelationship: 'Parent',
    nokContactNumber: '9876543212',
    nokAddress: 'NOK Address C',
    extraCurricularActivity: 'Music',
    achievements: 'International award',
    criminalCourt: 'No',
    willingMilitaryTraining: 'Yes',
    willingServeNcc: 'Yes',
    previouslyAppliedEnrollment: 'No',
    dismissedFromNccTaAf: 'No',
    wingType: 'Navy',
    aadharNumber: '123456789018',
    aadharNumberFather: '123456789019',
    aadharNumberMother: '123456789020',
    bankAccount: '1234567892',
    ifscNo: 'IFSC0003',
    branchName: 'Branch C',
    apparId: 'APPAR003',
    category: 'C',
    regimentalNo: 'REG002',
    campsAttendedWithDates: 'Camp2: 2022-01-01 to 2022-01-05',
    nationalCampsAttendedWithDates: 'National Camp2: 2022-06-01 to 2022-06-10',
  },
];

async function seed() {
  try {
    for (const cadet of dummyCadets) {
      await db.insert(cadets).values(cadet);
    }
    console.log('Seeded dummy cadets successfully');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    process.exit(0);
  }
}

seed();