// Updated AdminPropertiesPage with enhanced hostel management
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiEye, FiTrash2, FiRefreshCw, FiHome, FiClock, FiPlus } from 'react-icons/fi';

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

interface Hostel {
  id: string;
  area: string;
  name: string;
  location: string;
  shortDescription: string;
  images: string[];
  video: string;
  price: string;
  facilities: string[];
  contact: string;
  status: string;
}

const AdminPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [activeTab, setActiveTab] = useState<'properties' | 'hostels'>('hostels');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [deletingHostels, setDeletingHostels] = useState<{[key: string]: number}>({});
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    if (authenticated) {
      fetchData();
      startCleanupInterval();
    }
  }, [authenticated, activeTab]);

  // Cleanup interval for permanent deletion
  const startCleanupInterval = () => {
    setInterval(async () => {
      for (const [hostelId, secondsLeft] of Object.entries(deletingHostels)) {
        if (secondsLeft <= 0) {
          await permanentDeleteHostel(hostelId);
        }
      }
    }, 1000);
  };

  // Countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDeletingHostels(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(hostelId => {
          if (updated[hostelId] > 0) {
            updated[hostelId] -= 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'properties') {
        const response = await fetch('/api/properties?status=Pending');
        const data = await response.json();
        if (data.success) {
          setProperties(data.data);
        }
      } else {
        const response = await fetch('/api/hostels');
        const hostelsData = await response.json();
        setHostels(hostelsData);
        
        // Initialize countdown for pending deletions
        const pendingDeletions: {[key: string]: number} = {};
        hostelsData.forEach((hostel: Hostel) => {
          if (hostel.status === 'pending_deletion') {
            pendingDeletions[hostel.id] = 60;
          }
        });
        setDeletingHostels(pendingDeletions);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

const deleteHostel = async (hostelId: string) => {
  try {
    console.log('🔄 Admin: Deleting hostel with ID:', hostelId, 'Type:', typeof hostelId);
    
    setDeletingHostels(prev => ({ ...prev, [hostelId]: 60 }));
    
    const response = await fetch('/api/hostels/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hostelId: hostelId.toString() }), // Ensure string
    });
    
    const result = await response.json();
    if (!result.success) {
      console.log('❌ Admin: Delete failed:', result.message);
      setError(result.message);
      setDeletingHostels(prev => {
        const updated = { ...prev };
        delete updated[hostelId];
        return updated;
      });
    } else {
      console.log('✅ Admin: Delete successful');
      // Update local state
      setHostels(prev => prev.map(hostel => 
        hostel.id === hostelId 
          ? { ...hostel, status: 'pending_deletion' }
          : hostel
      ));
      setSuccess('Hostel marked for deletion. It will be removed in 60 seconds.');
    }
  } catch (err) {
    console.log('❌ Admin: Delete error:', err);
    setError('Failed to delete hostel');
    setDeletingHostels(prev => {
      const updated = { ...prev };
      delete updated[hostelId];
      return updated;
    });
  }
};
  const permanentDeleteHostel = async (hostelId: string) => {
    try {
      const response = await fetch('/api/hostels/permanent-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hostelId }),
      });
      
      const result = await response.json();
      if (result.success) {
        // Remove from local state
        setHostels(prev => prev.filter(hostel => hostel.id !== hostelId));
        setDeletingHostels(prev => {
          const updated = { ...prev };
          delete updated[hostelId];
          return updated;
        });
        console.log(`Hostel ${hostelId} permanently deleted`);
      }
    } catch (err) {
      console.error('Permanent delete error:', err);
    }
  };

  const cancelDeletion = async (hostelId: string) => {
    try {
      const response = await fetch('/api/hostels/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hostelId,
          status: 'active'
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Update local state
        setHostels(prev => prev.map(hostel => 
          hostel.id === hostelId 
            ? { ...hostel, status: 'active' }
            : hostel
        ));
        setDeletingHostels(prev => {
          const updated = { ...prev };
          delete updated[hostelId];
          return updated;
        });
        setSuccess('Deletion cancelled. Hostel is now active again.');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to cancel deletion');
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
        setSuccess('Property status updated successfully');
        fetchData();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to update property status');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Available</span>;
      case 'pending_deletion':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Deleting Soon</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{status}</span>;
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-[100px] mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <section className='flex gap-2'>
          <button  
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FiRefreshCw /> Refresh
          </button>
          <button 
            onClick={() => setShowPostForm(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all"
          >
            <FiPlus /> Post Hostel
          </button>
        </section>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'hostels'
              ? 'border-b-2 border-amber-500 text-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('hostels')}
        >
          <FiHome /> Manage Hostels ({hostels.length})
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'properties'
              ? 'border-b-2 border-amber-500 text-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('properties')}
        >
          Property Requests ({properties.length})
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6 flex justify-between items-center">
          <span>{error}</span>
          <button 
            onClick={() => setError('')}
            className="text-red-700 hover:text-red-900 font-bold text-lg"
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6 flex justify-between items-center">
          <span>{success}</span>
          <button 
            onClick={() => setSuccess('')}
            className="text-green-700 hover:text-green-900 font-bold text-lg"
          >
            ×
          </button>
        </div>
      )}

      {/* Hostels Tab */}
      {activeTab === 'hostels' && (
        <div>
          {loading ? (
            <div className="text-center py-8">Loading hostels...</div>
          ) : hostels.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FiHome className="mx-auto text-4xl text-gray-300 mb-4" />
              <p>No hostels available</p>
              <button 
                onClick={() => setShowPostForm(true)}
                className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Post Your First Hostel
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels.map((hostel) => (
                <div key={hostel.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={hostel.images && hostel.images.length > 0 ? hostel.images[0] : '/default-hostel.jpg'} 
                      alt={hostel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{hostel.name}</h3>
                      {getStatusBadge(hostel.status)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{hostel.location}</p>
                    <p className="text-amber-600 font-bold mb-4">{hostel.price}</p>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => {
                          const imageUrl = hostel.images && hostel.images.length > 0 ? hostel.images[0] : '/default-hostel.jpg';
                          window.open(imageUrl, '_blank');
                        }}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        title="View Image"
                      >
                        <FiEye />
                      </button>
                      
                      {hostel.status === 'pending_deletion' ? (
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => cancelDeletion(hostel.id)}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2 text-sm"
                            title="Cancel Deletion"
                          >
                            <FiCheck /> Keep
                          </button>
                          <div className="flex items-center gap-2 text-red-600">
                            <FiClock className="animate-pulse" />
                            <span className="text-sm font-medium">{deletingHostels[hostel.id] || 0}s</span>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => deleteHostel(hostel.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2 text-sm"
                          title="Delete Hostel"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === 'properties' && (
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
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        title="Approve"
                      >
                        <FiCheck />
                      </button>
                      <button 
                        onClick={() => {
                          const reason = prompt('Enter rejection reason:');
                          if (reason) updateStatus(property.id, 'Rejected', reason);
                        }}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        title="Reject"
                      >
                        <FiX />
                      </button>
                      <button 
                        onClick={() => window.open(property.imageurl, '_blank')}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
      )}

      {/* Post Hostel Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Post New Hostel</h2>
                <button
                  onClick={() => setShowPostForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">Hostel posting form will be implemented here...</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    This feature is coming soon! For now, you can add hostels directly to your Google Sheets.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <Link 
                href="/submitHostel"
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors" 
                >
                
                  Post Hostel (Coming Soon)
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesPage;