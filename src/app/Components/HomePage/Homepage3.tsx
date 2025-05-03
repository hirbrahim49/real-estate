"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { hotProperties } from '../Data/HeroData';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaBed, FaWifi, FaParking } from 'react-icons/fa';

const PremiumProperties = () => {
  // Animation variants
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
    <section className="py-24 bg-slate-50 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-amber-50 px-6 py-2 rounded-full mb-6 border border-amber-100">
            <span className="text-sm font-medium tracking-widest text-amber-600">EXCLUSIVE OFFERS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light font-serif text-slate-800 mb-4">
            Premium <span className="text-amber-500">Student Residences</span>
          </h2>
          
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-8 rounded-full" />
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Handpicked accommodations offering exceptional comfort, security, and proximity to campus
          </p>
        </motion.div>

        {/* Property Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              transition={{ type: 'spring', stiffness: 300 }}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                  priority
                />
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                  <FaStar className="mr-1 text-xs" />
                  <span>PREMIUM</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-light text-slate-800">{property.name}</h3>
                  <div className="flex items-center bg-slate-100 px-2 py-1 rounded-full">
                    <FaStar className="text-amber-500 text-sm" />
                    <span className="text-sm font-medium ml-1">4.8</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-slate-600 mb-4">
                  <FaMapMarkerAlt className="text-amber-500 mr-2" />
                  <span className="text-sm">{property.location}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center text-xs bg-slate-100 px-3 py-1 rounded-full">
                    <FaBed className="text-amber-500 mr-1" />
                    <span>Furnished</span>
                  </div>
                  <div className="flex items-center text-xs bg-slate-100 px-3 py-1 rounded-full">
                    <FaWifi className="text-amber-500 mr-1" />
                    <span>WiFi</span>
                  </div>
                  <div className="flex items-center text-xs bg-slate-100 px-3 py-1 rounded-full">
                    <FaParking className="text-amber-500 mr-1" />
                    <span>Parking</span>
                  </div>
                </div>

                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{property.description}</p>

                {/* Price and CTA */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Starting from</p>
                    <p className="text-xl font-bold text-slate-800">{property.price}</p>
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/explore"
            className="inline-flex items-center px-8 py-4 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-300 font-medium"
          >
            View All Premium Properties
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumProperties;