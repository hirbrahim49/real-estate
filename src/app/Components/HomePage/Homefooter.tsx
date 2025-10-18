"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaInstagram, 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUniversity
} from 'react-icons/fa';
import { 
  FiArrowRight, 
  FiHome,
  FiMessageCircle,
  FiAward,
  FiCheckCircle
} from 'react-icons/fi';

const Footer = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Define your links with custom paths
  const companyLinks = [
    { text: 'About Us', path: '/about', icon: <FiAward className="text-amber-500" /> },
    { text: 'Our Mission', path: '/about', icon: <FiCheckCircle className="text-amber-500" /> },
    { text: 'Contact', path: '/contact', icon: <FiMessageCircle className="text-amber-500" /> }
  ];

  const quickLinks = [
    { text: 'Explore Hostels', path: '/explore', icon: <FiHome className="text-amber-500" /> },
    { text: 'Premium Listings', path: '/explore?premium=true', icon: <FaShieldAlt className="text-amber-500" /> },
    { text: 'Student Guide', path: '/addHostels#faq', icon: <FaUniversity className="text-amber-500" /> }
  ];

  const servicesLinks = [
    { text: 'List Your Property', path: '/admin/submitHostel', icon: <FiHome className="text-amber-500" /> },
    { text: 'Premium Verification', path: '/contact', icon: <FaShieldAlt className="text-amber-500" /> },
    { text: 'Hostel Management', path: '/contact', icon: <FiAward className="text-amber-500" /> }
  ];

  const legalLinks = [
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Terms of Service', path: '/terms' },
    { text: 'Cookie Policy', path: '/cookies' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5" />
      
      {/* Premium Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* HostelHub Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white mr-3">
                <FiHome className="text-xl" />
              </div>
              <h2 className="text-2xl font-bold">
                <span className="text-amber-500">Hostel</span>Hub
              </h2>
            </div>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              Premium student accommodation platform connecting students with verified, high-quality properties. 
              Experience the future of campus living with HostelHub.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-medium border border-amber-500/30">
                🏆 Premium Verified
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-500/30">
                ⭐ 4.8 Rating
              </span>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-3">
              {[
                { 
                  icon: <FaInstagram className="text-lg" />, 
                  url: "https://www.instagram.com/hirbrahim?igsh=cHcxeXByaHn2MzJ6",
                  color: "hover:bg-pink-600",
                  label: "Instagram"
                },
                { 
                  icon: <FaFacebook className="text-lg" />, 
                  url: "https://www.facebook.com/share/15bmclAcu9/",
                  color: "hover:bg-blue-600",
                  label: "Facebook"
                },
                { 
                  icon: <FaTwitter className="text-lg" />, 
                  url: "https://twitter.com",
                  color: "hover:bg-black",
                  label: "Twitter"
                },
                { 
                  icon: <FaWhatsapp className="text-lg" />, 
                  url: "https://wa.me/2349135843102",
                  color: "hover:bg-green-500",
                  label: "WhatsApp"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-300 ${social.color} transition-all duration-300 border border-white/10 hover:border-transparent relative group`}
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-semibold text-amber-400 mb-6 flex items-center">
              <FiArrowRight className="mr-2" />
              Quick Links
            </h2>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={link.path}
                    className="flex items-center text-sm text-slate-300 hover:text-amber-400 transition-all duration-300 group"
                  >
                    <span className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.icon}
                    </span>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-semibold text-amber-400 mb-6 flex items-center">
              <FiAward className="mr-2" />
              Services
            </h2>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={link.path}
                    className="flex items-center text-sm text-slate-300 hover:text-amber-400 transition-all duration-300 group"
                  >
                    <span className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.icon}
                    </span>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-semibold text-amber-400 mb-6 flex items-center">
              <FiMessageCircle className="mr-2" />
              Contact Info
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <FaEnvelope className="text-amber-500 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <span className="text-sm text-slate-300 block">Email</span>
                  <a 
                    href="mailto:hostelhubcontact@gmail.com"
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-300 text-sm"
                  >
                    hostelhubcontact@gmail.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start group">
                <FaPhone className="text-amber-500 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <span className="text-sm text-slate-300 block">Phone</span>
                  <a 
                    href="tel:+2349135843102"
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-300 text-sm"
                  >
                    +234 913 584 3102
                  </a>
                </div>
              </li>
              
              <li className="flex items-start group">
                <FaWhatsapp className="text-amber-500 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <span className="text-sm text-slate-300 block">WhatsApp</span>
                  <a 
                    href="https://wa.me/2349135843102" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-300 text-sm"
                  >
                    Chat with us
                  </a>
                </div>
              </li>
              
              <li className="flex items-start group">
                <FaMapMarkerAlt className="text-amber-500 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <span className="text-sm text-slate-300 block">Location</span>
                  <span className="text-slate-400 text-sm">
                    OAU University Campus
                  </span>
                </div>
              </li>
            </ul>

            {/* Quick Action Buttons */}
            <div className="mt-6 space-y-2">
              <Link 
                href="/explore"
                className="block w-full px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
              >
                Browse Hostels
              </Link>
              <Link 
                href="/admin/login"
                className="block w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-slate-300 text-sm font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 text-center border border-white/20"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} <span className="text-amber-400 font-semibold">HostelHub</span>. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
              {legalLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.path} 
                  className="hover:text-amber-400 transition-colors duration-300 hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </div>

            {/* Trust Seal */}
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <FaShieldAlt className="text-amber-500" />
              <span>Premium Verified Platform</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6 text-slate-500 text-xs">
            <p>HostelHub - Redefining Student Accommodation Experience</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;