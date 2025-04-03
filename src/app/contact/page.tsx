"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Homefooter from "../../app/Components/HomePage/Homefooter";
import Link from "next/link";

const Page = () => {
  // Animation variants
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

  // State for button and success message
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      setIsSent(true);
      setIsSending(false);
      if (formRef.current) formRef.current.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Failed to send message. Please try again.");
      setIsSending(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Luxury Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium tracking-widest">CONTACT US</span>
          </motion.div>
          
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
          >
            Connect With Our Team
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
            Our dedicated team is ready to assist you with any inquiries about our premium student accommodations.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="flex items-center mb-2">
              <div className="w-12 h-0.5 bg-amber-500 mr-4" />
              <span className="text-sm font-medium tracking-widest text-amber-600">OUR OFFICE</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 font-serif">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaMapMarkerAlt className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Our Location</h3>
                  <p className="text-slate-600">Obafemi Awolowo University, Ile-Ife, Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaPhone className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Phone</h3>
                  <p className="text-slate-600">+234 913 584 3102</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaEnvelope className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Email</h3>
                  <p className="text-slate-600">hostelhubcontact@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaClock className="text-amber-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-800">Hours</h3>
                  <p className="text-slate-600">Monday - Friday: 9am - 5pm</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-400 transition-colors duration-300">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-700 transition-colors duration-300">
                  <FaLinkedin className="text-2xl" />
                </a>
                <a href="https://wa.me/2349044174371" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-green-500 transition-colors duration-300">
                  <FaWhatsapp className="text-2xl" />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-light text-slate-800 mb-6 font-serif">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your Phone Number"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message <span className="text-amber-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your Message"
                  required
                />
              </div>
              
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSending || isSent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isSending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : isSent ? (
                    "Message Sent!"
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
                
                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-green-600 text-sm"
                  >
                    Your message has been sent successfully!
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Luxury Map Section */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
              Our Location
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit us at our campus office or explore the area virtually
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="rounded-xl shadow-lg overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.626034188544!2d4.498163075000244!3d7.506470510960647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103831223acbe115%3A0xaedf170f899961ae!2sObafemi%20Awolowo%20Hall%2C%20Obafemi%20Awolowo%20University!5e0!3m2!1sen!2sng!4v1742597078956!5m2!1sen!2sng"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light mb-6 font-serif"
          >
            Ready to Find Your Perfect Accommodation?
          </motion.h2>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our curated selection of premium student hostels with verified listings and transparent pricing.
          </motion.p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.4}
          >
            <Link
              href="/explore"
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse Hostels
            </Link>
          </motion.div>
        </div>
      </section>

{/* Premium Trusted Partners Section */}
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
        <span className="text-sm font-medium tracking-widest text-amber-600">OUR PARTNERS</span>
        <div className="w-16 h-0.5 bg-amber-500 ml-4" />
      </div>
      
      <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
        Trusted By Leading Institutions
      </h2>
      <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Collaborating with prestigious universities and student organizations to elevate campus living
      </p>
    </motion.div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { logo: "/Image/oau-logo.png", name: "OAU University" },
        { logo: "/Image/student-union.jpg", name: "Student Union" },
        { logo: "/Image/oau-logo.png", name: "Campus Housing" },
        { logo: "/Image/student-union.jpg", name: "Student Affairs" },
      ].map((partner, i) => (
        <motion.div
          key={i}
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ delay: i * 0.15 }}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center"
        >
          <div className="w-40 h-40 p-4 flex items-center justify-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-full max-w-full object-contain filter grayscale-0  transition-all duration-500"
            />
          </div>
          <h3 className="mt-4 text-lg font-medium text-slate-800 text-center">{partner.name}</h3>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Luxury Social Connect Section */}
<section className="relative py-24 bg-gradient-to-br from-slate-100 to-slate-50">
  <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-10" />
  
  <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      className="mb-16"
    >
      <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
        Stay Connected
      </h2>
      <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
      <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Follow us for the latest updates on premium student accommodations
      </p>
    </motion.div>
    
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap justify-center gap-6"
    >
      {[
        { 
          icon: <FaFacebook className="text-3xl" />,
          href: "https://facebook.com",
          color: "hover:text-blue-600",
          name: "Facebook"
        },
        { 
          icon: <FaTwitter className="text-3xl" />,
          href: "https://twitter.com",
          color: "hover:text-blue-400",
          name: "Twitter"
        },
        { 
          icon: <FaLinkedin className="text-3xl" />,
          href: "https://linkedin.com",
          color: "hover:text-blue-700",
          name: "LinkedIn"
        },
        { 
          icon: <FaWhatsapp className="text-3xl" />,
          href: "https://wa.me/2349044174371",
          color: "hover:text-green-500",
          name: "WhatsApp"
        },
      ].map((social, i) => (
        <motion.a
          key={i}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm text-slate-600 ${social.color} transition-all duration-300 group`}
        >
          {social.icon}
          <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {social.name}
          </span>
        </motion.a>
      ))}
    </motion.div>
  </div>
</section>

{/* Elegant FAQ Section */}
<section className="relative py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      className="inline-block bg-amber-50 px-6 py-3 rounded-full mb-6"
    >
      <span className="text-sm font-medium text-amber-600 tracking-wider">NEED HELP?</span>
    </motion.div>
    
    <motion.h2
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ delay: 0.1 }}
      className="text-3xl font-light text-slate-800 mb-4 font-serif"
    >
      Frequently Asked Questions
    </motion.h2>
    
    <motion.p
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ delay: 0.2 }}
      className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed"
    >
      Find quick answers to common questions about our services
    </motion.p>
    
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ delay: 0.3 }}
    >
      <Link
        href="/addHostels#faq"
        className="inline-flex items-center px-6 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-300"
      >
        <span>Visit FAQ Center</span>
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