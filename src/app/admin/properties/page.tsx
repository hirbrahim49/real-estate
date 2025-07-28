'use client';
import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiEye, FiTrash2, FiRefreshCw } from 'react-icons/fi';

interface Property {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  whatsapp: string;
  damage: string;
  description: string;
  price: string;
  negotiable: string;
  custommessage: string;
  imageurl: string;
  videourl: string;
  idurl: string;
  status: string;
  approvaldate: string;
  rejectionreason: string;
}

const AdminPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      fetchProperties();
    }
  }, [authenticated]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/properties?status=Pending');
      const data = await response.json();
      if (data.success) {
        setProperties(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string, reason: string = '') => {
    try {
      const response = await fetch('/api/properties/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status, reason }),
      });
      
      const result = await response.json();
      if (result.success) {
        fetchProperties(); // Refresh the list
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to update property status');
    }
  };

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-[100px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Listing Requests</h1>
       <section className='flex gap-2'>
         <button  
          onClick={fetchProperties}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <FiRefreshCw /> Refresh
        </button>
        <button className='px-6 py-3 rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all-'>
          Post Hostel
        </button>
       </section>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Submitted</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">Loading...</td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">No pending properties</td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{property.name}</td>
                  <td className="py-3 px-4">{property.phone}</td>
                  <td className="py-3 px-4">₦{property.price}</td>
                  <td className="py-3 px-4">
                    {new Date(property.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button 
                      onClick={() => updateStatus(property.id, 'Approved')}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                      title="Approve"
                    >
                      <FiCheck />
                    </button>
                    <button 
                      onClick={() => {
                        const reason = prompt('Enter rejection reason:');
                        if (reason) updateStatus(property.id, 'Rejected', reason);
                      }}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Reject"
                    >
                      <FiX />
                    </button>
                    <button 
                      onClick={() => window.open(property.imageurl, '_blank')}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      title="View Image"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPropertiesPage;