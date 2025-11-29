'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getVisibleFields } from './fieldConfig';

const fieldDefinitions: Record<string, { label: string; type: string; section: string; options?: string[]; required?: boolean }> = {
cadetName: { label: 'Cadet Name', type: 'text', section: 'Personal Information', required: true },
mobileNo: { label: 'Mobile Number', type: 'tel', section: 'Personal Information', required: true },
email: { label: 'Email', type: 'email', section: 'Personal Information', required: true },
dateOfBirth: { label: 'Date of Birth', type: 'date', section: 'Personal Information', required: true },
gender: { label: 'SD/SW', type: 'select', section: 'Personal Information', options: ['SD', 'SW'], required: true },
nationality: { label: 'Nationality', type: 'text', section: 'Personal Information' },
identificationMarks: { label: 'Identification Marks', type: 'textarea', section: 'Personal Information' },
aadharNumber: { label: 'Aadhar Number', type: 'text', section: 'Personal Information' },
bloodGroup: { label: 'Blood Group', type: 'select', section: 'Medical Information', options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], required: true },
medicalComplaint: { label: 'Medical Complaint', type: 'textarea', section: 'Medical Information' },
fatherName: { label: 'Father\'s Name', type: 'text', section: 'Family Details', required: true },
motherName: { label: 'Mother\'s Name', type: 'text', section: 'Family Details' },
permanentAddress: { label: 'Permanent Address', type: 'textarea', section: 'Family Details', required: true },
aadharNumberFather: { label: 'Father\'s Aadhar Number', type: 'text', section: 'Family Details' },
aadharNumberMother: { label: 'Mother\'s Aadhar Number', type: 'text', section: 'Family Details' },
nokName: { label: 'Next of Kin Name', type: 'text', section: 'NOK Details' },
nokRelationship: { label: 'Next of Kin Relationship', type: 'text', section: 'NOK Details' },
nokContactNumber: { label: 'Next of Kin Contact Number', type: 'tel', section: 'NOK Details' },
nokAddress: { label: 'Next of Kin Address', type: 'textarea', section: 'NOK Details' },
educationQualification: { label: 'Education Qualification', type: 'text', section: 'Educational Information' },
interMarksDiploma: { label: 'Inter Marks/Diploma', type: 'text', section: 'Educational Information' },
extraCurricularActivity: { label: 'Extra Curricular Activity', type: 'textarea', section: 'Educational Information' },
regimentalNo: { label: 'Regimental No', type: 'text', section: 'NCC Enrollment Info' },
campsAttendedWithDates: { label: 'Camps Attended with Dates', type: 'textarea', section: 'NCC Enrollment Info' },
nationalCampsAttendedWithDates: { label: 'National Camps Attended with Dates', type: 'textarea', section: 'NCC Enrollment Info' },
achievements: { label: 'Achievements', type: 'textarea', section: 'NCC Enrollment Info' },
criminalCourt: { label: 'Criminal Court', type: 'select', section: 'Activities and Background', options: ['Yes', 'No'] },
willingMilitaryTraining: { label: 'Willing for Military Training', type: 'select', section: 'Activities and Background', options: ['Yes', 'No'] },
willingServeNcc: { label: 'Willing to Serve NCC', type: 'select', section: 'Activities and Background', options: ['Yes', 'No'] },
previouslyAppliedEnrollment: { label: 'Previously Applied for Enrollment', type: 'select', section: 'Activities and Background', options: ['Yes', 'No'] },
dismissedFromNccTaAf: { label: 'Dismissed from NCC/TA/AF', type: 'select', section: 'Activities and Background', options: ['Yes', 'No'] },
bankAccount: { label: 'Bank Account', type: 'text', section: 'Bank Details' },
ifscNo: { label: 'IFSC No', type: 'text', section: 'Bank Details' },
branchName: { label: 'Branch Name', type: 'text', section: 'Bank Details' },
apparId: { label: 'Appar ID', type: 'text', section: 'Bank Details' },
};

