"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaShieldAlt, FaPercentage, FaInfoCircle, FaCheck, FaVideo } from "react-icons/fa";
import { useEffect,useState } from "react";

const ListHostelPage = () => {
  const whatsappMessage = `Hello HostelHub,\n\nI want to list my hostel with the following details:\n\n*Hostel Name:* \n*Location:* \n*Price:* \n*Number of Rooms:* \n*Amenities:* \n\n*My Contact Info:* \nFull Name: \nPhone: \nEmail: \nID Type: \nID Number: \n\nI understand and agree to the 10% service fee.`;

const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        {/* Enhanced Loading Animation */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </div>
        
        {/* Text with fade animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-xl font-medium text-slate-800">Loading HostelHub</h3>
          <p className="text-slate-500">Preparing your premium experience</p>
        </motion.div>
        
        {/* Optional progress bar */}
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
    <div className="min-h-screen bg-gray-50 pt-[100px] pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">List Your Hostel with HostelHub</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach thousands of students looking for quality accommodation. Our verification process ensures safety for all parties.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Process Steps */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaInfoCircle className="text-amber-500 mr-3" />
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaShieldAlt className="text-2xl mb-3 text-amber-500" />,
                  title: "1. Verification",
                  desc: "Submit your ID for security verification to protect against scams."
                },
                {
                  icon: <FaPercentage className="text-2xl mb-3 text-amber-500" />,
                  title: "2. Service Fee",
                  desc: "We collect 10% of the hostel's listed price as service fee."
                },
                {
                  icon: <FaCheck className="text-2xl mb-3 text-amber-500" />,
                  title: "3. Approval",
                  desc: "After verification, your listing goes live within 24 hours."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 p-6 rounded-lg text-center"
                >
                  {step.icon}
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Listing Requirements</h2>
          <ul className="space-y-4">
            {[
              "Valid student ID or government-issued ID (Driver's license, National ID, or Passport)",
              "Video tour of the hostel/apartment (minimum 1 minute walkthrough)",
              "Clear photos of the hostel (minimum 5 photos showing all areas)",
              "Accurate description of amenities and facilities",
              "Proof of ownership or authorization to list the property",
              "Valid contact information (phone & email)"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  {item}
                  {index === 1 && ( // Add video icon next to video requirement
                    <FaVideo className="ml-2 inline text-amber-500" />
                  )}
                </span>
              </li>
            ))}
          </ul>
          
          {/* Video Requirements Details */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center">
              <FaVideo className="mr-2" />
              Video Tour Requirements
            </h3>
            <ul className="text-blue-700 text-sm space-y-2 pl-5 list-disc">
              <li>Minimum 1 minute duration showing all areas</li>
              <li>Should include exterior, rooms, bathrooms, and common areas</li>
              <li>Can be uploaded to Google Drive, Dropbox, or similar service</li>
              <li>Must be recent (within last 3 months)</li>
              <li>Clear audio description is preferred but not required</li>
            </ul>
          </div>
        </div>

          {/* Important Notice */}
          <div className="p-8 bg-amber-50 border-b border-amber-100">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Important Notice</h2>
            <div className="space-y-3 text-amber-700">
              <p>
                <strong>Security First:</strong> Your ID information is required solely for verification purposes and will be kept confidential. This protects both you and potential tenants from fraudulent activities.
              </p>
              <p>
                <strong>Service Fee:</strong> HostelHub collects a 10% service fee from the listed hostel price. This fee covers our verification process, marketing, and platform maintenance.
              </p>
              <p>
                <strong>Accuracy:</strong> Providing false information may result in permanent banning from our platform and possible legal action.
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className="p-8 text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href={`https://wa.me/2349135843102?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
              >
                <FaWhatsapp className="mr-3 text-xl" />
                Submit via WhatsApp
              </Link>
            </motion.div>
            <p className="mt-4 text-sm text-gray-500">
              By clicking this button, you agree to our terms and conditions
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div  id="faq" className="  mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Why do I need to provide ID?",
                  answer: "We require ID verification to prevent scams and ensure the safety of both property owners and students. Your information is kept secure and confidential."
                },
                {
                  question: "How is the 10% service fee calculated?",
                  answer: "The fee is 10% of the total price you set for your hostel. For example, if you list at ₦500,000 per year, the service fee would be ₦50,000."
                },
                {
                  question: "When do I pay the service fee?",
                  answer:  " ✅ The 10% service fee must be paid via WhatsApp before your hostel is listed."
                },
                {
                  question: "How long does verification take?",
                  answer: "Typically within 24-48 hours after submitting all required information. We'll notify you once verified."
                }
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHostelPage;