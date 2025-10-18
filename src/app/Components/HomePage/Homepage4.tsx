"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MdHomeWork, MdVerified } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { RiSecurePaymentLine, RiCustomerService2Line } from "react-icons/ri";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const steps = [
    {
      icon: <MdHomeWork className="text-4xl" />,
      title: "Browse Premium Listings",
      description: "Explore verified hostels with high-quality photos, virtual tours, and detailed amenities lists.",
      features: ["Verified Properties", "Virtual Tours", "Detailed Photos"],
      color: "from-blue-500 to-blue-600",
      delay: 0
    },
    {
      icon: <FaPhoneAlt className="text-4xl" />,
      title: "Connect Directly",
      description: "Message property owners or agents instantly through our secure platform with no middlemen.",
      features: ["Direct Messaging", "Instant Contact", "No Commissions"],
      color: "from-green-500 to-green-600",
      delay: 0.2
    },
    {
      icon: <RiSecurePaymentLine className="text-4xl" />,
      title: "Secure Booking",
      description: "Complete your reservation with our protected payment system and receive instant confirmation.",
      features: ["Secure Payments", "Instant Confirmation", "Booking Protection"],
      color: "from-amber-500 to-amber-600",
      delay: 0.4
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FiCheckCircle className="mr-2" />
            <span className="text-sm font-medium tracking-wider">HOW IT WORKS</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Simple <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">3-Step</span> Process
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process makes finding and securing premium student accommodation effortless and secure
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ delay: step.delay }}
              className="group relative bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-slate-700 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl"
              whileHover={{ y: -12, scale: 1.02 }}
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {step.description}
              </p>
              
              {/* Features */}
              <div className="space-y-2">
                {step.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-slate-400 text-sm">
                    <FiCheckCircle className="text-amber-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Connector line (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-1 bg-slate-700 group-hover:bg-amber-500 transition-colors duration-300"></div>
                  <FiArrowRight className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-slate-700 group-hover:text-amber-500 transition-colors duration-300" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Find Your Perfect Home?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have found their ideal accommodation through HostelHub
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/2349135843102" 
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
              >
                <FaWhatsapp className="mr-2 text-lg" />
                Chat on WhatsApp
              </a>
              <a 
                href="/explore"
                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 flex items-center justify-center"
              >
                <MdVerified className="mr-2 text-lg" />
                Browse Verified Listings
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;