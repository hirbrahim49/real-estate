"use client";
import React from "react";
import Image from "next/image";
import { Herosection2 } from "../Data/HeroData";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

const Homepage2 = () => {
  // Enhanced animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    },
  };

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

  return (
    <div className="bg-slate-50">
      {/* Premium Hero Section */}
      <motion.section 
        className="flex flex-col items-center py-24 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        
        <motion.div 
          className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium tracking-widest text-slate-800">PREMIUM PROPERTIES</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 font-serif leading-tight text-slate-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover Premium <br className="hidden lg:block" />Student Accommodations
        </motion.h1>
        
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-slate-600 leading-relaxed text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          At <strong className="text-amber-600">HostelHub</strong>, we specialize in connecting students with premium accommodations that combine comfort, style, and convenience for the ultimate living experience.
        </motion.p>
      </motion.section>

      {/* Premium Property Cards Section */}
      <motion.section 
        className="py-10 px-6 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
            Our Featured Properties
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Each property in our collection meets rigorous standards for quality, 
            comfort, and student-focused amenities.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {Herosection2.map((item, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              {/* Image with hover effect */}
              <div className="relative overflow-hidden h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                  priority
                />
                {/* Premium badge */}
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Premium
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <span className="w-8 h-[2px] bg-amber-500 mr-3" />
                  <h2 className="text-xl font-semibold text-slate-800">
                    {item.title}
                  </h2>
                </div>
                <p className="text-slate-600 mb-4 flex-grow">
                  {item.subtitle}
                </p>
                
                {/* Location */}
                <div className="flex items-center text-sm text-slate-700 mt-auto pt-4 border-t border-slate-100">
                  <FaLocationDot className="text-amber-500 mr-2" />
                  <span>{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Homepage2;