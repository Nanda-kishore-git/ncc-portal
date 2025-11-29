export const fieldConfig: Record<'A' | 'B' | 'C', { hidden: string[] }> = {
  A: {
    hidden: ['regimentalNo', 'campsAttendedWithDates', 'nationalCampsAttendedWithDates'],
  },
  B: {
    hidden: [],
  },
  C: {
    hidden: [],
  },
};

export const allFields = [
  'cadetName',
  'mobileNo',
  'fatherName',
  'motherName',
  'email',
  'dateOfBirth',
  'gender',
  'nationality',
  'permanentAddress',
  'educationQualification',
  'interMarksDiploma',
  'identificationMarks',
  'bloodGroup',
  'medicalComplaint',
  'nokName',
  'nokRelationship',
  'nokContactNumber',
  'nokAddress',
  'extraCurricularActivity',
  'achievements',
  'criminalCourt',
  'willingMilitaryTraining',
  'willingServeNcc',
  'previouslyAppliedEnrollment',
  'dismissedFromNccTaAf',
  'wingType',
  'aadharNumber',
  'aadharNumberFather',
  'aadharNumberMother',
  'bankAccount',
  'ifscNo',
  'branchName',
  'apparId',
  'category',
  'regimentalNo',
  'campsAttendedWithDates',
  'nationalCampsAttendedWithDates',
];

export const getVisibleFields = (category: keyof typeof fieldConfig) => {
  console.log('getVisibleFields called with category:', category);
  const hidden = fieldConfig[category]?.hidden || [];
  console.log('Hidden fields for category:', hidden);
  const visible = allFields.filter(field => !hidden.includes(field));
  console.log('Visible fields:', visible);
  return visible;
};

export const getRequiredFields = (category: keyof typeof fieldConfig) => {
  return allFields.filter(field => !fieldConfig[category].hidden.includes(field));
};