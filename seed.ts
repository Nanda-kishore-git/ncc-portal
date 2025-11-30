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
    communicationAddress: 'Address A',
    pincode: '123456',
    state: 'State A',
    district: 'District A',
    permanentAddress: 'Permanent Address A',
    permanentPincode: '123456',
    permanentState: 'State A',
    permanentDistrict: 'District A',
    BankName: 'Bank A',
    BankBranch: 'Branch A',
    accountNo: 'Account A',
    IFSC: 'IFSC A',
    aadhaar: 'Aadhaar A',
    policeStation: 'Station A',
    policeStationDistrict: 'District A',
    policeStationState: 'State A',
    // Category A specific
    unitName: 'Unit A',
    unitType: 'AIR',
    regdNo: 'Regd A',
    rank: 'JWO',
    aColumns: 'A Column',
    commitmentDoc: '--',
    medicalFitnessCertNo: '--',
    // Optional fields
    criminalCourt: 'No',
    willingMilitaryTraining: 'Yes',
    willingServeNcc: 'Yes',
    willingToGetArrestedHd: 'No',
    regtCamp: '--',
    lb: '--',
    ll: '--',
    militaryTrainingDetails: '--',
    medicalConditionDetails: '--',
    g1TestResult: '--',
    captainDetails: '--',
    commanderPermitHolderDetails: '--',
    nationalCampsAttendedWithDates: '--',
    activitiesWithDates: '--',
    awardsWithDates: '--',
    paraTrainingDetails: '--',
    paraAwardingDate: '--',
    captainPermitDate: '--',
    commanderPermitDate: '--'
  },
  // Add more cadets as needed...
];

async function seed() {
  try {
    for (const cadet of dummyCadets) {
      await db.insert(cadets).values({
        ...cadet,
        criminalCourt: toBool(cadet.criminalCourt),
        willingMilitaryTraining: toBool(cadet.willingMilitaryTraining),
        willingServeNcc: toBool(cadet.willingServeNcc),
        willingToGetArrestedHd: toBool(cadet.willingToGetArrestedHd),
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