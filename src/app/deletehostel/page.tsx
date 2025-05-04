'use client';
import { useState } from 'react';
import { FaTrash, FaSearch, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function DeleteHostelPage() {
  const [hostelId, setHostelId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleDelete = async () => {
    if (!hostelId.trim()) {
      setMessage({ text: 'Please enter a hostel ID', isError: true });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const response = await fetch(`/hostel/${hostelId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || 'Failed to delete');
      
      setMessage({ 
        text: `Hostel ${hostelId} deleted successfully!`, 
        isError: false 
      });
      setHostelId('');
    } catch (error: any) {
      setMessage({ 
        text: error.message || 'Error deleting hostel', 
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Link href="/" className="flex items-center text-blue-600 mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Delete Hostel</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hostel ID (from spreadsheet)
          </label>
         
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={hostelId}
              onChange={(e) => setHostelId(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Paste hostel ID here"
            />
          </div>
        </div>

        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.text}
          </div>
        )}

        <button
          onClick={handleDelete}
          disabled={isLoading || !hostelId.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
            isLoading || !hostelId.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isLoading ? (
            'Deleting...'
          ) : (
            <>
              <FaTrash className="mr-2" />
              Delete Hostel
            </>
          )}
        </button>

        <div className="mt-4 text-sm text-gray-500">
          <p>Find the hostel ID in your Google Sheet (column A)</p>
        </div>
      </div>
    </div>
  );
}