export default function Register() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'A' | 'B' | 'C'>('A');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [visibleFields, setVisibleFields] = useState(getVisibleFields('A'));
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log('useEffect triggered by selectedCategory change:', selectedCategory);
    const newVisibleFields = getVisibleFields(selectedCategory);
    console.log('New visible fields:', newVisibleFields);
    setVisibleFields(newVisibleFields);
  }, [selectedCategory]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/verify-cadet-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData);
    console.log('Form data before conversion:', data);
    console.log('Selected category in form:', data.category);
    console.log('YES/NO fields values:', {
      criminalCourt: data.criminalCourt,
      willingMilitaryTraining: data.willingMilitaryTraining,
      willingServeNcc: data.willingServeNcc,
      previouslyAppliedEnrollment: data.previouslyAppliedEnrollment,
      dismissedFromNccTaAf: data.dismissedFromNccTaAf,
    });
    console.log('Category selected state:', categorySelected);
    console.log('Selected category state:', selectedCategory);
    // Confirm YES/NO fields are stored as strings, not booleans (no conversion)
    // ['criminalCourt', 'willingMilitaryTraining', 'willingServeNcc', 'previouslyAppliedEnrollment', 'dismissedFromNccTaAf'].forEach(field => {
    //   if (data[field] === 'Yes') data[field] = true;
    //   else if (data[field] === 'No') data[field] = false;
    // });
    // Add password for API verification
    data.password = password;
    console.log('Data being sent to API:', data);
    console.log('Data types for YES/NO fields:', {
      criminalCourt: typeof data.criminalCourt,
      willingMilitaryTraining: typeof data.willingMilitaryTraining,
      willingServeNcc: typeof data.willingServeNcc,
      previouslyAppliedEnrollment: typeof data.previouslyAppliedEnrollment,
      dismissedFromNccTaAf: typeof data.dismissedFromNccTaAf,
    });
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log('API response status:', res.status);
    console.log('API response ok?', res.ok);
    if (res.ok) {
      setSuccess('Registration successful');
      setCategorySelected(false);
      setAuthenticated(false);
      setPassword('');
      setSelectedCategory('A'); // Reset to default
      setVisibleFields(getVisibleFields('A')); // Reset visible fields
      e.currentTarget.reset();
    } else {
      setError('Registration failed');
      console.log('Registration failed, response:', res);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-6 shadow-md rounded-xl max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4 bg-ncc-gray text-gray-900 text-center">Cadet Registration</h1>
            <form onSubmit={handlePasswordSubmit}>
              <label className="block mb-2 text-black">Enter Password</label>
              <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full p-2 border-2 border-ncc-navy focus:ring-2 focus:ring-ncc-navy rounded mb-4 bg-yellow-400 text-black placeholder:text-black"
               required
              />
             <button type="submit" className="w-full bg-ncc-navy hover:bg-ncc-red text-white p-2 rounded">Submit</button>
           </form>
           {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  if (!categorySelected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full border-2 border-ncc-navy flex items-center justify-center text-black text-sm font-bold">NCC</div>
          </div>
          <h1 className="text-3xl font-bold mb-6 text-black text-center">Choose your category</h1>
          <div>
            <div className="space-y-4">
              {(['A', 'B', 'C'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    console.log('Selected category changed to:', cat);
                    setSelectedCategory(cat);
                  }}
                  className={`py-2 px-4 rounded-xl border-2 font-semibold transition-colors duration-200 ${
                    selectedCategory === cat
                      ? 'bg-ncc-navy text-black'
                      : 'border-gray-300 text-black'
                  }`}
                >
                  Category {cat}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                console.log('Continue button clicked, setting categorySelected to true');
                setCategorySelected(true);
              }}
              className="w-full mt-6 bg-ncc-navy hover:bg-ncc-red text-black p-4 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              disabled={!selectedCategory}
            >
              Continue
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  const nccColors = [
    { name: 'NCC Red (Army)', hex: '#ef1c25', tailwind: 'bg-ncc-red', textColor: 'text-gray-900' },
    { name: 'NCC Navy', hex: '#2d3092', tailwind: 'bg-ncc-navy', textColor: 'text-gray-900' },
    { name: 'NCC Air Force', hex: '#00aeef', tailwind: 'bg-ncc-air', textColor: 'text-gray-900' },
    { name: 'NCC Gold', hex: '#ffcb06', tailwind: 'bg-ncc-gold', textColor: 'text-gray-900' },
    { name: 'NCC Gray', hex: '#f5f6fa', tailwind: 'bg-ncc-gray', textColor: 'text-gray-900' },
  ];

  const ColorShowcase = () => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-ncc-navy">NCC Color Palette</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {nccColors.map((color) => (
          <div key={color.name} className={`p-6 rounded-lg shadow-md ${color.tailwind} ${color.textColor}`}>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">{color.name}</h3>
              <p className="text-sm opacity-90">{color.hex}</p>
              <div className="mt-3 bg-white bg-opacity-20 rounded p-2 text-xs">
                Sample Text
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  console.log('Current selected category:', selectedCategory);
  console.log('Current visible fields:', visibleFields);
  console.log('Category selected state:', categorySelected);
  console.log('Rendering form with selectedCategory:', selectedCategory);
  const sections = ['Personal Information', 'Family Details', 'Educational Information', 'Medical Information', 'NOK Details', 'NCC Enrollment Info', 'Bank Details', 'Activities and Background'];

  const palette = ['bg-blue-100', 'bg-purple-100', 'bg-yellow-100', 'bg-green-100', 'bg-orange-100', 'bg-red-100', 'bg-pink-100', 'bg-indigo-100'];

  const sectionColors: Record<string, string> = {};
  sections.forEach((section, index) => {
    sectionColors[section] = palette[index % palette.length];
  });

  const uniformNavy = typeof window !== 'undefined' && localStorage.getItem('uniformNavyHeadings') === 'true';

  return (
    <div className="min-h-screen bg-ncc-gray p-6">
      <div className="max-w-5xl mx-auto bg-gray-200 shadow-xl rounded-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <Image src="/ncc-logo.svg" alt="NCC Logo" width={60} height={60} className="mr-4" />
          <h1 className="text-3xl font-bold bg-ncc-gray text-gray-800">Cadet Registration Form</h1>
        </div>
        <button onClick={() => setCategorySelected(false)} className="mb-6 bg-ncc-gray hover:bg-ncc-red text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200">Change Category</button>
        <form onSubmit={handleFormSubmit}>
          <input type="hidden" name="category" value={selectedCategory} />
          {sections.map(section => {
            const sectionFields = visibleFields.filter(field => fieldDefinitions[field] && fieldDefinitions[field].section === section);
            if (sectionFields.length === 0) return null;
            return (
              <div key={section} className={`mb-6 p-4 rounded-lg ${uniformNavy ? 'bg-ncc-navy text-white' : (sectionColors[section] || '')}`}>
                <h2 className="border-b-2 border-ncc-navy text-black text-lg font-bold mb-2 mt-4">{section}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectionFields.map(field => {
                    const def = fieldDefinitions[field];
                    if (!def) return null;
                    return (
                      <div key={field} className={def.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block mb-1 text-black">{def.label}</label>
                        {def.type === 'select' ? (
                          <select name={field} required={def.required} className="w-full border-2 border-ncc-navy text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-ncc-navy focus:outline-none" defaultValue={field === 'category' ? selectedCategory : ''} onChange={undefined}>
                            <option value="">Select</option>
                            {def.options?.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : def.type === 'textarea' ? (
                          <textarea name={field} required={def.required} className="w-full border-2 border-ncc-navy text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-ncc-navy focus:outline-none" />
                        ) : (
                          <input name={field} type={def.type} required={def.required} className="w-full border-2 border-ncc-navy text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-ncc-navy focus:outline-none" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button type="submit" className="mt-8 bg-ncc-navy hover:bg-ncc-red text-white p-4 rounded-lg w-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-lg">Submit Registration</button>
        </form>
        {success && <p className="text-ncc-navy mt-4 font-semibold text-center bg-green-50 p-3 rounded-lg border border-green-200">{success}</p>}
        {error && <p className="text-red-500 mt-4 text-center bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
      </div>
    </div>
  );
}