"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaWhatsapp, 
  FaInstagram,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { 
  FaFacebook, 
  FaLinkedin, 
  FaXTwitter 
} from "react-icons/fa6";
import Link from "next/link";
import { useEffect } from "react";
import { 
  FiSend, 
  FiMessageCircle,
  FiCheckCircle,
  FiHelpCircle
} from "react-icons/fi";
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSent(true);
      setIsSending(false);
      if (formRef.current) formRef.current.reset();
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Failed to send message. Please try again.");
      setIsSending(false);
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // FAQ Data
  const faqData = [
    {
      question: "How do I book a hostel through HostelHub?",
      answer: "Simply browse our premium listings, select your preferred accommodation, and complete the secure booking process online. You can also schedule a virtual tour before making your decision."
    },
    {
      question: "What makes HostelHub different from other accommodation platforms?",
      answer: "We focus exclusively on premium student accommodations with verified listings, quality guarantees, virtual tours, and direct owner communication. Every property undergoes rigorous verification."
    },
    {
      question: "Can I visit a property before booking?",
      answer: "Absolutely! We encourage property visits and can arrange viewings for any of our listed accommodations. We also offer virtual tours for remote viewing convenience."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various secure payment methods including bank transfers, credit/debit cards, and popular online payment platforms. All transactions are protected and secure."
    },
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer: "We typically respond within 1 business day. For urgent matters, we recommend using our WhatsApp support for immediate assistance during business hours."
    },
    {
      question: "Are there any hidden fees or charges?",
      answer: "No, we believe in complete transparency. All prices displayed include the full accommodation cost with no hidden fees. You'll see the total amount before confirming your booking."
    }
  ];

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
          <h3 className="text-xl font-semibold text-slate-800">Loading HostelHub</h3>
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
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* Premium Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FiMessageCircle className="mr-2" />
            <span className="text-sm font-medium tracking-wider">PREMIUM SUPPORT</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch With
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Our Premium Team
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our dedicated support team is ready to provide personalized assistance for all your student accommodation needs
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Information Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="flex items-center">
              <div className="w-12 h-0.5 bg-amber-500 mr-4" />
              <span className="text-sm font-semibold tracking-widest text-amber-600 uppercase">Contact Channels</span>
            </motion.div>
            
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              Multiple Ways to <span className="text-amber-500">Connect</span>
            </motion.h2>
            
            <motion.div variants={staggerContainer} className="space-y-6">
              {[
                {
                  icon: <FaMapMarkerAlt className="text-xl" />,
                  title: "Campus Office",
                  description: "Obafemi Awolowo University, Ile-Ife, Nigeria",
                  action: "Get directions",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: <FaPhone className="text-xl" />,
                  title: "Support Line",
                  description: "+234 913 584 3102",
                  action: "Call now",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: <FaEnvelope className="text-xl" />,
                  title: "Priority Email",
                  description: "hostelhubcontact@gmail.com",
                  action: "Email us",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  icon: <FaClock className="text-xl" />,
                  title: "Support Hours",
                  description: "Monday - Friday: 9am - 5pm",
                  note: "Weekend emergency support available",
                  color: "from-amber-500 to-amber-600"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start">
                    <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{contact.title}</h3>
                      <p className="text-slate-600 mb-3">{contact.description}</p>
                      {contact.note && (
                        <p className="text-slate-500 text-sm mb-3">{contact.note}</p>
                      )}
                      <button className="text-amber-600 hover:text-amber-700 font-medium flex items-center text-sm">
                        {contact.action}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Social Media Links */}
            <motion.div variants={fadeIn} className="pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Connect With Us</h3>
              <div className="flex space-x-3">
                {[
                  { icon: <FaFacebook className="text-xl" />, color: "hover:bg-blue-600", label: "Facebook", url: "https://facebook.com" },
                  { icon: <FaXTwitter className="text-xl" />, color: "hover:bg-black", label: "Twitter", url: "https://twitter.com" },
                  { icon: <FaLinkedin className="text-xl" />, color: "hover:bg-blue-700", label: "LinkedIn", url: "https://linkedin.com" },
                  { icon: <FaWhatsapp className="text-xl" />, color: "hover:bg-green-500", label: "WhatsApp", url: "https://wa.me/2349135843102" },
                  { icon: <FaInstagram className="text-xl" />, color: "hover:bg-pink-600", label: "Instagram", url: "https://instagram.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-600 ${social.color} transition-all duration-300 group relative border border-slate-200`}
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
          </motion.div>
          
          {/* Enhanced Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
          >
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white mr-3">
                  <FiSend className="text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Send Priority Message</h2>
              </div>
              <p className="text-slate-500">We typically respond within 1 business day</p>
            </div>
            
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-slate-50"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-slate-50"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-slate-50"
                  placeholder="+234 ___ ___ ____"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Message <span className="text-amber-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-slate-50"
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
                  className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSent 
                      ? "bg-green-500 text-white" 
                      : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl"
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
                    className="mt-4 text-center text-green-600 text-sm font-medium"
                  >
                    We've received your message and will respond shortly.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Elegant FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mr-4">
                <FiHelpCircle className="text-xl" />
              </div>
              <div className="text-left">
                <span className="text-sm font-semibold tracking-widest text-amber-600 uppercase">FAQ</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Frequently Asked Questions</h2>
              </div>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our premium accommodation services
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-100 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-400 flex-shrink-0"
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="flex space-x-4">
                          <div className="w-8 flex-shrink-0"></div>
                          <div>
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                            {index === 0 && (
                              <div className="mt-4 flex space-x-2">
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">Quick Booking</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Virtual Tours</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Still have questions?</h3>
              <p className="text-slate-600 mb-6">Our support team is here to help you with any additional questions.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://wa.me/2349135843102" 
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp Support
                </a>
                <a 
                  href="tel:+2349135843102" 
                  className="px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all duration-300 flex items-center justify-center"
                >
                  <FaPhone className="mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campus Location Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Our <span className="text-amber-500">Campus</span> Location
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Visit our office or explore the campus area virtually with our interactive map
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="rounded-2xl shadow-xl overflow-hidden border border-slate-200 bg-white"
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
                  <h3 className="text-xl font-semibold text-slate-800">HostelHub Campus Office</h3>
                  <p className="text-slate-600">Obafemi Awolowo Hall, OAU University</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all duration-300 flex items-center font-semibold shadow-lg hover:shadow-xl">
                  <FaMapMarkerAlt className="mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Find Your Perfect Accommodation?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of students who found their ideal home through HostelHub's premium platform
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/explore"
              className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Explore Premium Hostels
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            <Link 
              href="https://chat.whatsapp.com/H5PxQGnXBZk2s7jzooEGvO"
              className="px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2 text-green-500" />
              Join Community
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Page;