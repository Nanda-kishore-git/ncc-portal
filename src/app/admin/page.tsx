'use client';

import { useState, useEffect } from 'react';

interface Cadet {
  id: number;
  name: string;
  // Add other fields as needed
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<Cadet[]>([]);
  const [error, setError] = useState('');
  const [uniformNavyHeadings, setUniformNavyHeadings] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      fetchData();
    } else {
      setError('Access denied');
    }
  };

  const fetchData = async () => {
    const res = await fetch('/api/admin/cadets');
    const result = await res.json();
    if (res.ok) {
      setData(result);
    } else {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    if (authenticated) {
      const stored = localStorage.getItem('uniformNavyHeadings');
      setUniformNavyHeadings(stored === 'true');
    }
  }, [authenticated]);

  const toggleUniformNavy = () => {
    const newValue = !uniformNavyHeadings;
    setUniformNavyHeadings(newValue);
    localStorage.setItem('uniformNavyHeadings', newValue.toString());
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-ncc-navy">Admin Login</h1>
          <form onSubmit={handlePasswordSubmit}>
            <label className="block mb-2">Enter Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-yellow-400 text-black placeholder:text-black"
              required
            />
            <button type="submit" className="w-full bg-ncc-navy text-white p-2 rounded">Login</button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-ncc-navy">Admin Dashboard</h1>
        <div className="mb-4">
          <a href="/api/export?category=all" className="bg-ncc-red text-white px-4 py-2 rounded mr-2">Download All</a>
          <a href="/api/export?category=A" className="bg-ncc-navy text-white px-4 py-2 rounded mr-2">Download Category A</a>
          <a href="/api/export?category=B" className="bg-ncc-navy text-white px-4 py-2 rounded mr-2">Download Category B</a>
          <a href="/api/export?category=C" className="bg-ncc-navy text-white px-4 py-2 rounded">Download Category C</a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                {/* Add other headers */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((cadet) => (
                <tr key={cadet.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cadet.name}</td>
                  {/* Add other cells */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}