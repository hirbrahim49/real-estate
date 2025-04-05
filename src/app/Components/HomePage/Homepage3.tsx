"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { hotProperties } from '../Data/HeroData';
import Image from 'next/image';
import Link from 'next/link';
const PremiumProperties = () => {
  // Enhanced animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
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
        staggerChildren: 0.15,
        delayChildren: 0.3
      } 
    },
  };

  return (
    <div className="py-24 bg-slate-50">
      {/* Luxury Header Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 max-w-max mx-auto">
          <span className="text-sm font-medium tracking-widest text-amber-500">PREMIUM SELECTION</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6 font-serif">
          Curated Luxury Accommodations
        </h2>
        
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full" />
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover our exclusive collection of premium student residences, meticulously selected for their exceptional quality, amenities, and prime locations.
        </p>
      </motion.section>

      {/* Premium Property Cards */}
      <motion.section
        className="grid md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {hotProperties.map((property, index) => (
          <motion.div
            key={property.id}
            variants={fadeIn}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            {/* Property Image with Premium Badge */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={property.image}
                alt={property.name}
                fill
                quality={90}
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Premium
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-slate-800">{property.name}</h3>
                <div className="flex items-center bg-slate-100 px-2 py-1 rounded">
                  <svg className="w-4 h-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm font-medium ml-1">4.8</span>
                </div>
              </div>

              <p className="text-slate-600 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>

              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{property.description}</p>

              <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                <div>
                  <p className="text-sm text-slate-500">Starting from</p>
                  <p className="text-xl font-bold text-slate-800">{property.price}</p>
                </div>
                <Link
                  href="/explore"
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default PremiumProperties;