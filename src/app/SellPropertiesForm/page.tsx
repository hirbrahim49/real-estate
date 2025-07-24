'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiUser, FiAlertCircle, FiFileText, FiDollarSign, FiPercent, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';

interface FormData {
  name: string;
  phone: string;
  whatsapp: string;
  damage: string;
  description: string;
  price: string;
  negotiable: string;
  customMessage: string;
}

interface CloudinaryResponse {
  secure_url: string;
}

interface UploadProgress {
  image: number;
  video: number;
  idCard: number;
}

interface Preview {
  image: string;
  video: string;
  idCard: string;
}

const SellPropertiesForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    whatsapp: '',
    damage: '',
    description: '',
    price: '',
    negotiable: '',
    customMessage: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<Preview>({ image: '', video: '', idCard: '' });
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    image: 0,
    video: 0,
    idCard: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'idCard') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max for images, 50MB for videos)
    if ((type === 'image' || type === 'idCard') && file.size > 5 * 1024 * 1024) {
      setError(`${type === 'image' ? 'Property image' : 'ID card'} must be less than 5MB`);
      return;
    }
    if (type === 'video' && file.size > 50 * 1024 * 1024) {
      setError('Video must be less than 50MB');
      return;
    }

    setError(null);
    if (type === 'image') setImageFile(file);
    if (type === 'video') setVideoFile(file);
    if (type === 'idCard') setIdCardFile(file);

    setUploadProgress(prev => ({ ...prev, [type]: 0 }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(prev => ({ ...prev, [type]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.description || !formData.price) {
      setError('Please fill all required fields');
      return;
    }

    if (!imageFile || !idCardFile) {
      setError('Please upload both property image and ID card');
      return;
    }

    try {
      setLoading(true);

      // Upload files to Cloudinary
      const uploadFile = async (file: File, type: 'image' | 'video' | 'idCard'): Promise<CloudinaryResponse> => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
          formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
          
          if (file.type.includes('video')) {
            formData.append('resource_type', 'video');
          }

          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(prev => ({ ...prev, [type]: percent }));
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error('Network error during upload'));
          });

          xhr.open(
            'POST',
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
            true
          );
          xhr.send(formData);
        });
      };

      const [imageUpload, videoUpload, idCardUpload] = await Promise.all([
        uploadFile(imageFile, 'image'),
        videoFile ? uploadFile(videoFile, 'video') : Promise.resolve({ secure_url: '' }),
        uploadFile(idCardFile, 'idCard')
      ]);

      // Format WhatsApp message
      const whatsappMessage = `🏠 *NEW PROPERTY LISTING* 🏠\n\n` +
        `👤 *Name*: ${formData.name}\n` +
        `📞 *Phone*: ${formData.phone}\n` +
        `📱 *WhatsApp*: ${formData.whatsapp || 'Not provided'}\n\n` +
        `🏡 *Property Details*\n` +
        `   - Damage: ${formData.damage || 'None'}\n` +
        `   - Description: ${formData.description}\n\n` +
        `💰 *Pricing*\n` +
        `   - Asking Price: ₦${formData.price}\n` +
        `   - Negotiable Price: ₦${formData.negotiable || 'Not negotiable'}\n\n` +
        `📸 *Media Links*\n` +
        `   - Image: ${imageUpload.secure_url}\n` +
        `   ${videoUpload.secure_url ? `- Video: ${videoUpload.secure_url}\n` : ''}` +
        `   - ID Proof: ${idCardUpload.secure_url}\n\n` +
        `💬 *Additional Notes*: ${formData.customMessage || 'None'}`;

      // Send to WhatsApp
      const whatsappResponse = await fetch('/api/submit-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: whatsappMessage }),
      });

      if (!whatsappResponse.ok) {
        throw new Error('Failed to send WhatsApp message');
      }

      // Send to Google Sheets via API route
      const sheetsResponse = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          damage: formData.damage,
          description: formData.description,
          price: formData.price,
          negotiable: formData.negotiable,
          customMessage: formData.customMessage,
          imageUrl: imageUpload.secure_url,
          videoUrl: videoUpload?.secure_url || '',
          idUrl: idCardUpload.secure_url
        }),
      });

      const sheetsResult = await sheetsResponse.json();
      if (!sheetsResult.success) {
        throw new Error(sheetsResult.message || 'Failed to save to database');
      }

      // Reset form on success
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        whatsapp: '',
        damage: '',
        description: '',
        price: '',
        negotiable: '',
        customMessage: ''
      });
      setImageFile(null);
      setVideoFile(null);
      setIdCardFile(null);
      setPreview({ image: '', video: '', idCard: '' });
      setUploadProgress({ image: 0, video: 0, idCard: 0 });

    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[60px] min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-light text-slate-800 mb-2">List Your Property</h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto"></div>
          <p className="text-slate-600 mt-4">Fill out the form below to list your property. We'll contact you via WhatsApp.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6 text-center"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6 text-center"
          >
            ✅ Successfully submitted! Your property will be reviewed shortly.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 flex items-center">
                <FiUser className="mr-2 text-amber-500" />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                required
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 flex items-center">
                <FiPhone className="mr-2 text-amber-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                required
                placeholder="08012345678"
                pattern="[0-9]{11}"
                title="Please enter a valid 11-digit Nigerian phone number"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 flex items-center">
                <FaWhatsapp className="mr-2 text-amber-500" />
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                placeholder="08012345678"
                pattern="[0-9]{11}"
                title="Please enter a valid 11-digit Nigerian phone number"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="damage" className="block text-sm font-medium text-slate-700 flex items-center">
              <FiAlertCircle className="mr-2 text-amber-500" />
              Any Damage?
            </label>
            <input
              type="text"
              id="damage"
              name="damage"
              value={formData.damage}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              placeholder="Describe any existing damage"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 flex items-center">
              <FiFileText className="mr-2 text-amber-500" />
              Property Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              rows={4}
              required
              placeholder="Detailed description of your property..."
              minLength={30}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 flex items-center">
                <FiDollarSign className="mr-2 text-amber-500" />
                Price (₦) *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                required
                placeholder="500,000"
                pattern="[0-9,]+"
                title="Please enter a valid price (numbers only)"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="negotiable" className="block text-sm font-medium text-slate-700 flex items-center">
                <FiPercent className="mr-2 text-amber-500" />
                Negotiable Price (₦)
              </label>
              <input
                type="text"
                id="negotiable"
                name="negotiable"
                value={formData.negotiable}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                placeholder="450,000"
                pattern="[0-9,]+"
                title="Please enter a valid price (numbers only)"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="customMessage" className="block text-sm font-medium text-slate-700 flex items-center">
              <FiMessageSquare className="mr-2 text-amber-500" />
              Additional Notes
            </label>
            <textarea
              id="customMessage"
              name="customMessage"
              value={formData.customMessage}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              rows={3}
              placeholder="Any special requests or additional information..."
            />
          </div>

          <div className="space-y-6">
            {/* Property Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Property Image *
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition relative">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">Click to upload image</p>
                    <p className="text-xs text-slate-400">Max 5MB</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, 'image')} 
                    required 
                  />
                  {uploadProgress.image > 0 && uploadProgress.image < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-300" 
                        style={{ width: `${uploadProgress.image}%` }}
                      ></div>
                    </div>
                  )}
                </label>
                {preview.image && (
                  <div className="w-full sm:w-1/2 h-32 rounded-lg overflow-hidden border border-slate-200 relative">
                    <img src={preview.image} alt="Property preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {imageFile?.name}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Video Upload (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Property Video (Optional)
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition relative">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">Click to upload video</p>
                    <p className="text-xs text-slate-400">Max 50MB</p>
                  </div>
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, 'video')} 
                  />
                  {uploadProgress.video > 0 && uploadProgress.video < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-300" 
                        style={{ width: `${uploadProgress.video}%` }}
                      ></div>
                    </div>
                  )}
                </label>
                {preview.video && (
                  <div className="w-full sm:w-1/2 h-32 rounded-lg overflow-hidden border border-slate-200 relative bg-black">
                    <video src={preview.video} className="w-full h-full object-cover" controls />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {videoFile?.name}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ID Card Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                ID Verification (Cover sensitive parts) *
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition relative">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">Click to upload ID</p>
                    <p className="text-xs text-slate-400">Cover sensitive information (Max 5MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, 'idCard')} 
                    required 
                  />
                  {uploadProgress.idCard > 0 && uploadProgress.idCard < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-300" 
                        style={{ width: `${uploadProgress.idCard}%` }}
                      ></div>
                    </div>
                  )}
                </label>
                {preview.idCard && (
                  <div className="w-full sm:w-1/2 h-32 rounded-lg overflow-hidden border border-slate-200 relative">
                    <img src={preview.idCard} alt="ID preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {idCardFile?.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

 <div className="pt-4">
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-slate-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-slate-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-amber-600 hover:underline">
                    terms and conditions
                  </Link>
                </label>
                <p className="text-slate-500">I confirm all information provided is accurate</p>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all shadow-md ${
                loading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Property Listing'
              )}
            </motion.button>
          </div>
        </form>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mt-6 text-center"
          >
            ✅ Successfully submitted!Your items will be reviewed shortly and uploaded.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SellPropertiesForm;