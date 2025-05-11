"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaWhatsapp, FaMapMarkerAlt, FaStar, FaChevronLeft, FaTimes, FaBed, FaWifi, FaParking, FaSwimmingPool, FaUtensils } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdSecurity, MdLocalLaundryService, MdFitnessCenter } from "react-icons/md";
import Link from "next/link";

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
}

interface FacilityIcons {
  [key: string]: React.ReactNode;
}

const HostelDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const sliderRef = useRef<Slider>(null);

  // Calculate valid images after hostel is loaded
  const validImages = hostel ? hostel.images.filter((img: string) => img && img.trim() !== '') : [];

  const sliderSettings = {
    dots: validImages.length > 1,
    infinite: validImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoScroll,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-amber-500 w-4' : 'bg-white/60'}`}></div>
    ),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: validImages.length > 1
        }
      }
    ]
  };

  // Toggle auto-scroll
  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
    if (autoScroll) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
  };

  // Manual navigation
  const goToNext = () => {
    sliderRef.current?.slickNext();
    setAutoScroll(false);
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
    setAutoScroll(false);
  };

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/hostels/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch hostel');
        }
        
        const data = await response.json();
        setHostel(data);
      } catch (error) {
        console.error("Error fetching hostel:", error);
        setHostel(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHostel();
  }, [id]);

 // Updated WhatsApp message generation functions
const generateWhatsAppMessage = () => {
  if (!hostel) return "";
  
  // Ensure proper WhatsApp message formatting with line breaks
  return `Hello HostelHub Admin,\n\nI'm interested in booking this hostel:\n\n` +
         `*🏠 Hostel Name:* ${hostel.name}\n` +
         `*📍 Location:* ${hostel.location}\n` +
         `*💰 Price:* ${hostel.price}\n\n` +
         `*Key Features:*\n${hostel.facilities.slice(0, 5).map(f => `• ${f}`).join('\n')}\n\n` +
         `Could you please provide more information about:\n` +
         `- Room availability\n` +
         `- Booking procedure\n` +
         `- Payment options\n\n` +
         `Looking forward to your response. Thank you!`;
};

const getWhatsAppNumber = () => {
  // Default admin number if hostel contact isn't available
  const defaultNumber = "2349135843102"; // Replace with your admin number
  
  if (!hostel?.contact) {
    console.warn("No contact number available, using default");
    return defaultNumber;
  }
  
  try {
    // Clean the phone number
    let phone = hostel.contact.trim();
    
    // Remove all non-digit characters
    phone = phone.replace(/\D/g, '');
    
    // Handle Nigerian numbers specifically
    if (phone.startsWith('0')) {
      return '234' + phone.substring(1);
    }
    
    // If already in international format without +
    if (phone.startsWith('234') && phone.length === 13) {
      return phone;
    }
    
    // If starts with +234
    if (phone.startsWith('234')) {
      return phone;
    }
    
    // If nothing matches, use default
    return defaultNumber;
  } catch (error) {
    console.error("Error parsing WhatsApp number:", error);
    return defaultNumber;
  }
};

