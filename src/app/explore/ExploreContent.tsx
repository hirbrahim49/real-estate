'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
}

const Page = () => {
  // Enhanced animation variants
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

  // State declarations
  const [hostelsData, setHostelsData] = useState<Hostel[]>([]);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [visibleHostels, setVisibleHostels] = useState(6);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("recommended");
  const searchParams = useSearchParams();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hostels');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Add random ratings for demo purposes
        const dataWithRatings = data.map((hostel: Hostel) => ({
          ...hostel,
          rating: (Math.random() * 1 + 4).toFixed(1) // Random rating between 4.0-5.0
        }));
        setHostelsData(dataWithRatings);
      } catch (error) {
        console.error("Fetch error:", error);
        setHostelsData([]);
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
  const allAreas = [...new Set(hostelsData.map(hostel => 
    hostel.area.trim()
  ))].filter(Boolean).sort();

  // Enhanced filter and sort function
  const filteredHostels = activeArea
    ? hostelsData.filter(hostel => 
        hostel.area.trim().toLowerCase() === activeArea.trim().toLowerCase()
      )
    : hostelsData;

  const sortedHostels = [...filteredHostels].sort((a, b) => {
    switch(sortOption) {
      case "price-low":
        return parsePrice(a.price) - parsePrice(b.price);
      case "price-high":
        return parsePrice(b.price) - parsePrice(a.price);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0; // Recommended order (original order)
    }
  });

  function parsePrice(priceStr: string): number {
    const numericValue = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  const loadMoreHostels = () => setVisibleHostels(prev => prev + 6);

  // Reset visible hostels when filter changes
  useEffect(() => {
    setVisibleHostels(6);
  }, [activeArea, sortOption]);

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
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500 animate-spin"></div>
        </div>
        <h3 className="text-xl font-medium text-slate-800">Loading Premium Hostels</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Premium Student Accommodations
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Curated selection of high-quality hostels with premium amenities for the modern student
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
            {activeArea ? `Hostels in ${activeArea}` : 'Our Premium Collection'}
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {activeArea 
              ? `Premium accommodations in ${activeArea}`
              : 'Each property meets our rigorous standards for quality and comfort'}
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveArea(null)}
              className={`px-5 py-2.5 rounded-lg transition-all font-medium text-sm ${
                activeArea === null
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              All Locations
            </button>
            {allAreas.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area.trim())}
                className={`px-5 py-2.5 rounded-lg transition-all font-medium text-sm ${
                  activeArea === area
                    ? "bg-slate-800 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {area.trim()}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <p className="text-slate-600 text-sm">
              Showing {Math.min(visibleHostels, sortedHostels.length)} of {sortedHostels.length} properties
            </p>
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Hostel Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {noHostelsAvailable() ? (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-medium text-slate-700 mb-4">
                No hostels available in {activeArea}
              </h3>
              <button
                onClick={() => setActiveArea(null)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                View All Hostels
              </button>
            </div>
          ) : (
            sortedHostels.slice(0, visibleHostels).map((hostel) => (
              <motion.div
                key={hostel.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                variants={fadeIn}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={hostel.images[0] || '/default-hostel.jpg'} 
                    alt={hostel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Premium
                  </div>
                  {hostel.video && (
                    <div className="absolute top-4 right-4 bg-slate-900/70 text-white p-2 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-slate-800">{hostel.name}</h3>
                    <div className="flex items-center bg-slate-100 px-2 py-1 rounded">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium ml-1">{hostel.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4 flex items-center text-sm">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {hostel.location}
                  </p>
                  
                  <p className="text-slate-500 text-sm mb-5 line-clamp-2">{hostel.shortDescription}</p>

                  {/* Facilities */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Key Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hostel.facilities.slice(0, 4).map((facility, index) => (
                        <span key={index} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                          {facility}
                        </span>
                      ))}
                      {hostel.facilities.length > 4 && (
                        <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                          +{hostel.facilities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Starting from</p>
                      <p className="text-xl font-bold text-slate-800">{hostel.price}</p>
                    </div>
                    <Link 
                      href={`/hostel/${hostel.id}`}
                      className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {!noHostelsAvailable() && visibleHostels < sortedHostels.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={loadMoreHostels}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              Show More Properties
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6 font-serif">Need Help Finding Accommodation?</h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our team can help you find the perfect place tailored to your needs.
          </p>
          <Link 
            href="/contact"
            className="px-8 py-3 bg-white hover:bg-slate-100 text-amber-600 font-medium rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center mx-auto w-fit"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;