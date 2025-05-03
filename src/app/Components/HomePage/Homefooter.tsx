"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

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
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Define your links with custom paths
  const companyLinks = [
    { text: 'About Us', path: '/about' },
    { text: 'Careers', path: '/careers' },
    { text: 'Blog', path: '/blog' }
  ];

  const quickLinks = [
    { text: 'Search Properties', path: '/search' },
    { text: 'Contact Agents', path: '/contact' },  // Changed from /contact-agents
    { text: 'FAQs', path: '/addHostels#faq' }
  ];

  const servicesLinks = [
    { text: 'Buy Properties', path: '/addHostels' },
    { text: 'Sell Properties', path: '/addHostels' },
    { text: 'Rent Properties', path: '/contact' },
    { text: 'Property Management', path: '/contact' }
  ];

  const legalLinks = [
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Terms of Service', path: '/terms' },
    { text: 'List Your Property', path: '/submitHostel' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* EstateHub */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-serif font-light mb-6 flex items-center">
              <span className="text-amber-500">Estate</span>Hub
            </h2>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Premium student accommodation platform connecting students with verified properties.
            </p>
            <div className="flex space-x-4 mt-4">
              {companyLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.path}
                  className="text-sm text-slate-300 hover:text-amber-500 transition-colors duration-300"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-medium text-amber-500 mb-6">Quick Links</h2>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={link.path}
                    className="flex items-center text-sm text-slate-300 hover:text-amber-500 transition-colors duration-300"
                  >
                    <FiArrowRight className="mr-2 text-xs" />
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-medium text-amber-500 mb-6">Services</h2>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={link.path}
                    className="flex items-center text-sm text-slate-300 hover:text-amber-500 transition-colors duration-300"
                  >
                    <FiArrowRight className="mr-2 text-xs" />
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-medium text-amber-500 mb-6">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaEnvelope className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-slate-300">hostelhubcontact@gmail.com</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-sm text-slate-300">+234 913 584 3102</span>
              </li>
              <li className="flex items-start">
                <FaWhatsapp className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <a 
                  href="https://wa.me/2349135843102" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-amber-500 transition-colors duration-300"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex space-x-4 mt-4">
                {[
                  { icon: <FaInstagram />, url: "https://www.instagram.com/hirbrahim?igsh=cHcxeXByaHn2MzJ6" },
                  { icon: <FaFacebook />, url: "https://www.facebook.com/share/15bmclAcu9/" },
                  { icon: <FaTwitter />, url: "https://twitter.com" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="text-slate-300 hover:text-amber-500 transition-colors duration-300 text-lg"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 mt-12 pt-8 text-center"
        >
          <div className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} <span className="text-amber-500">EstateHub</span> - All Rights Reserved
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-slate-500">
            {legalLinks.map((link, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>•</span>}
                <Link href={link.path} className="hover:text-amber-500 transition-colors duration-300">
                  {link.text}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;