// Updated WhatsApp link generation
const whatsappLink = hostel?.contact 
  ? `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(generateWhatsAppMessage())}`
  : null;
  // Facility icons mapping
  const facilityIcons: FacilityIcons = {
    'wifi': <FaWifi className="text-amber-500 text-lg md:text-xl" />,
    'parking': <FaParking className="text-amber-500 text-lg md:text-xl" />,
    'pool': <FaSwimmingPool className="text-amber-500 text-lg md:text-xl" />,
    'security': <MdSecurity className="text-amber-500 text-lg md:text-xl" />,
    'laundry': <MdLocalLaundryService className="text-amber-500 text-lg md:text-xl" />,
    'gym': <MdFitnessCenter className="text-amber-500 text-lg md:text-xl" />,
    'cafeteria': <FaUtensils className="text-amber-500 text-lg md:text-xl" />,
    'furnished': <FaBed className="text-amber-500 text-lg md:text-xl" />
  };

  const getFacilityIcon = (facility: string) => {
    const lowerFacility = facility.toLowerCase();
    for (const key in facilityIcons) {
      if (lowerFacility.includes(key)) {
        return facilityIcons[key];
      }
    }
    return <FiCheckCircle className="text-amber-500 text-lg md:text-xl" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6 p-4">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="relative w-16 h-16 md:w-20 md:h-20"
        >
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-lg md:text-xl font-medium text-slate-800">Loading Premium Hostel</h3>
          <p className="text-sm md:text-base text-slate-500">Preparing your exclusive viewing experience</p>
        </motion.div>
        
        <div className="w-48 md:w-64 bg-slate-200 rounded-full h-1.5 mt-4 overflow-hidden">
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

  if (!hostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h3 className="text-xl md:text-2xl font-light text-slate-700 mb-4">Hostel not found</h3>
          <Link href="/explore" className="inline-flex items-center text-amber-600 hover:text-amber-700 text-sm md:text-base">
            Browse our premium collection <IoIosArrowForward className="ml-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm py-4 md:py-6 px-4 md:px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/explore" className="flex items-center text-slate-700 hover:text-amber-600 transition-colors duration-300 group">
            <FaChevronLeft className="mr-1 md:mr-2 text-amber-600 group-hover:-translate-x-1 transition-transform text-sm md:text-base" />
            <span className="font-medium tracking-wide text-sm md:text-base">Back to Collection</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2 bg-amber-50 px-4 py-2 rounded-full">
            <span className="text-xs uppercase tracking-wider text-amber-600 font-medium">Premium Selection</span>
            <FaStar className="text-amber-500 text-sm" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-8 md:pb-20">
        {/* Property Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 md:mt-8"
        >
          {/* Gallery Section */}
          <div className="relative rounded-xl overflow-hidden shadow-xl mb-6 md:mb-8 border border-slate-100">
            {validImages.length > 0 ? (
              <>
                <Slider ref={sliderRef} {...sliderSettings}>
                  {validImages.map((image: string, index: number) => (
                    <div key={index} className="relative h-64 sm:h-80 md:h-[500px]">
                      <img
                        src={image}
                        alt={`${hostel.name} showcase ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/placeholder-image.jpg';
                        }}
                      />
                      <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-black/50 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full">
                        {index + 1}/{validImages.length}
                      </div>
                    </div>
                  ))}
                </Slider>
                
                {/* Navigation Controls */}
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 flex items-center space-x-2">
                  <button 
                    onClick={goToPrev}
                    className="p-1 md:p-2 bg-white/80 rounded-full hover:bg-white transition"
                  >
                    <FaChevronLeft className="text-amber-600 text-sm md:text-base" />
                  </button>
                  <button 
                    onClick={toggleAutoScroll}
                    className={`p-1 md:p-2 rounded-full transition ${autoScroll ? 'bg-amber-500 text-white' : 'bg-white/80 text-amber-600'}`}
                  >
                    {autoScroll ? (
                      <span className="text-xs md:text-sm">Pause</span>
                    ) : (
                      <span className="text-xs md:text-sm">Play</span>
                    )}
                  </button>
                  <button 
                    onClick={goToNext}
                    className="p-1 md:p-2 bg-white/80 rounded-full hover:bg-white transition"
                  >
                    <IoIosArrowForward className="text-amber-600 text-sm md:text-base" />
                  </button>
                </div>
              </>
            ) : (
              <div className="h-64 sm:h-80 md:h-[500px] bg-slate-100 flex items-center justify-center">
                <span className="text-slate-400 text-sm md:text-base">No images available</span>
              </div>
            )}
            
            {/* Premium Badge */}
            <div className="absolute top-3 md:top-6 left-3 md:left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-3 py-1 md:px-4 md:py-2 rounded-full shadow-lg uppercase tracking-wider flex items-center">
              <FaStar className="mr-1 md:mr-2 text-xs md:text-sm" />
              <span className="text-xs md:text-sm">Premium</span>
            </div>

            {/* Video Badge */}
            {hostel.video && (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute top-3 md:top-6 right-3 md:right-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-xs font-medium px-3 py-1 md:px-4 md:py-2 rounded-full shadow-lg uppercase tracking-wider flex items-center hover:from-slate-700 hover:to-slate-600 transition-all"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs md:text-sm">Tour</span>
              </button>
            )}
          </div>

          {/* Property Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-serif font-light text-slate-800 mb-1 md:mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-slate-600">
                    <FaMapMarkerAlt className="text-amber-500 mr-1 md:mr-2 text-sm md:text-base" />
                    <span className="font-medium text-sm md:text-base">{hostel.location}</span>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 flex items-center bg-slate-100 px-3 py-1 md:px-4 md:py-2 rounded-full">
                  <FaStar className="text-amber-500 mr-1 md:mr-2 text-sm md:text-base" />
                  <span className="font-medium text-sm md:text-base">4.8</span>
                  <span className="text-xs text-slate-500 ml-1">(24 reviews)</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                <span className="text-xs uppercase tracking-wider text-amber-600 mb-1 block font-medium">Annual Rate</span>
                <p className="text-2xl md:text-3xl font-light text-slate-800">{hostel.price}</p>
                <p className="text-xs md:text-sm text-amber-700 mt-1 md:mt-2">All amenities included</p>
              </div>

              {/* Description */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-serif font-light text-slate-800 mb-3 md:mb-4">Property Description</h2>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{hostel.shortDescription}</p>
              </div>
            </div>

            {/* Booking Panel */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-fit sticky top-4 md:top-6 border border-slate-100">
              <h3 className="text-lg md:text-xl font-serif font-light text-slate-800 mb-4 md:mb-6">Arrange a Viewing</h3>
              
              <div className="space-y-3 md:space-y-4">
                {hostel.video && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow hover:shadow-lg text-sm md:text-base"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Virtual Tour
                  </button>
                )}

{whatsappLink ? (
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow hover:shadow-lg text-sm md:text-base"
  >
    <FaWhatsapp className="text-lg md:text-xl mr-2 md:mr-3" />
    Contact via WhatsApp
  </a>
) : (
  <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center text-sm">
    Contact number not available
  </div>
)}
              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100">
                <h4 className="text-xs md:text-sm uppercase tracking-wider text-slate-500 mb-3 md:mb-4">Key Features</h4>
                <ul className="space-y-2 md:space-y-3">
                  {hostel.facilities.slice(0, 5).map((facility: string, index: number) => (
                    <li key={index} className="flex items-center">
                      {getFacilityIcon(facility)}
                      <span className="text-slate-700 ml-2 md:ml-3 text-sm md:text-base">{facility}</span>
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
          className="mt-12 md:mt-16"
        >
          <div className="border-b border-slate-200">
            <nav className="flex space-x-1 overflow-x-auto">
              {["description", "facilities", "location", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 md:px-6 md:py-4 font-medium text-xs md:text-sm uppercase tracking-wider relative min-w-max ${activeTab === tab ? "text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
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

          <div className="py-6 md:py-8">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-4 md:mb-6">Detailed Overview</h3>
                  <div className="prose text-slate-600 text-sm md:text-base">
                    <p className="mb-3 md:mb-4">
                      This premium student accommodation offers the perfect blend of comfort and convenience. 
                      Located in the heart of {hostel.location.split(',')[0]}, it provides easy access to campus and local amenities.
                    </p>
                    <p className="mb-3 md:mb-4">
                      The property features modern furnishings, high-speed internet, and 24/7 security to ensure a safe and productive 
                      living environment for students. Each unit is meticulously designed with student needs in mind.
                    </p>
                    <p>
                      Our premium selection includes enhanced soundproofing, ergonomic study spaces, and regular cleaning services
                      to provide the ultimate student living experience.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-4 md:mb-6">Living Experience</h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3 md:mr-4">
                        <MdSecurity className="text-amber-600 text-sm md:text-base" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 text-sm md:text-base">24/7 Security & Support</h4>
                        <p className="text-slate-600 text-xs md:text-sm mt-1">On-site staff and CCTV surveillance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3 md:mr-4">
                        <FaWifi className="text-amber-600 text-sm md:text-base" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 text-sm md:text-base">Premium Connectivity</h4>
                        <p className="text-slate-600 text-xs md:text-sm mt-1">High-speed fiber internet included</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3 md:mr-4">
                        <MdLocalLaundryService className="text-amber-600 text-sm md:text-base" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 text-sm md:text-base">Convenience Services</h4>
                        <p className="text-slate-600 text-xs md:text-sm mt-1">Weekly cleaning and laundry services</p>
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
                <h3 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-6 md:mb-8">Amenities & Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {hostel.facilities.map((facility: string, index: number) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -5 }}
                      className="bg-white p-4 md:p-5 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-2 rounded-full mr-3 md:mr-4">
                          {getFacilityIcon(facility)}
                        </div>
                        <span className="font-medium text-slate-800 text-sm md:text-base">{facility}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "location" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-4 md:mb-6">Neighborhood</h3>
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 md:p-3 rounded-full mr-3 md:mr-4 mt-1">
                      <FaMapMarkerAlt className="text-amber-600 text-sm md:text-base" />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium text-lg md:text-lg mb-1 md:mb-2">{hostel.location}</p>
                      <p className="text-slate-600 text-sm md:text-base">
                        Situated in one of the most sought-after student neighborhoods, this property offers unparalleled 
                        access to academic buildings, libraries, and recreational facilities.
                      </p>
                      <div className="mt-3 md:mt-4 space-y-2">
                        <div className="flex items-center text-xs md:text-sm text-slate-600">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <span>5 min walk to campus</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-slate-600">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                          <span>3 min walk to shopping center</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-slate-600">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                          <span>2 min walk to restaurants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-slate-100 rounded-xl overflow-hidden h-full min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                    <div className="text-center p-4 md:p-6">
                      <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 mx-auto mb-3 md:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h4 className="text-base md:text-lg font-medium text-slate-700 mb-1 md:mb-2">Interactive Map</h4>
                      <p className="text-slate-500 text-sm md:text-base">Detailed neighborhood map coming soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl md:text-2xl font-serif font-light text-slate-800 mb-6 md:mb-8">Verified Reviews</h3>
                <div className="space-y-4 md:space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center mb-3 md:mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-medium text-sm md:text-base">
                          {review === 1 ? 'JD' : review === 2 ? 'AM' : 'TK'}
                        </div>
                        <div className="ml-3 md:ml-4">
                          <h4 className="font-medium text-slate-800 text-sm md:text-base">
                            {review === 1 ? 'John D.' : review === 2 ? 'Amina M.' : 'Tunde K.'}
                          </h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={`text-xs md:text-sm ${i < 4 ? 'text-amber-500' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="ml-auto text-xs md:text-sm text-slate-500">
                          {review === 1 ? '2 months ago' : review === 2 ? '1 month ago' : '3 weeks ago'}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm md:text-base">
                        {review === 1 
                          ? "The premium amenities and quiet study spaces made this the perfect choice for my final year. The location can't be beat!"
                          : review === 2
                          ? "Absolutely worth the price. The management is responsive and the facilities are kept in excellent condition."
                          : "Best student accommodation I've stayed in. The high-speed internet and regular cleaning services are game-changers."}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Video Modal */}
      {showVideo && hostel.video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 md:-top-12 right-0 text-white hover:text-amber-400 transition p-2"
            >
              <FaTimes className="text-xl md:text-2xl" />
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden">
              <iframe
                src={hostel.video}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
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