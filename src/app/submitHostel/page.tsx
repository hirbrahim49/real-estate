"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const facilityOptions = [
  '24/7 Electricity',
  'Water',
  'Wi-Fi',
  'Kitchen',
  'Security',
  'Laundry',
  'Study Area',
  'Parking'
];

export default function AddHostelPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    area: '',
    name: '',
    location: '',
    shortDescription: '',
    images: ['', '', ''],
    video: '',
    price: '',
    facilities: [] as string[],
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Set to false by default for form display

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!formData.area || !formData.name || !formData.images[0] || !formData.price) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/addHostel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      if (data.success) {
        router.push('/explore');
      }
    } catch (err) {
      setError('Failed to add hostel. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-xl font-medium text-slate-800">Loading HostelHub</h3>
          <p className="text-slate-500">Preparing your premium experience</p>
        </motion.div>
        <div className="w-64 bg-slate-200 rounded-full h-1.5 mt-4 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[90px] bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-slate-800 mb-3"
          >
            List Your Hostel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Reach thousands of students looking for their perfect accommodation
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 w-full"></div>

          <div className="p-8 sm:p-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start"
              >
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>{error}</div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-8">
                {/* Basic Information Section */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-200">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Hostel Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Sunrise Student Hostel"
                      />
                    </div>

                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-slate-700 mb-1">
                        Area/Location <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        required
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Gwarinpa, Abuja"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                        Full Address <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="12 Sunshine Avenue, Gwarinpa, Abuja"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-1">
                        Description <span className="text-amber-600">*</span>
                      </label>
                      <textarea
                        id="shortDescription"
                        name="shortDescription"
                        rows={4}
                        required
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Describe your hostel's features, environment, and unique selling points..."
                      />
                    </div>
                  </div>
                </div>

                {/* Media Section */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-200">
                    Media
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {[0, 1, 2].map((index) => (
                      <div key={index}>
                        <label htmlFor={`image-${index}`} className="block text-sm font-medium text-slate-700 mb-1">
                          {index === 0 ? 'Main Image URL *' : `Image ${index + 1} URL`}
                        </label>
                        <input
                          type="url"
                          id={`image-${index}`}
                          required={index === 0}
                          value={formData.images[index]}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="https://example.com/image.jpg"
                        />
                        {formData.images[index] && (
                          <div className="mt-2 w-full h-40 bg-slate-100 rounded-lg overflow-hidden">
                            <img 
                              src={formData.images[index]} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiNjMGMwYzAiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    <div>
                      <label htmlFor="video" className="block text-sm font-medium text-slate-700 mb-1">
                        Video URL (optional)
                      </label>
                      <input
                        type="url"
                        id="video"
                        name="video"
                        value={formData.video}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="https://youtube.com/embed/video"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Contact Section */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-200">
                    Pricing & Contact
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">
                        Price <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="₦180,000 / year"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1">
                        Contact (WhatsApp) <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        required
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="https://wa.me/2348012345678"
                      />
                    </div>
                  </div>
                </div>

                {/* Facilities Section */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-200">
                    Facilities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {facilityOptions.map((facility) => (
                      <motion.div 
                        key={facility}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center"
                      >
                        <input
                          type="checkbox"
                          id={`facility-${facility}`}
                          checked={formData.facilities.includes(facility)}
                          onChange={() => handleFacilityToggle(facility)}
                          className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                        />
                        <label 
                          htmlFor={`facility-${facility}`} 
                          className="ml-3 text-sm text-slate-700 cursor-pointer select-none"
                        >
                          {facility}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  className={`px-8 py-3 rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Submit Hostel Listing'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}