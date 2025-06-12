"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";

const Page = () => {
  // Enhanced animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
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
        delayChildren: 0.3
      }
    }
  };

  // State for button and success message
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    // const formData = new FormData(e.currentTarget);
    // const data = {
    //   name: formData.get("name") as string,
    //   email: formData.get("email") as string,
    //   phone: formData.get("phone") as string,
    //   message: formData.get("message") as string,
    // };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSent(true);
      setIsSending(false);
      if (formRef.current) formRef.current.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Failed to send message. Please try again.");
      setIsSending(false);
    }
  }

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        {/* Enhanced Loading Animation */}
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
          <h3 className="text-xl font-medium text-slate-800">Loading HostelHub</h3>
          <p className="text-slate-500">Preparing your premium experience</p>
        </motion.div>
        
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
    <div className="bg-slate-50 text-slate-800">
      {/* Enhanced Luxury Hero Section */}
      <section className="relative py-38 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium tracking-widest">PREMIUM CONTACT</span>
          </motion.div>
          
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
          >
            Connect With Our <span className="text-amber-400">Premium</span> Team
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          />
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="text-lg md:text-xl max-w-3xl mx-auto text-slate-200 leading-relaxed"
          >
            Our concierge team is ready to provide personalized assistance for all your student accommodation needs.
          </motion.p>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="flex items-center mb-2">
              <div className="w-12 h-0.5 bg-amber-500 mr-4" />
              <span className="text-sm font-medium tracking-widest text-amber-600">PREMIUM SUPPORT</span>
            </motion.div>
            
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-slate-800 font-serif">
              Our <span className="text-amber-500">Contact</span> Channels
            </motion.h2>
            
            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeIn} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mt-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Our Campus Office</h3>
                  <p className="text-slate-600">Obafemi Awolowo University, Ile-Ife, Nigeria</p>
                  <button className="mt-2 text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center">
                    Get directions <span className="ml-1">→</span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mt-1">
                  <FaPhone className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Dedicated Support Line</h3>
                  <p className="text-slate-600">+234 913 584 3102</p>
                  <button className="mt-2 text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center">
                    Call now <span className="ml-1">→</span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mt-1">
                  <FaEnvelope className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Priority Email</h3>
                  <p className="text-slate-600">hostelhubcontact@gmail.com</p>
                  <button className="mt-2 text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center">
                    Email us <span className="ml-1">→</span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mt-1">
                  <FaClock className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Concierge Hours</h3>
                  <p className="text-slate-600">Monday - Friday: 9am - 5pm</p>
                  <p className="text-slate-500 text-sm mt-1">Weekend emergency support available</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="pt-4">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebook className="text-2xl" />, color: "hover:text-blue-600", label: "Facebook", url: "https://facebook.com" },
                  { icon: <FaXTwitter className="text-2xl" />, color: "hover:text-black", label: "Twitter", url: "https://twitter.com" },
                  { icon: <FaLinkedin className="text-2xl" />, color: "hover:text-blue-700", label: "LinkedIn", url: "https://linkedin.com" },
                  { icon: <FaWhatsapp className="text-2xl" />, color: "hover:text-green-500", label: "WhatsApp", url: "https://wa.me/2349044174371" },
                  { icon: <FaInstagram className="text-2xl" />, color: "hover:text-pink-600", label: "Instagram", url: "https://instagram.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`text-slate-600 ${social.color} transition-all duration-300 relative group`}
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="bg-white rounded-xl shadow-xl p-8 border border-slate-100"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-light text-slate-800 mb-2 font-serif">Send Us a <span className="text-amber-500">Priority</span> Message</h2>
              <p className="text-slate-500">We typically respond within 1 business day</p>
            </div>
            
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="+234 ___ ___ ____"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Your Message <span className="text-amber-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="How can we assist you today?"
                  required
                />
              </div>
              
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSending || isSent}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSent 
                      ? "bg-green-500 text-white" 
                      : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : isSent ? (
                    <>
                      <IoCheckmarkDone className="text-xl" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <FiSend />
                      <span>Send Priority Message</span>
                    </>
                  )}
                </motion.button>
                
                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-green-600 text-sm"
                  >
                    We&apos;yve received your message and will respond shortly.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Interactive Map Section */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
              Our <span className="text-amber-500">Campus</span> Location
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit our office or explore the campus area virtually with our interactive map
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="rounded-xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.626034188544!2d4.498163075000244!3d7.506470510960647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103831223acbe115%3A0xaedf170f899961ae!2sObafemi%20Awolowo%20Hall%2C%20Obafemi%20Awolowo%20University!5e0!3m2!1sen!2sng!4v1742597078956!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
            </div>
            <div className="bg-white p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-slate-800">HostelHub Campus Office</h3>
                  <p className="text-slate-600">Obafemi Awolowo Hall, OAU University</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Premium CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15)_0%,_transparent_70%)] z-0"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light mb-6 font-serif"
          >
            Ready to Elevate Your <span className="text-amber-400">Campus Living</span> Experience?
          </motion.h2>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Discover our curated selection of premium student accommodations with verified listings, transparent pricing, and exclusive amenities.
          </motion.p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.4}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/explore"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Premium Hostels
            </Link>
            <Link
              href="/addHostels"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:bg-white/20 transition-all duration-300"
            >
              List Your Property
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Trusted Partners Section */}
      <section className="relative py-24 bg-white">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-0.5 bg-amber-500 mr-4" />
              <span className="text-sm font-medium tracking-widest text-amber-600">TRUSTED PARTNERS</span>
              <div className="w-16 h-0.5 bg-amber-500 ml-4" />
            </div>
            
            <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
              Collaborating With <span className="text-amber-500">Leading</span> Institutions
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Our partnerships with prestigious universities and student organizations ensure premium campus living experiences
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { logo: "/Image/oau-logo.png", name: "OAU University", delay: 0 },
              { logo: "/Image/student-union.jpg", name: "Student Union", delay: 0.1 },
              { logo: "/Image/oau-logo.png", name: "Campus Housing", delay: 0.2 },
              { logo: "/Image/student-union.jpg", name: "Student Affairs", delay: 0.3 },
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ delay: partner.delay }}
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl border border-slate-100 hover:border-amber-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-32 h-32 p-4 flex items-center justify-center bg-slate-50 rounded-lg mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-all duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium text-slate-800 text-center">{partner.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Social Connect Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.05)_0%,_transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
              Join Our <span className="text-amber-500">Community</span>
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Connect with us for the latest updates on premium student accommodations and campus living tips
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { 
                icon: <FaFacebook className="text-3xl" />,
                color: "bg-blue-100 hover:bg-blue-600",
                textColor: "text-blue-600 group-hover:text-white",
                label: "Facebook",
                url: "https://facebook.com"
              },
              { 
                icon: <FaXTwitter className="text-3xl" />,
                color: "bg-slate-100 hover:bg-black",
                textColor: "text-slate-800 group-hover:text-white",
                label: "Twitter",
                url: "https://twitter.com"
              },
              { 
                icon: <FaLinkedin className="text-3xl" />,
                color: "bg-blue-50 hover:bg-blue-700",
                textColor: "text-blue-700 group-hover:text-white",
                label: "LinkedIn",
                url: "https://linkedin.com"
              },
              { 
                icon: <FaWhatsapp className="text-3xl" />,
                color: "bg-green-50 hover:bg-green-500",
                textColor: "text-green-600 group-hover:text-white",
                label: "WhatsApp",
                url: "https://chat.whatsapp.com/H5PxQGnXBZk2s7jzooEGvO"
              },
              { 
                icon: <FaInstagram className="text-3xl" />,
                color: "bg-pink-50 hover:bg-pink-600",
                textColor: "text-pink-600 group-hover:text-white",
                label: "Instagram",
                url: "https://instagram.com"
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl shadow-sm ${social.color} ${social.textColor} transition-all duration-300 group relative`}
              >
                {social.icon}
                <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-amber-50 px-6 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-amber-600 tracking-wider">HAVE QUESTIONS?</span>
            </div>
            
            <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
              Frequently Asked <span className="text-amber-500">Questions</span>
            </h2>
            
            <p className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Find answers to common queries about our premium accommodation services
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                question: "How do I book a hostel through HostelHub?",
                answer: "Simply browse our listings, select your preferred accommodation, and complete the booking process online."
              },
              {
                question: "What makes HostelHub different from other platforms?",
                answer: "We focus exclusively on premium student accommodations with verified listings and quality guarantees."
              },
              {
                question: "Can I visit a property before booking?",
                answer: "Yes, we can arrange viewings for any of our listed properties upon request."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept various payment methods including bank transfers, credit cards, and online payment platforms."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-medium text-slate-800 mb-2">{item.question}</h3>
                <p className="text-slate-600">{item.answer}</p>
                <Link href="/addHostels#faq" className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium">
                  Learn more <span className="ml-1">→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/addHostels#faq"
              className="inline-flex items-center px-6 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-300"
            >
              <span>Visit Full FAQ Center</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Page;