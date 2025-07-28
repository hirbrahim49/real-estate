"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaWhatsapp, FaBars, FaTimes, FaChevronDown, FaPlus, FaMapMarkerAlt, FaHome, FaCompass, FaInfoCircle, FaEnvelope } from "react-icons/fa";

interface AreaData {
  data: string[];
  success: boolean;
}

const Navbar = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const [allAreas, setAllAreas] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState<boolean>(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation items with icons
  const navItems = [
    { name: "Home", path: "/", icon: <FaHome className="text-lg" /> },
    { name: "Explore", path: "/explore", icon: <FaCompass className="text-lg" /> },
    { name: "About", path: "/about", icon: <FaInfoCircle className="text-lg" /> },
    { name: "Post Hostel", path: "/addHostels", icon: <FaPlus className="text-lg" /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope className="text-lg" /> },
    { name: "Properties", path: "/properties", icon: <FaHome className="text-lg" /> }
  ];
  // <FaHome className="mr-2" />

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : '/api';
    }
    return process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : process.env.NEXT_PUBLIC_PROD_API_BASE_URL || 'https://hostelhub.shop';
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoadingAreas(true);
        const apiUrl = `${getApiBaseUrl()}/api/areas`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
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

  // Animation variants
  const mobileMenuVariants = {
    hidden: { 
      x: "100%",
      transition: { 
        ease: [0.32, 0.72, 0.32, 1],
        duration: 0.3 
      }
    },
    visible: { 
      x: 0,
      transition: { 
        ease: [0.32, 0.72, 0.32, 1],
        duration: 0.3 
      }
    }
  };

  const navItemVariants = {
    hover: { 
      y: -2,
      color: "#d97706",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98 
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 font-sans">
      {/* Desktop Navbar */}
      <div className="w-[97%] md:w-[95%] lg:w-[90%] mx-auto flex justify-between items-center px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" passHref className="flex items-center space-x-2 group">
          <motion.img
            src="/Image/logo.png"
            alt="HostelHub Logo"
            className="w-10 h-10 md:w-12 md:h-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.span
            className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-serif"
            whileHover={{ color: "#d97706" }}
            transition={{ duration: 0.2 }}
          >
            HostelHub
          </motion.span>
        </Link>

        {/* Desktop Navigation with Icons */}
        <ul className="hidden lg:flex space-x-1 font-medium">
          {navItems.map((item) => (
            <motion.li 
              key={item.name}
              whileHover="hover"
              whileTap="tap"
            >
              <Link 
                href={item.path} 
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${pathname === item.path ? 'text-amber-600 bg-amber-50' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder={isLoadingAreas ? "Loading areas..." : "Search areas..."}
                className="w-64 border border-gray-200 rounded-full px-4 py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm transition-all duration-200"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                disabled={isLoadingAreas}
              />
              <FaSearch className="absolute left-3 top-2.5 text-amber-500" />
              {!isLoadingAreas && allAreas.length > 0 && (
                <FaChevronDown className="absolute right-3 top-2.5 text-gray-400 text-xs" />
              )}
            </div>

            {/* Search Results */}
            <AnimatePresence>
              {(filteredAreas.length > 0 && isSearchFocused) && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                >
                  {filteredAreas.map((area, index) => (
                    <div
                      key={index}
                      className="px-4 py-2.5 hover:bg-amber-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => handleAreaSelect(area)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 mr-2 text-amber-500" />
                        <span className="truncate">{area}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* WhatsApp */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link href="https://wa.me/2349135843102" target="_blank" aria-label="WhatsApp">
              <FaWhatsapp className="text-2xl text-green-500 hover:text-green-600 transition" />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-gray-600 hover:text-amber-500 transition p-1"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Fixed Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu Content */}
            <motion.div
              ref={menuRef}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl z-50 p-6 overflow-y-auto"
              style={{ boxShadow: '-10px 0 30px rgba(0,0,0,0.3)' }}
            >
              {/* Menu Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                  <img
                    src="/Image/logo.png"
                    alt="HostelHub Logo"
                    className="w-12 h-12 rounded-full border-2 border-amber-500"
                  />
                  <span className="text-xl font-bold text-white">HostelHub</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-amber-400 transition p-1"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <div className="relative">
                  <input
                    type="text"
                    id="mobile-search"
                    name="mobile-search"
                    placeholder={isLoadingAreas ? "Loading areas..." : "Search areas..."}
                    className="w-full bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-full px-4 py-3 pl-12 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    disabled={isLoadingAreas}
                  />
                  <FaSearch className="absolute left-4 top-3.5 text-amber-400" />
                </div>
              </div>

              {/* Navigation Links with Icons */}
              <motion.ul className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-white hover:bg-slate-700 transition-all group"
                    >
                      <span className="mr-3 text-amber-400 group-hover:text-amber-300 transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* WhatsApp Button */}
              <div className="mt-8">
                <Link
                  href="https://wa.me/2349135843102"
                  target="_blank"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <FaWhatsapp className="text-xl" />
                  <span className="font-medium">Chat on WhatsApp</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;