"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MdHomeWork, MdVerifiedUser } from "react-icons/md";
import { FaPhoneAlt, FaHandshake } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";

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
      icon: <MdHomeWork className="text-5xl" />,
      title: "Find Your Perfect Space",
      description: "Browse verified hostels with high-quality photos, virtual tours, and detailed amenities lists.",
      delay: 0
    },
    {
      icon: <FaPhoneAlt className="text-5xl" />,
      title: "Connect Directly",
      description: "Message property owners or agents instantly through our secure platform with no middlemen.",
      delay: 0.2
    },
    {
      icon: <RiSecurePaymentLine className="text-5xl" />,
      title: "Secure Booking",
      description: "Complete your reservation with our protected payment system and receive instant confirmation.",
      delay: 0.4
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-amber-50/10 px-6 py-2 rounded-full mb-6 border border-amber-500/20">
            <span className="text-sm font-medium tracking-widest text-amber-500">PROCESS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            How <span className="text-amber-400">HostelHub</span> Works
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Our streamlined process makes finding and securing premium student accommodation effortless
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
              className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700 hover:border-amber-500/30 transition-all duration-300 group relative overflow-hidden"
              whileHover={{ y: -8 }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Step number */}
              <div className="absolute top-6 left-6 text-amber-500 text-lg font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                0{index + 1}
              </div>
              
              {/* Icon */}
              <div className="flex justify-center mb-6 text-amber-500">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-serif font-light text-white mb-4">
                {step.title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                {step.description}
              </p>
              
              {/* Connector line (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-slate-700 group-hover:bg-amber-500 transition-colors"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;