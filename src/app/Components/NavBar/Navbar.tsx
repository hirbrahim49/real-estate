"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch, FaWhatsapp, FaBars, FaTimes, FaChevronDown, FaPlus } from "react-icons/fa";
import { hostelsData } from "../Data/Product";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get all unique areas from your hostelsData
  const allAreas = [...new Set(hostelsData.map((group) => group.area))];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      setFilteredAreas(
        allAreas.filter(area => 
          area.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredAreas([]);
    }
  };

  const handleAreaSelect = (area: string) => {
    setSearchQuery(area);
    setFilteredAreas([]);
    // You can navigate directly to the explore page with the area selected
    window.location.href = `/explore?area=${encodeURIComponent(area)}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 font-sans">
      <div className="w-[97%] md:w-[95%] lg:w-[90%] mx-auto flex justify-between items-center px-4 py-3 md:px-6 md:py-4">
        {/* Logo & Site Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/Image/logo.png"
            alt="HostelHub Logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <Link
            href="/"
            className="text-xl md:text-2xl lg:text-3xl font-bold text-black font-serif"
          >
            HostelHub
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
                placeholder="Search areas..."
                className="w-64 border border-slate-300 rounded-full px-4 py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-gold text-sm lg:text-base"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <FaSearch className="absolute left-3 top-3 text-amber-500" />
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 text-xs" />
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
                    onMouseDown={(e) => e.preventDefault()} // Prevent input blur
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
            placeholder="Search areas..."
            className="w-full border border-white-300 rounded-full px-5 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-white-400"
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* <FaSearch className="absolute left-4 top-4 text-amber-500" /> */}

          {/* Mobile Search Results */}
          {filteredAreas.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
              {filteredAreas.map((area, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors"
                  onClick={() => {
                    handleAreaSelect(area);
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-black">{area}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6 font-medium text-lg">
          {[
            { name: "Home", path: "/" },
            { name: "Explore", path: "/explore" },
            { name: "About", path: "/about" },
            // Add List Hostel to mobile menu
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