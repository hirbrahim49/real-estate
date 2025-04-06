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

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Add New Hostel</h1>
          <p className="text-slate-600">Fill in the details below to list your hostel</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Hostel Name */}
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Hostel Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
              />
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-slate-700">
                Area/Location*
              </label>
              <input
                type="text"
                id="area"
                name="area"
                required
                value={formData.area}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
              />
            </div>

            {/* Full Address */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">
                Full Address*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700">
                Description*
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
                required
                value={formData.shortDescription}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
              />
            </div>

            {/* Images */}
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label htmlFor={`image-${index}`} className="block text-sm font-medium text-slate-700">
                  {index === 0 ? 'Main Image URL*' : `Image ${index + 1} URL`}
                </label>
                <input
                  type="url"
                  id={`image-${index}`}
                  required={index === 0}
                  value={formData.images[index]}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            ))}

            {/* Video */}
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-slate-700">
                Video URL (optional)
              </label>
              <input
                type="url"
                id="video"
                name="video"
                value={formData.video}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                placeholder="https://youtube.com/embed/video"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700">
                Price*
              </label>
              <input
                type="text"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                placeholder="₦180,000 / year"
              />
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-slate-700">
                Contact (WhatsApp)*
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                placeholder="https://wa.me/2348012345678"
              />
            </div>

            {/* Facilities */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Facilities*
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {facilityOptions.map((facility) => (
                  <div key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`facility-${facility}`}
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilityToggle(facility)}
                      className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor={`facility-${facility}`} className="ml-2 text-sm text-slate-700">
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Add Hostel'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}