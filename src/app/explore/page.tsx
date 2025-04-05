"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

const Page = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // State declarations
  const [hostelsData, setHostelsData] = useState<Hostel[]>([]);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [visibleHostels, setVisibleHostels] = useState(6);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/hostels'); // Changed to relative path
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setHostelsData(data.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle area from URL query parameter
  useEffect(() => {
    if (searchParams) {
      const areaParam = searchParams.get('area');
      if (areaParam) {
        setActiveArea(areaParam);
      }
    }
  }, [searchParams]);

  // Get unique areas
  const allAreas = [...new Set(hostelsData.map((hostel) => hostel.area))].sort();

  // Filter hostels
  const filteredHostels = activeArea
    ? hostelsData.filter(hostel => 
        hostel.area.toLowerCase() === activeArea.toLowerCase()
      )
    : hostelsData;

  const loadMoreHostels = () => setVisibleHostels(prev => prev + 6);

  // Reset visible hostels when filter changes
  useEffect(() => {
    setVisibleHostels(6);
  }, [activeArea]);

  // Function to check if no hostels are available in the selected area
  const noHostelsAvailable = () => {
    if (activeArea) {
      return !hostelsData.some(hostel => 
        hostel.area.toLowerCase() === activeArea.toLowerCase()
      );
    }
    return false;
  };

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
    <div className="min-h-screen bg-slate-50 mt-[70px]">
<motion.section 
        initial="hidden" 
        whileInView="visible" 
        variants={fadeIn} 
        viewport={{ once: true, amount: 0.5 }} 
        className="relative py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium tracking-widest">PREMIUM ACCOMMODATIONS</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
            variants={fadeIn}
          >
            Exceptional Student Living <br className="hidden lg:block"/> Experiences
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          />
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 leading-relaxed"
            variants={fadeIn} 
            transition={{ delay: 0.2 }}
          >
            Discover hand-selected premium accommodations with unparalleled amenities, 
            designed for the discerning student.
          </motion.p>
          
          <motion.div 
            variants={fadeIn} 
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto">
              <span>Explore Our Collection</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
            {activeArea ? `Hostels in ${activeArea}` : 'Curated Selection'}
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {activeArea 
              ? `Premium accommodations available in ${activeArea}`
              : 'Each property in our collection meets rigorous standards for quality, comfort, and student-focused amenities.'}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveArea(null)}
              className={`px-6 py-3 rounded-lg transition-all font-medium text-sm tracking-wider flex items-center ${
                activeArea === null
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              All Locations
            </button>
            {allAreas.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-6 py-3 rounded-lg transition-all font-medium text-sm tracking-wider ${
                  activeArea === area
                    ? "bg-slate-800 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 px-2">
            <p className="text-slate-600 text-sm">
              Showing <span className="font-medium">{Math.min(visibleHostels, filteredHostels.length)}</span> of{" "}
              <span className="font-medium">{filteredHostels.length}</span> properties
            </p>
            <div className="relative w-full md:w-auto">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-3 pr-10 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm w-full md:w-64">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: Highest First</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hostel Cards */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {noHostelsAvailable() ? (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-medium text-slate-700 mb-4">
                No hostels available in {activeArea} area
              </h3>
              <button
                onClick={() => setActiveArea(null)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                View All Hostels
              </button>
            </div>
          ) : (
            filteredHostels.slice(0, visibleHostels).map((hostel) => (
              <motion.div
                key={hostel.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
                whileHover={{ y: -8 }}
                variants={fadeIn}
              >
                {/* Hostel Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={hostel.images[0] || '/default-hostel-image.jpg'} 
                    alt={hostel.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Premium
                  </div>
                </div>
                
                {/* Hostel Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-slate-800">{hostel.name}</h2>
                    <div className="flex items-center bg-slate-100 px-2 py-1 rounded">
                      <svg className="w-4 h-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm font-medium ml-1">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4 flex items-center text-sm">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hostel.location}
                  </p>
                  
                  <p className="text-slate-500 text-sm mb-5">{hostel.shortDescription}</p>

                  {/* Facilities */}
                  <div className="mb-6">
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Key Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {hostel.facilities.slice(0, 4).map((facility, index) => (
                        <span key={index} className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Starting from</p>
                      <p className="text-xl font-bold text-slate-800">{hostel.price}</p>
                    </div>
                    <Link 
                      href={`/hostel/${hostel.id}`}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 flex items-center"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.section>

        {!noHostelsAvailable() && visibleHostels < filteredHostels.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={loadMoreHostels}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium"
            >
              Show More Properties
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6 font-serif">Can't Find What You're Looking For?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our concierge service can help you find the perfect accommodation tailored 
            to your specific needs and preferences.
          </p>
          <button className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto">
            <span>Contact Our Concierge</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;