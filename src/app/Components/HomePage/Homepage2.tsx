"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Herosection2 } from "../Data/HeroData";
import { FaLocationDot, FaStar, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

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
        damping: 15,
        duration: 0.8
      } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">

      {/* Premium Property Cards Section */}
      <motion.section 
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Featured <span className="text-amber-500">Premium</span> Properties
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Each property in our collection meets rigorous standards for quality, comfort, and student-focused amenities
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {Herosection2.map((item, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-slate-200"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Image with overlay */}
                <div className="relative overflow-hidden h-80">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                    priority={index < 3}
                  />
                  
                  {/* Premium badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center">
                    <FaStar className="mr-2" />
                    Premium
                  </div>

                  {/* Rating overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-semibold px-3 py-1.5 rounded-full flex items-center">
                    <FaStar className="text-amber-500 mr-1" />
                    4.8
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {item.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center text-slate-700 mt-auto pt-4 border-t border-slate-100">
                    <FaLocationDot className="text-amber-500 mr-3 text-lg" />
                    <span className="font-medium">{item.location}</span>
                  </div>

                  {/* Quick Features */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['WiFi', 'Security', 'Furnished'].map((feature, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Link 
                    href="/explore"
                    className="mt-6 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 text-sm font-medium text-center group/btn"
                  >
                    <span className="flex items-center justify-center">
                      View Details
                      <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Properties CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link 
              href="/explore"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore All Premium Properties
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Homepage2;