'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateService = async (service) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      
      if (res.ok) {
        setMessage('Service updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error updating service.');
      }
    } catch (error) {
      setMessage('Server error.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-arabic bg-gray-50 text-xl font-bold text-gray-700">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-arabic p-4 md:p-8 text-right">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row-reverse justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <button onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
            View Live Site &rarr;
          </button>
        </div>

        {message && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6 font-bold text-center border border-green-200 shadow-sm">
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 border-b pb-4 text-gray-800">Manage Services</h2>
          
          <div className="space-y-8">
            {services.length === 0 ? (
              <p className="text-gray-500 font-medium text-center py-8">No services found in database.</p>
            ) : (
              services.map((service) => (
                <div key={service.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Title</label>
                    <input type="text" value={service.title} onChange={(e) => handleInputChange(service.id, 'title', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea value={service.description} onChange={(e) => handleInputChange(service.id, 'description', e.target.value)} rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"></textarea>
                  </div>
                  <button onClick={() => handleUpdateService(service)} disabled={saving} className="bg-gradient-to-r from-blue-900 to-blue-600 text-white px-8 py-2.5 rounded-md font-bold hover:shadow-lg transition-all disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}