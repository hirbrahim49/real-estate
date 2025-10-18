"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { hotProperties } from '../Data/HeroData';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaBed, FaWifi, FaParking, FaShower } from 'react-icons/fa';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

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
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-amber-200 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FiCheckCircle className="mr-2 text-amber-600" />
            <span className="text-sm font-semibold tracking-wider text-amber-600">EXCLUSIVE PREMIUM PROPERTIES</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Premium <span className="text-amber-500">Student Residences</span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8 rounded-full" />
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Handpicked accommodations offering exceptional comfort, security, and premium amenities for the ultimate student living experience
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
          {hotProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={fadeIn}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200"
            >
              {/* Property Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  quality={90}
                  priority
                />
                {/* Premium Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center">
                  <FaStar className="mr-2" />
                  <span>PREMIUM</span>
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors duration-300">{property.name}</h3>
                  <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                    <FaStar className="text-amber-500 text-sm" />
                    <span className="text-sm font-semibold text-amber-700 ml-1">4.8</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-slate-600 mb-4">
                  <FaMapMarkerAlt className="text-amber-500 mr-2" />
                  <span className="text-sm font-medium">{property.location}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { icon: <FaBed className="text-amber-500" />, label: 'Furnished' },
                    { icon: <FaWifi className="text-amber-500" />, label: 'WiFi' },
                    { icon: <FaParking className="text-amber-500" />, label: 'Parking' },
                    { icon: <FaShower className="text-amber-500" />, label: 'Ensuite' }
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center text-xs bg-slate-100 px-3 py-2 rounded-lg">
                      {amenity.icon}
                      <span className="ml-1 font-medium text-slate-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2">{property.description}</p>

                {/* Price and CTA */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Starting from</p>
                    <p className="text-2xl font-bold text-slate-800">{property.price}</p>
                  </div>
                  <Link
                    href="/explore"
                    className="px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-amber-500 hover:to-amber-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl group/btn"
                  >
                    View Details
                    <FiArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Premium Properties
            <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumProperties;