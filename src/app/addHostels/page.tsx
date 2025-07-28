"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaShieldAlt, FaPercentage, FaInfoCircle, FaCheck, FaVideo, FaLock, FaUserShield, FaHome, FaBuilding } from "react-icons/fa";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

const ListHostelPage = () => {
  const whatsappMessage = `Hello HostelHub,\n\nI want to list my premium hostel with the following details:\n\n*Hostel Name:* \n*Location:* \n*Price Range:* \n*Number of Rooms:* \n*Key Amenities:* \n\n*My Contact Information:* \nFull Name: \nPhone: \nEmail: \nID Type: \nID Number: \n\nI understand and agree to the 10% premium service fee.`;

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hostel'); // 'hostel' or 'property'

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="relative w-20 h-20"
        >
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-xl font-medium text-slate-800">Loading HostelHub</h3>
          <p className="text-slate-500">Preparing your premium listing experience</p>
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
    <div className="min-h-screen bg-slate-50 pt-[100px] pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Premium Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-amber-50 px-6 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-amber-600 tracking-wider">PREMIUM LISTING</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 font-serif">List Your <span className="text-amber-500">Premium</span> Property</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Showcase your premium student accommodation or properties to thousands of verified students through our exclusive platform.
          </p>
        </motion.div>

        {/* Property Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-slate-200">
            <button
              onClick={() => setActiveTab('hostel')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center ${activeTab === 'hostel' ? 'bg-amber-500 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <FaBuilding className="mr-2" />
              List Hostel
            </button>
            <button
              onClick={() => setActiveTab('property')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center ${activeTab === 'property' ? 'bg-amber-500 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <FaHome className="mr-2" />
              List Property
            </button>
          </div>
        </div>

        {/* Main Content - Hostel */}
        {activeTab === 'hostel' && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
            {/* Process Steps */}
            <div className="p-8 sm:p-10 border-b border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                <FaInfoCircle className="text-amber-500 mr-3 text-2xl" />
                Hostel <span className="text-amber-500 ml-1">Premium</span> Listing
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <FaUserShield className="text-3xl mb-4 text-amber-500" />,
                    title: "1. Verification",
                    desc: "Complete our secure identity verification to ensure trust and safety for all parties.",
                    features: ["ID verification", "Background check", "Secure data handling"]
                  },
                  {
                    icon: <FaPercentage className="text-3xl mb-4 text-amber-500" />,
                    title: "2. Service Fee",
                    desc: "Our 10% premium service fee includes marketing, vetting, and platform features.",
                    features: ["Transparent pricing", "No hidden fees", "Payment protection"]
                  },
                  {
                    icon: <FaCheck className="text-3xl mb-4 text-amber-500" />,
                    title: "3. Approval",
                    desc: "Fast-track approval with premium support to get your listing live quickly.",
                    features: ["24-48 hour review", "Quality assurance", "Premium badge"]
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                    className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-amber-100 transition-all duration-300"
                  >
                    <div className="text-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-3 text-center">{step.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 text-center">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                          <FaCircleCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Listing Requirements */}
            <div className="p-8 sm:p-10 border-b border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                <FaCheck className="text-amber-500 mr-3 text-2xl" />
                Hostel Requirements
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Essential Documents</h3>
                  <ul className="space-y-3">
                    {[
                      "Valid government-issued ID (Driver's license, National ID, or Passport)",
                      "Proof of ownership or authorization to list",
                      "Recent utility bill (not older than 3 months)",
                      "Tax identification number (optional)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Media Requirements</h3>
                  <ul className="space-y-3">
                    {[
                      "High-quality photos (minimum 8, showing all areas)",
                      "Video tour (minimum 2 minutes walkthrough)",
                      "Floor plan (recommended)",
                      "360° virtual tour (optional premium feature)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">
                          {item}
                          {index === 1 && <FaVideo className="ml-2 inline text-amber-500" />}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Video Requirements Details */}
              <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-3 flex items-center">
                  <FaVideo className="mr-2 text-lg" />
                  Premium Video Tour Guidelines
                </h3>
                <ul className="text-blue-700 text-sm space-y-2 pl-5 list-disc">
                  <li>Minimum 2 minute duration showing all areas clearly</li>
                  <li>Should include exterior, rooms, bathrooms, kitchen, and common areas</li>
                  <li>Professional quality preferred (we can recommend videographers)</li>
                  <li>Upload to Google Drive, Dropbox, or WeTransfer</li>
                  <li>Must be recent (within last 2 months)</li>
                  <li>Clear narration or captions preferred</li>
                </ul>
              </div>
            </div>

            {/* Action Section */}
            <div className="p-8 sm:p-10 text-center bg-slate-50">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold text-slate-800 mb-6"
              >
                Ready to List Your <span className="text-amber-500">Premium</span> Hostel?
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 max-w-2xl mx-auto mb-8"
              >
                Join our exclusive network of premium student accommodations and get booked faster.
              </motion.p>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block mb-6"
              >
                <Link
                  href={`https://wa.me/2349135843102?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  <FaWhatsapp className="mr-3 text-xl" />
                  Start Hostel Listing
                </Link>
              </motion.div>
            </div>
          </div>
        )}

        {/* Main Content - Property */}
        {activeTab === 'property' && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
            {/* Process Steps */}
            <div className="p-8 sm:p-10 border-b border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                <FaInfoCircle className="text-amber-500 mr-3 text-2xl" />
                Property <span className="text-amber-500 ml-1">Premium</span> Listing
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <FaUserShield className="text-3xl mb-4 text-amber-500" />,
                    title: "1. Verification",
                    desc: "Complete our secure identity verification to ensure trust and safety for all parties.",
                    features: ["ID verification", "Property ownership proof", "Secure data handling"]
                  },
                  {
                    icon: <FaPercentage className="text-3xl mb-4 text-amber-500" />,
                    title: "2. Service Fee",
                    desc: "Our 5% premium service fee includes marketing, vetting, and platform features.",
                    features: ["Transparent pricing", "No hidden fees", "Payment protection"]
                  },
                  {
                    icon: <FaCheck className="text-3xl mb-4 text-amber-500" />,
                    title: "3. Approval",
                    desc: "Fast-track approval with premium support to get your listing live quickly.",
                    features: ["24-48 hour review", "Quality assurance", "Premium badge"]
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                    className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-amber-100 transition-all duration-300"
                  >
                    <div className="text-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-3 text-center">{step.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 text-center">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                          <FaCircleCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Listing Requirements */}
            <div className="p-8 sm:p-10 border-b border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                <FaCheck className="text-amber-500 mr-3 text-2xl" />
                Property Requirements
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Essential Documents</h3>
                  <ul className="space-y-3">
                    {[
                      "School ID",
                      "Recent utility bill (optional)",
                      "Tax identification number (optional)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Media Requirements</h3>
                  <ul className="space-y-3">
                    {[
                      "High-quality photos ",
                      "Video tour (maxmimum 50mb)",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">
                          {item}
                          {index === 1 && <FaVideo className="ml-2 inline text-amber-500" />}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Property Types */}
              <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-3 flex items-center">
                  <FaHome className="mr-2 text-lg" />
                  Property Types We List
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {[
                    "Eletrical Appliances",
                    "Funitures",
                    "Home appliances",
                    "Terraced Houses",
                    "Commercial Properties",
                  ].map((type, index) => (
                    <div key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2 text-sm" />
                      <span className="text-blue-700 text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="p-8 sm:p-10 text-center bg-slate-50">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold text-slate-800 mb-6"
              >
                Ready to List Your <span className="text-amber-500">Premium</span> Property?
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 max-w-2xl mx-auto mb-8"
              >
                Join our exclusive network of premium properties and connect with serious buyers/renters.
              </motion.p>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block mb-6"
              >
                <Link
                  href="\SellPropertiesForm"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300"
                >
                  <FaHome className="mr-3 text-xl" />
                  Start Property Listing
                </Link>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-slate-500"
              >
                By proceeding, you agree to our <Link href="/terms" className="text-amber-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>
              </motion.p>
            </div>
          </div>
        )} 

        {/* Shared FAQ Section */}
        <div id="faq" className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
              <FaInfoCircle className="text-amber-500 mr-3 text-2xl" />
              Premium Listing <span className="text-amber-500 ml-1">FAQs</span>
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  question: "Why choose premium listing over standard?",
                  answer: "Premium listings receive 3x more views, priority placement in search results, and our verified badge which increases trust and booking rates significantly."
                },
                {
                  question: "How is the service fee calculated?",
                  answer: `The fee is ${activeTab === 'hostel' ? '10%' : '8%'} of the total annual price you set for your ${activeTab === 'hostel' ? 'hostel' : 'property'}. For example, at ₦500,000 per year, the service fee would be ₦${activeTab === 'hostel' ? '50,000' : '40,000'} payable upon successful booking.`
                },
                {
                  question: "What's included in the verification process?",
                  answer: `We verify ${activeTab === 'hostel' ? 'property ownership, ID authenticity' : 'property ownership documents, ID authenticity'}, and conduct background checks to ensure a safe platform for all users.`
                },
                {
                  question: "Can I upgrade to premium after listing?",
                  answer: "Yes, any standard listing can be upgraded to premium by completing the verification process and paying the difference in service fees."
                },
                {
                  question: "How long does premium listing last?",
                  answer: "Your premium status remains active for 12 months from the date of verification. We'll notify you before expiration for renewal."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="border-b border-slate-200 pb-8 last:border-0"
                >
                  <h3 className="text-lg font-medium text-slate-800 mb-3">{item.question}</h3>
                  <p className="text-slate-600">{item.answer}</p>
                  {index === 0 && (
                    <Link href="/premium-benefits" className="inline-flex items-center mt-3 text-amber-600 hover:text-amber-700 text-sm font-medium">
                      View full benefits comparison <FaArrowRight className="ml-1 text-xs" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-300 font-medium"
              >
                Need more help? Contact our team
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHostelPage;