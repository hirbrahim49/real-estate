'use client';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaStar, 
  FaChevronLeft, 
  FaBed, 
  FaWifi, 
  FaParking, 
  FaSwimmingPool, 
  FaUtensils, 
  FaExpand,
  FaShieldAlt,
  FaUniversity,
  FaMoneyBillWave
} from "react-icons/fa";
import { 
  FiCheckCircle, 
  FiX, 
  FiClock, 
  FiAlertTriangle, 
  FiHome,
  FiMessageCircle,
  FiPhone,
  FiCheck,
  FiShare2,
  FiHeart,
  FiVideo
} from "react-icons/fi";
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
  const [activeTab, setActiveTab] = useState("overview");
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [deletionCountdown, setDeletionCountdown] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const sliderRef = useRef<Slider>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

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
    
    return `Hello HostelHub Admin,\n\nI'm interested in booking this hostel:\n\n*🏠 ${hostel.name}*\n📍 *Location:* ${hostel.location}\n💰 *Price:* ${hostel.price}\n⭐ *Rating:* ${hostel.rating || "4.5"}/5\n\n*Key Features:*\n${hostel.facilities.slice(0, 5).map(f => `• ${f}`).join('\n')}\n\nPlease provide:\n1. Room availability\n2. Booking procedure\n3. Payment options\n\nLooking forward to your response. Thank you!`;
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
          
          if (foundHostel.status === 'pending_deletion') {
            setDeletionCountdown(60);
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
    'wifi': <FaWifi className="text-amber-600" />,
    'parking': <FaParking className="text-amber-600" />,
    'pool': <FaSwimmingPool className="text-amber-600" />,
    'security': <FaShieldAlt className="text-amber-600" />,
    'laundry': <MdLocalLaundryService className="text-amber-600" />,
    'gym': <MdFitnessCenter className="text-amber-600" />,
    'cafeteria': <FaUtensils className="text-amber-600" />,
    'furnished': <FaBed className="text-amber-600" />,
    'electricity': <FiCheckCircle className="text-amber-600" />,
    'campus': <FaUniversity className="text-amber-600" />,
    'study': <FiCheckCircle className="text-amber-600" />
  };

  const getFacilityIcon = (facility: string) => {
    const lowerFacility = facility.toLowerCase();
    for (const key in facilityIcons) {
      if (lowerFacility.includes(key)) return facilityIcons[key];
    }
    return <FiCheckCircle className="text-amber-600" />;
  };

  // Check if video exists and is valid
  const hasVideo = hostel?.video && hostel.video.trim() !== '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center space-y-6">
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
          <h3 className="text-xl font-semibold text-slate-800">Loading Premium Hostel</h3>
          <p className="text-slate-500">Getting the best details for you...</p>
        </motion.div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-slate-200"
        >
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <FiAlertTriangle className="text-red-500 text-3xl mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Hostel Not Found</h3>
            <p className="text-red-600 text-sm">
              This hostel may have been removed or is no longer available.
            </p>
          </div>
          <Link 
            href="/explore" 
            className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all font-medium shadow hover:shadow-md"
          >
            Browse Available Hostels 
            <IoIosArrowForward className="ml-2" />
          </Link>
        </motion.div>
      </div>
    );
  }

  const isBeingDeleted = hostel.status === 'pending_deletion';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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

      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md py-4 px-4 sticky top-0 z-50 border-b border-slate-200/60 md:py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            href="/explore" 
            className="flex items-center text-slate-700 hover:text-amber-600 transition-all group font-medium"
          >
            <FaChevronLeft className="mr-2 text-amber-600 group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Link>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg transition-all ${
                isFavorite 
                  ? 'bg-red-50 text-red-500 border border-red-200' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FiHeart className={isFavorite ? 'fill-current' : ''} />
            </button>
            
            <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
              <FiShare2 />
            </button>
            
            <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full shadow-sm">
              <FaStar className="text-sm" />
              <span className="text-xs font-medium tracking-wide">PREMIUM</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12 md:px-6">
        {/* Enhanced Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-xl mb-8 mt-6 border border-slate-200"
        >
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
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {index + 1}/{validImages.length}
                    </div>
                    <button 
                      onClick={() => setFullscreenImage(image)}
                      className="absolute bottom-4 left-4 bg-black/60 text-white p-2.5 rounded-full hover:bg-black/80 transition-all backdrop-blur-sm"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full hover:bg-white transition-all shadow-lg z-10 backdrop-blur-sm"
                  >
                    <IoIosArrowBack className="text-amber-600 text-lg" />
                  </button>
                  <button 
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full hover:bg-white transition-all shadow-lg z-10 backdrop-blur-sm"
                  >
                    <IoIosArrowForward className="text-amber-600 text-lg" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="aspect-[4/3] sm:aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center">
                <FiHome className="text-slate-400 text-4xl mx-auto mb-3" />
                <span className="text-slate-500 font-medium">No images available</span>
              </div>
            </div>
          )}
          
          {/* Premium Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center">
            <FaStar className="mr-2" />
            Premium
          </div>

          {isBeingDeleted && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow flex items-center">
              <FiClock className="mr-2 animate-pulse" />
              Removing in {deletionCountdown}s
            </div>
          )}

          {hasVideo && !isBeingDeleted && (
            <button
              onClick={() => setShowVideo(true)}
              className="absolute top-4 right-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow flex items-center hover:from-slate-700 hover:to-slate-600 transition-all backdrop-blur-sm"
            >
              <FiVideo className="w-4 h-4 mr-2" />
              Virtual Tour
            </button>
          )}
        </motion.div>

        {/* Enhanced Property Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Title and Location */}
              <motion.div variants={fadeIn} className="mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 leading-tight">
                  {hostel.name}
                </h1>
                <div className="flex items-center text-slate-600 text-lg">
                  <FaMapMarkerAlt className="text-amber-500 mr-3 text-xl" />
                  <span className="font-medium">{hostel.location}</span>
                </div>
              </motion.div>

              {/* Rating and Status */}
              <motion.div variants={fadeIn} className="flex items-center space-x-6">
                <div className="flex items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  <FaStar className="text-amber-500 mr-2" />
                  <span className="font-semibold text-slate-800">{hostel.rating}</span>
                  <span className="text-slate-500 ml-1">/5</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <FiCheckCircle className="text-green-500 mr-2" />
                  <span className="font-medium">Available Now</span>
                </div>
              </motion.div>

              {/* Enhanced Price Section */}
              <motion.div variants={fadeIn} className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-amber-100 text-sm font-medium tracking-wider uppercase block mb-1">
                      Annual Rate
                    </span>
                    <p className="text-3xl md:text-4xl font-bold mb-1">{hostel.price}</p>
                    <p className="text-amber-100 text-sm">All premium amenities included • No hidden fees</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      Best Value
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Facilities Preview */}
              <motion.div variants={fadeIn} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                  <FiCheckCircle className="text-amber-500 mr-2" />
                  Key Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hostel.facilities.slice(0, 6).map((facility: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                      {getFacilityIcon(facility)}
                      <span className="text-slate-700 text-sm font-medium">{facility}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Description */}
              <motion.div variants={fadeIn} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Property Overview</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{hostel.shortDescription}</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Booking Panel */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`bg-white rounded-2xl shadow-xl p-6 border ${
                isBeingDeleted ? 'border-red-200 bg-red-50' : 'border-slate-200'
              }`}
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                {isBeingDeleted ? '🚫 Hostel Being Removed' : 'Arrange Viewing'}
              </h3>
              
              {isBeingDeleted ? (
                <div className="text-center py-6">
                  <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                  <p className="text-red-600 mb-6 text-lg font-medium">
                    This hostel is no longer available and will be removed shortly.
                  </p>
                  <Link 
                    href="/explore"
                    className="inline-flex items-center px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-semibold shadow hover:shadow-md"
                  >
                    Browse Available Hostels
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {hasVideo && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="w-full px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <FiVideo className="w-5 h-5 mr-3" />
                      Watch Virtual Tour
                    </button>
                  )}

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FaWhatsapp className="text-xl mr-3" />
                    Contact via WhatsApp
                  </a>

                  <button className="w-full px-6 py-4 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 rounded-xl font-semibold transition-all flex items-center justify-center shadow hover:shadow-md">
                    <FiMessageCircle className="mr-3" />
                    Schedule Visit
                  </button>
                </div>
              )}

              {/* Enhanced Key Features */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-sm uppercase tracking-wider text-slate-500 mb-4 font-semibold">Premium Features</h4>
                <ul className="space-y-3">
                  {hostel.facilities.slice(0, 5).map((facility: string, index: number) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="bg-amber-100 p-2 rounded-lg mr-3">
                        {getFacilityIcon(facility)}
                      </div>
                      <span className="text-slate-700 font-medium">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <nav className="flex overflow-x-auto">
              {["overview", "amenities", "location", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-max px-6 py-4 font-semibold text-sm uppercase tracking-wider relative transition-all ${
                    activeTab === tab 
                      ? "text-amber-600 bg-amber-50" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Enhanced Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Property Details</h3>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 text-lg leading-relaxed mb-6">
                        {hostel.shortDescription}
                      </p>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        Located in the heart of {hostel.area}, this accommodation provides students with a comfortable and secure living environment perfect for academic success.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Living Experience</h3>
                    <div className="space-y-4">
                      {hostel.facilities.includes('24/7 Security') && (
                        <div className="flex items-start p-4 bg-slate-50 rounded-xl">
                          <div className="bg-amber-100 p-3 rounded-lg mr-4">
                            <FaShieldAlt className="text-amber-600 text-xl" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-lg mb-2">24/7 Security</h4>
                            <p className="text-slate-600">On-site staff and CCTV surveillance for complete peace of mind</p>
                          </div>
                        </div>
                      )}
                      {hostel.facilities.includes('WiFi') && (
                        <div className="flex items-start p-4 bg-slate-50 rounded-xl">
                          <div className="bg-amber-100 p-3 rounded-lg mr-4">
                            <FaWifi className="text-amber-600 text-xl" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-lg mb-2">High-Speed Internet</h4>
                            <p className="text-slate-600">Reliable connectivity included for seamless online learning</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "amenities" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-8">All Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hostel.facilities.map((facility: string, index: number) => (
                      <div 
                        key={index}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-amber-200 group"
                      >
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                            {getFacilityIcon(facility)}
                          </div>
                          <span className="font-semibold text-slate-800">{facility}</span>
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
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Location Details</h3>
                    <div className="flex items-start mb-6">
                      <div className="bg-amber-100 p-3 rounded-lg mr-4">
                        <FaMapMarkerAlt className="text-amber-600 text-xl" />
                      </div>
                      <div>
                        <p className="text-slate-700 font-semibold text-lg mb-3">{hostel.location}</p>
                        <div className="space-y-3">
                          <div className="flex items-center text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                            <span className="font-medium">Convenient location in {hostel.area}</span>
                          </div>
                          <div className="flex items-center text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                            <span className="font-medium">Easy access to campus and amenities</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden h-64 lg:h-auto flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                        <svg className="w-12 h-12 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">Location Map</h4>
                        <p className="text-slate-600">Interactive map coming soon</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Student Reviews</h3>
                      <p className="text-slate-600">Hear from students who've lived here</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-slate-800">{hostel.rating}</div>
                      <div className="flex items-center justify-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-lg ${i < 4 ? 'text-amber-500' : 'text-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                            {review === 1 ? 'JD' : review === 2 ? 'AM' : 'TK'}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-slate-800 text-lg">
                                {review === 1 ? 'John D.' : review === 2 ? 'Amina M.' : 'Tunde K.'}
                              </h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={`text-sm ${i < 4 ? 'text-amber-500' : 'text-slate-300'}`} />
                                ))}
                              </div>
                            </div>
                            <div className="text-slate-500 text-sm">
                              {review === 1 ? '2 months ago' : review === 2 ? '1 month ago' : '3 weeks ago'}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed">
                          {review === 1 
                            ? "Great location and excellent facilities. The management is very responsive and the security is reliable. Highly recommend for students!"
                            : review === 2
                            ? "Very responsive management and well-maintained property. The internet speed is good for online classes and the environment is peaceful."
                            : "Comfortable accommodation with all necessary amenities. The location is convenient and the community is friendly. Great value for money!"}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {showVideo && hasVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden bg-black">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 text-white hover:text-amber-400 transition p-3 bg-black/50 rounded-full z-10 backdrop-blur-sm"
              >
                <FiX className="w-6 h-6" />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  src={hostel.video}
                  className="w-full h-full rounded-2xl"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Fullscreen Image Viewer */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-amber-400 transition p-3 bg-black/50 rounded-full z-10 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(null);
              }}
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen hostel view"
                className="max-w-full max-h-full object-contain rounded-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              />
              {validImages.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
                  {validImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenImage(img);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        fullscreenImage === img 
                          ? 'bg-amber-500 w-6' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Action Button */}
      {!isBeingDeleted && (
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-green-600 transition-all transform hover:scale-110"
          >
            <FaWhatsapp className="text-2xl" />
          </a>
        </div>
      )}
    </div>
  );
};

export default HostelDetailPage;