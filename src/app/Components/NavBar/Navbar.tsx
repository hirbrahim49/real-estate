"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch, FaWhatsapp, FaBars, FaTimes, FaChevronDown, FaPlus } from "react-icons/fa";

interface AreaData {
  data: string[];
  success: boolean;
}

const Navbar = () => {
const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const [allAreas, setAllAreas] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState<boolean>(true);

   const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: Use relative path for production
    return process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : '/api';
  }
  // Server-side: Use full URL
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_PROD_API_BASE_URL || 'https://hostelhub.shop';
};
  // Animation variants for the HostelHub text
  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      scale: 1.05,
      color: "#d97706", // amber-600
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Fetch areas from your API
 useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoadingAreas(true);
        const apiUrl = `${getApiBaseUrl()}/api/areas`;
        console.log('Fetching areas from:', apiUrl); // Debugging
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: AreaData = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          const validAreas = data.data
            .map((area: string) => String(area || '').trim())
            .filter((area: string) => area.length > 0);
          
          setAllAreas(validAreas);
        }
      } catch (error) {
        console.error("Failed to fetch areas:", error);
        setAllAreas([]);
      } finally {
        setIsLoadingAreas(false);
      }
    };

    fetchAreas();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setSearchQuery(query);

    if (query.length > 0 && allAreas.length > 0) {
      const filtered = allAreas.filter((area: string) => 
        area.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas([]);
    }
  };

  const handleAreaSelect = (area: string) => {
    setSearchQuery(area);
    setFilteredAreas([]);
    window.location.href = `/explore?area=${encodeURIComponent(area)}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 font-sans">
      <div className="w-[97%] md:w-[95%] lg:w-[90%] mx-auto flex justify-between items-center px-4 py-3 md:px-6 md:py-4">
        {/* Logo & Site Name with Animation */}
        <div className="flex items-center space-x-2">
          <motion.img
            src="/Image/logo.png"
            alt="HostelHub Logo"
            className="w-10 h-10 md:w-12 md:h-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <Link href="/" passHref>
            <motion.div
              className="text-xl md:text-2xl lg:text-3xl font-bold text-black font-serif"
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={logoVariants}
            >
              HostelHub
            </motion.div>
          </Link>
        </div>

        {/* Navigation Links (Hidden on md and smaller screens) */}
        <ul className="hidden lg:flex space-x-8 font-medium text-gray-700 text-lg">
          <motion.li whileHover={{ y: -2 }} className="hover:text-amber-600 transition">
            <Link href="/">Home</Link>
          </motion.li>
          <motion.li whileHover={{ y: -2 }} className="hover:text-amber-600 transition">
            <Link href="/explore">Explore</Link>
          </motion.li>
          <motion.li whileHover={{ y: -2 }} className="hover:text-amber-600 transition">
            <Link href="/about">About</Link>
          </motion.li>
          {/* Add List Hostel button here */}
          <motion.li whileHover={{ y: -2 }} className="hover:text-amber-600 transition">
            <Link href="/addHostels" className="flex items-center gap-1">
              <FaPlus className="text-sm" />
              <span>Post Hostel</span>
            </Link>
          </motion.li>
          <motion.li whileHover={{ y: -2 }} className="hover:text-amber-600 transition">
            <Link href="/contact">Contact</Link>
          </motion.li>
        </ul>

        {/* Search Bar & WhatsApp Icon */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Search Bar */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder={isLoadingAreas ? "Loading areas..." : "Search areas..."}
                className="w-64 border border-slate-300 rounded-full px-4 py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-gold text-sm lg:text-base"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                disabled={isLoadingAreas}
              />
              <FaSearch className="absolute left-3 top-3 text-amber-500" />
              {!isLoadingAreas && allAreas.length > 0 && (
                <FaChevronDown className="absolute right-3 top-3 text-gray-400 text-xs" />
              )}
            </div>

            {/* Search Results Dropdown */}
            {(filteredAreas.length > 0 && isSearchFocused) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden"
              >
                {filteredAreas.map((area, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors"
                    onClick={() => handleAreaSelect(area)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-slate-700">{area}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
          {/* WhatsApp Contact */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="https://wa.me/2349135843102" target="_blank">
              <FaWhatsapp className="text-2xl lg:text-3xl text-green-500 hover:text-green-600 transition" />
            </Link>
          </motion.div>

          {/* Mobile Menu Icon */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-gray-600 hover:text-amber-500 transition"
          >
            {isMenuOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu (Sidebar) */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed top-0 right-0 w-80 h-full bg-slate-700 backdrop-blur-lg shadow-2xl z-50 lg:hidden p-6 font-mono rounded-l-3xl"
      >
        {/* Header with Logo and Close */}
        <div className="flex justify-between items-center mb-8">
          <img
            src="/Image/logo.png"
            alt="HostelHub Logo"
            className="w-12 h-12 rounded-full border-2 border-amber-500"
          />
          <button
            className="text-gray-800 hover:text-gold transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes className="text-3xl text-white" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="relativ text-white mb-8">
          <input
            type="text"
            placeholder={isLoadingAreas ? "Loading areas..." : "Search areas..."}
            className="w-full border border-white-300 rounded-full px-5 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-white-400"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            disabled={isLoadingAreas}
          />

          {/* Mobile Search Results */}
          {(filteredAreas.length > 0 && isSearchFocused) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden"
            >
              {filteredAreas.map((area, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors"
                  onClick={() => handleAreaSelect(area)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-slate-700">{area}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6 font-medium text-lg">
          {[
            { name: "Home", path: "/" },
            { name: "Explore", path: "/explore" },
            { name: "About", path: "/about" },
            { 
              name: "Post Hostel", 
              path: "/addHostels",
              icon: <FaPlus className="mr-2 text-sm" />
            },
            { name: "Contact", path: "/contact" },
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl text-white shadow-lg bg-white/20 hover:bg-gray-300/30 active:bg-gray-400/40 transition-all"
            >
              <Link href={item.path} onClick={() => setIsMenuOpen(false)} className="flex items-center">
                {item.icon && item.icon}
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* WhatsApp Contact */}
        <div className="mt-10">
          <Link 
            href="https://wa.me/2349135843102" 
            target="_blank" 
            className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full transition"
          >
            <FaWhatsapp className="text-xl" />
            <span>Chat on WhatsApp</span>
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;