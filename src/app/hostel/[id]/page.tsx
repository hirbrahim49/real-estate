"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaWhatsapp, FaMapMarkerAlt, FaStar, FaChevronLeft, FaTimes } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { hostelsData } from "../../Components/Data/Product";
import { Hostel } from "../../Components/Data/Product";

const HostelDetailPage = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showVideo, setShowVideo] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-2 h-2 rounded-full bg-white/80 mt-6 transition-all duration-300"></div>
    ),
  };

  useEffect(() => {
    let foundHostel: Hostel | undefined;
    for (const group of hostelsData) {
      foundHostel = group.hostels.find(h => h.id === id);
      if (foundHostel) break;
    }
    setHostel(foundHostel ?? null);
  }, [id]);

  const generateWhatsAppMessage = () => {
    if (!hostel) return "";
    
    return `Hello,\n\nI'm interested in this hostel:\n\n*🏠 Hostel Name:* ${hostel.name}\n*📍 Location:* ${hostel.location}\n*💰 Price:* ${hostel.price}\n\nHere's a picture of the hostel:\n${hostel.Image[0]}\n\nCould you please provide more information about availability?`;
  };

  // Extract phone number from the WhatsApp link
  const getWhatsAppNumber = () => {
    if (!hostel?.contact) return "";
    const match = hostel.contact.match(/wa.me\/(\d+)/) || hostel.contact.match(/whatsapp.com\/(\d+)/);
    return match ? match[1] : "";
  };

  const whatsappLink = hostel?.contact 
    ? `${hostel.contact}?text=${encodeURIComponent(generateWhatsAppMessage())}`
    : `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(generateWhatsAppMessage())}`;

  if (!hostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-700 font-light tracking-wide">Loading premium accommodations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Luxury Navigation Header */}
      <header className="bg-white shadow-sm py-6 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/explore" className="flex items-center text-slate-700 hover:text-amber-600 transition-colors duration-300 group">
            <FaChevronLeft className="mr-2 text-amber-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium tracking-wide">Back to Collection</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <span className="text-xs uppercase tracking-wider text-slate-500">Premium Selection</span>
            <div className="w-1 h-1 rounded-full bg-amber-400"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* Property Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          {/* Gallery Section */}
          <div className="relative rounded-xl overflow-hidden shadow-xl mb-8">
            <Slider {...sliderSettings}>
              {hostel.Image.map((image, index) => (
                <div key={index} className="relative h-[500px]">
                  <img
                    src={image}
                    alt={`${hostel.name} showcase ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
            
            {/* Premium Badge */}
            <div className="absolute top-6 left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg uppercase tracking-wider flex items-center">
              <FaStar className="mr-2" />
              Premium Selection
            </div>
          </div>

          {/* Property Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-serif font-light text-slate-800 mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-slate-600">
                    <FaMapMarkerAlt className="text-amber-500 mr-2" />
                    <span className="font-medium">{hostel.location}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center bg-slate-100 px-4 py-2 rounded-full">
                  <FaStar className="text-amber-500 mr-2" />
                  <span className="font-medium">4.8</span>
                  <span className="text-xs text-slate-500 ml-1">(24 reviews)</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs uppercase tracking-wider text-slate-500 mb-1 block">Annual Rate</span>
                <p className="text-3xl font-light text-slate-800">{hostel.price}</p>
                <p className="text-sm text-slate-500 mt-2">Inclusive of all amenities and services</p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-serif font-light text-slate-800 mb-4">Property Description</h2>
                <p className="text-slate-600 leading-relaxed">{hostel.shortDescription}</p>
              </div>
            </div>

            {/* Booking Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-6">
              <h3 className="text-xl font-serif font-light text-slate-800 mb-6">Arrange a Viewing</h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowVideo(true)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Virtual Tour
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow hover:shadow-lg"
                >
                  <FaWhatsapp className="text-xl mr-3" />
                  Contact via WhatsApp
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-sm uppercase tracking-wider text-slate-500 mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {hostel.facilities.slice(0, 5).map((facility, index) => (
                    <li key={index} className="flex items-center">
                      <FiCheckCircle className="text-amber-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="border-b border-slate-200">
            <nav className="flex space-x-1">
              {["description", "facilities", "location"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm uppercase tracking-wider relative ${activeTab === tab ? "text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-2xl font-serif font-light text-slate-800 mb-6">Detailed Overview</h3>
                  <div className="prose text-slate-600">
                    <p className="mb-4">
                      This premium student accommodation offers the perfect blend of comfort and convenience. 
                      Located in the heart of {hostel.location.split(',')[0]}, it provides easy access to campus and local amenities.
                    </p>
                    <p className="mb-4">
                      The property features modern furnishings, high-speed internet, and 24/7 security to ensure a safe and productive 
                      living environment for students. Each unit is meticulously designed with student needs in mind.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-light text-slate-800 mb-6">Living Experience</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-4">
                        <FiCheckCircle className="text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">Professional Management</h4>
                        <p className="text-slate-600 text-sm mt-1">On-site staff available 24/7 for your convenience</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-4">
                        <FiCheckCircle className="text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">Premium Services</h4>
                        <p className="text-slate-600 text-sm mt-1">Weekly cleaning and maintenance included</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "facilities" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-serif font-light text-slate-800 mb-8">Amenities & Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hostel.facilities.map((facility, index) => (
                    <div key={index} className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-2 rounded-full mr-4">
                          <FiCheckCircle className="text-amber-600" />
                        </div>
                        <span className="font-medium text-slate-800">{facility}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "location" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-2xl font-serif font-light text-slate-800 mb-6">Neighborhood</h3>
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4 mt-1">
                      <FaMapMarkerAlt className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium text-lg mb-2">{hostel.location}</p>
                      <p className="text-slate-600">
                        Situated in one of the most sought-after student neighborhoods, this property offers unparalleled 
                        access to academic buildings, libraries, and recreational facilities.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-slate-100 rounded-xl overflow-hidden h-full min-h-[300px] flex items-center justify-center">
                    <div className="text-center p-6">
                      <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h4 className="text-lg font-medium text-slate-700 mb-2">Interactive Map</h4>
                      <p className="text-slate-500">Detailed neighborhood map coming soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Similar Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-light text-slate-800">Similar Premium Properties</h2>
            <Link href="/explore" className="text-sm font-medium text-amber-600 hover:text-amber-500 transition flex items-center">
              View All <FaChevronLeft className="ml-1 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelsData
              .find(group => group.hostels.some(h => h.id === id))?.hostels
              .filter(h => h.id !== id)
              .slice(0, 3)
              .map((similarHostel, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                >
                  <Link href={`/hostel/${similarHostel.id}`}>
                    <div className="relative h-60 group">
                      <img
                        src={similarHostel.Image[0]}
                        alt={similarHostel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-white font-serif text-xl mb-1">{similarHostel.name}</h3>
                            <p className="text-white/90 text-sm">{similarHostel.price}</p>
                          </div>
                          <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            <FaStar className="text-amber-400 mr-1 text-sm" />
                            <span className="text-white text-sm">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </main>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 transition p-2"
            >
              <FaTimes className="text-2xl" />
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden">
              <iframe
                src={hostel.video}
                className="w-full h-[500px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HostelDetailPage;