'use client';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaWhatsapp, FaMapMarkerAlt, FaStar, FaChevronLeft, FaBed, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaExpand } from "react-icons/fa";
import { FiCheckCircle, FiX, FiClock, FiAlertTriangle } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
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
  rating?: number;
  status: string;
}

interface FacilityIcons {
  [key: string]: React.ReactNode;
}

const HostelDetailPage = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [deletionCountdown, setDeletionCountdown] = useState<number | null>(null);
  const sliderRef = useRef<Slider>(null);

  // Calculate valid images
  const validImages = hostel ? hostel.images.filter((img: string) => img && img.trim() !== '') : [];

  const sliderSettings = {
    dots: validImages.length > 1,
    infinite: validImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-amber-500 w-4' : 'bg-white/60'}`}></div>
    ),
  };

  const goToNext = () => sliderRef.current?.slickNext();
  const goToPrev = () => sliderRef.current?.slickPrev();

  // Countdown effect for deletion
  useEffect(() => {
    if (hostel?.status === 'pending_deletion' && deletionCountdown !== null && deletionCountdown > 0) {
      const timer = setInterval(() => {
        setDeletionCountdown(prev => {
          if (prev && prev <= 1) {
            clearInterval(timer);
            // Redirect to explore page when countdown ends
            window.location.href = '/explore';
            return 0;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [hostel?.status, deletionCountdown]);

  const generateWhatsAppMessage = () => {
    if (!hostel) return "";
    
    const mainImage = validImages.length > 0 ? validImages[0] : "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567/hostelhub/default-hostel.jpg";
    
    return `Hello HostelHub Admin,\n\nI'm interested in booking this hostel:\n\n*🏠 ${hostel.name}*\n📍 *Location:* ${hostel.location}\n💰 *Price:* ${hostel.price}\n⭐ *Rating:* ${hostel.rating || "4.5"}/5\n\n*Key Features:*\n${hostel.facilities.slice(0, 5).map(f => `• ${f}`).join('\n')}\n\n*Hostel Image:* ${mainImage}\n\nPlease provide:\n1. Room availability\n2. Booking procedure\n3. Payment options\n\nLooking forward to your response. Thank you!`;
  };

  const getWhatsAppNumber = () => {
    const defaultNumber = "2349135843102";
    if (!hostel?.contact) return defaultNumber;
    
    let phone = hostel.contact.replace(/\D/g, '');
    if (phone.startsWith('0')) return '234' + phone.substring(1);
    if (phone.startsWith('234')) return phone;
    return defaultNumber;
  };

  const whatsappLink = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(generateWhatsAppMessage())}`;

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hostels');
        const data = await response.json();
        
        // Convert ID to string for comparison (to handle number IDs from spreadsheet)
        const stringId = Array.isArray(id) ? id[0] : id;
        const foundHostel = data.find((h: Hostel) => 
          h.id.toString() === stringId?.toString()
        ) || null;
        
        if (foundHostel) {
          const hostelWithRating = {
            ...foundHostel,
            rating: (Math.random() * 1 + 4).toFixed(1)
          };
          setHostel(hostelWithRating);
          
          // If hostel is marked for deletion, start countdown
          if (foundHostel.status === 'pending_deletion') {
            setDeletionCountdown(60); // Start from 60 seconds
          }
        } else {
          setHostel(null);
        }
      } catch (error) {
        console.error("Error fetching hostel:", error);
        setHostel(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchHostel();
    }
  }, [id]);

  const facilityIcons: FacilityIcons = {
    'wifi': <FaWifi className="text-amber-500" />,
    'parking': <FaParking className="text-amber-500" />,
    'pool': <FaSwimmingPool className="text-amber-500" />,
    'security': <MdSecurity className="text-amber-500" />,
    'laundry': <MdLocalLaundryService className="text-amber-500" />,
    'gym': <MdFitnessCenter className="text-amber-500" />,
    'cafeteria': <FaUtensils className="text-amber-500" />,
    'furnished': <FaBed className="text-amber-500" />
  };

  const getFacilityIcon = (facility: string) => {
    const lowerFacility = facility.toLowerCase();
    for (const key in facilityIcons) {
      if (lowerFacility.includes(key)) return facilityIcons[key];
    }
    return <FiCheckCircle className="text-amber-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
          <div className="h-3 w-40 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <FiAlertTriangle className="text-red-500 text-2xl mx-auto mb-2" />
            <h3 className="text-xl font-light text-red-700 mb-2">Hostel Not Found</h3>
            <p className="text-red-600 text-sm">
              This hostel may have been removed or is no longer available.
            </p>
          </div>
          <Link 
            href="/explore" 
            className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Browse Available Hostels <IoIosArrowForward className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  // Show deletion warning if hostel is marked for deletion
  const isBeingDeleted = hostel.status === 'pending_deletion';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Deletion Warning Banner */}
      {isBeingDeleted && (
        <div className="bg-red-50 border-b border-red-200 py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-red-700">
            <FiClock className="animate-pulse flex-shrink-0" />
            <span className="text-sm font-medium">
              This hostel will be removed in {deletionCountdown} seconds. 
              Contact admin if this is a mistake.
            </span>
          </div>
        </div>
      )}

      {/* Fixed Header */}
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-20 md:py-6 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/explore" className="flex items-center text-slate-700 hover:text-amber-600 transition-colors">
            <FaChevronLeft className="mr-2 text-amber-600" />
            <span className="font-medium">Back to Explore</span>
          </Link>
          <div className="flex items-center space-x-2 bg-amber-50 px-4 py-2 rounded-full">
            <span className="text-xs uppercase tracking-wider text-amber-600 font-medium">Premium</span>
            <FaStar className="text-amber-500 text-sm" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12 md:px-6">
        {/* Image Gallery */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-6 mt-4 md:mb-8 md:mt-6">
          {validImages.length > 0 ? (
            <>
              <Slider ref={sliderRef} {...sliderSettings}>
                {validImages.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-[4/3] sm:aspect-video">
                    <img
                      src={image}
                      alt={`${hostel.name} - ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setFullscreenImage(image)}
                    />
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-full">
                      {index + 1}/{validImages.length}
                    </div>
                    <button 
                      onClick={() => setFullscreenImage(image)}
                      className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                    >
                      <FaExpand className="text-sm" />
                    </button>
                  </div>
                ))}
              </Slider>
              
              {validImages.length > 1 && (
                <>
                  <button 
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition shadow-md z-10"
                  >
                    <IoIosArrowBack className="text-amber-600" />
                  </button>
                  <button 
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition shadow-md z-10"
                  >
                    <IoIosArrowForward className="text-amber-600" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="aspect-[4/3] sm:aspect-video bg-slate-100 flex items-center justify-center">
              <span className="text-slate-400">No images available</span>
            </div>
          )}
          
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow">
            <FaStar className="inline mr-1" /> Premium
          </div>

          {isBeingDeleted && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow flex items-center">
              <FiClock className="inline mr-1 animate-pulse" />
              Removing in {deletionCountdown}s
            </div>
          )}

          {hostel.video && !isBeingDeleted && (
            <button
              onClick={() => setShowVideo(true)}
              className="absolute top-4 right-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow flex items-center hover:from-slate-700 hover:to-slate-600 transition"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              Tour
            </button>
          )}
        </div>

        {/* Property Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl font-serif font-light text-slate-800 mb-1 md:text-3xl">{hostel.name}</h1>
              <div className="flex items-center text-slate-600">
                <FaMapMarkerAlt className="text-amber-500 mr-1.5" />
                <span>{hostel.location}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200 md:p-6">
              <span className="text-xs uppercase tracking-wider text-amber-600 mb-1 block font-medium">Annual Rate</span>
              <p className="text-2xl font-light text-slate-800 md:text-3xl">{hostel.price}</p>
              <p className="text-sm text-amber-700 mt-1">All premium amenities included</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-serif font-light text-slate-800 mb-3">Description</h2>
              <p className="text-slate-600 leading-relaxed">{hostel.shortDescription}</p>
            </div>
          </div>

          {/* Booking Panel - Sticky on desktop */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <div className={`bg-white rounded-lg shadow-md p-4 border md:p-6 ${
              isBeingDeleted ? 'border-red-200 bg-red-50' : 'border-slate-100'
            }`}>
              <h3 className="text-xl font-serif font-light text-slate-800 mb-4">
                {isBeingDeleted ? 'Hostel Being Removed' : 'Arrange Viewing'}
              </h3>
              
              {isBeingDeleted ? (
                <div className="text-center py-6">
                  <FiAlertTriangle className="text-red-500 text-3xl mx-auto mb-3" />
                  <p className="text-red-600 mb-4">
                    This hostel is no longer available and will be removed shortly.
                  </p>
                  <Link 
                    href="/explore"
                    className="inline-flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Browse Available Hostels
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {hostel.video && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow hover:shadow-md text-sm md:text-base md:px-6 md:py-4"
                    >
                      <svg className="w-4 h-4 mr-2 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      Apartment tour
                    </button>
                  )}

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow hover:shadow-md text-sm md:text-base md:px-6 md:py-4"
                  >
                    <FaWhatsapp className="text-lg mr-2" />
                    Contact via WhatsApp
                  </a>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {hostel.facilities.slice(0, 5).map((facility: string, index: number) => (
                    <li key={index} className="flex items-center text-sm">
                      {getFacilityIcon(facility)}
                      <span className="text-slate-700 ml-2">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-8 overflow-x-auto">
          <div className="border-b border-slate-200 w-max min-w-full">
            <nav className="flex">
              {["description", "facilities", "location", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium text-sm uppercase tracking-wider relative min-w-max ${activeTab === tab ? "text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
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
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "description" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-serif font-light text-slate-800 mb-4">Overview</h3>
                <div className="prose text-slate-600">
                  <p className="mb-4">
                    This premium student accommodation in {hostel.location.split(',')[0]} offers modern living spaces designed for comfort and productivity.
                  </p>
                  <p>
                    Featuring high-speed internet, 24/7 security, and regular cleaning services, it provides the ideal environment for academic success.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-light text-slate-800 mb-4">Living Experience</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <MdSecurity className="text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">24/7 Security</h4>
                      <p className="text-slate-600 text-sm mt-1">On-site staff and CCTV surveillance</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <FaWifi className="text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">High-Speed Internet</h4>
                      <p className="text-slate-600 text-sm mt-1">Fiber optic connectivity included</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "facilities" && (
            <div>
              <h3 className="text-xl font-serif font-light text-slate-800 mb-6">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.facilities.map((facility: string, index: number) => (
                  <div 
                    key={index}
                    className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        {getFacilityIcon(facility)}
                      </div>
                      <span className="font-medium text-slate-800">{facility}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-serif font-light text-slate-800 mb-4">Location</h3>
                <div className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                    <FaMapMarkerAlt className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium mb-2">{hostel.location}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span>5 min walk to campus</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span>3 min walk to shopping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                <div className="text-center p-4">
                  <svg className="w-10 h-10 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <h4 className="text-lg font-medium text-slate-700 mb-1">Interactive Map</h4>
                  <p className="text-slate-500 text-sm">Detailed map coming soon</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-xl font-serif font-light text-slate-800 mb-6">Reviews</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm md:p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-medium md:w-10 md:h-10">
                        {review === 1 ? 'JD' : review === 2 ? 'AM' : 'TK'}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-slate-800">
                          {review === 1 ? 'John D.' : review === 2 ? 'Amina M.' : 'Tunde K.'}
                        </h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={`text-xs ${i < 4 ? 'text-amber-500' : 'text-slate-300'} md:text-sm`} />
                          ))}
                        </div>
                      </div>
                      <div className="ml-auto text-xs text-slate-500 md:text-sm">
                        {review === 1 ? '2 months ago' : review === 2 ? '1 month ago' : '3 weeks ago'}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base">
                      {review === 1 
                        ? "Perfect location and excellent facilities. Highly recommend!"
                        : review === 2
                        ? "Very responsive management and well-maintained property."
                        : "Best student accommodation I've experienced."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Video Modal - Fullscreen on mobile */}
      <AnimatePresence>
        {showVideo && hostel.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-0 sm:p-4"
          >
            <div className="relative w-full h-full sm:max-w-4xl sm:h-auto sm:rounded-lg overflow-hidden">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 text-white hover:text-amber-400 transition p-2 z-10 sm:top-6 sm:right-6"
              >
                <FiX className="w-6 h-6" />
              </button>
              <div className="w-full h-full">
                <iframe
                  src={hostel.video}
                  className="w-full h-full min-h-[calc(100vh-80px)] sm:min-h-[500px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-amber-400 transition p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(null);
              }}
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-w-6xl flex items-center justify-center">
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen hostel view"
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
              />
              {validImages.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
                  {validImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenImage(img);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${fullscreenImage === img ? 'bg-amber-500 w-4' : 'bg-white/60'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Mobile */}
      {!isBeingDeleted && (
        <div className="fixed bottom-6 right-6 z-10 lg:hidden">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
          >
            <FaWhatsapp className="text-2xl" />
          </a>
        </div>
      )}
    </div>
  );
};

export default HostelDetailPage;