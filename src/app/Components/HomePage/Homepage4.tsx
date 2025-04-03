"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MdHomeWork } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Homepage4 = () => {
  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ amount: 0.5 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-slate-200 mb-12"
        >
          How It Works
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <motion.div
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            className="bg-slate-800 rounded-xl shadow-lg hover:shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300 border border-slate-700"
          >
            <div className="flex justify-center mb-6 text-amber-500 text-6xl">
              <MdHomeWork />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-slate-200 mb-4">
              Search for Hostel
            </h3>
            <p className="text-slate-400">
              Find the perfect hostel with advanced search tools and detailed filters.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-xl shadow-lg hover:shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300 border border-slate-700"
          >
            <div className="flex justify-center mb-6 text-amber-500 text-6xl">
              <FaPhoneAlt />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-slate-200 mb-4">
              Contact the Agent
            </h3>
            <p className="text-slate-400">
              Reach out to verified agents for assistance and inquiries anytime.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800 rounded-xl shadow-lg hover:shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300 border border-slate-700"
          >
            <div className="flex justify-center mb-6 text-amber-500 text-6xl">
              <RiVerifiedBadgeFill />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-slate-200 mb-4">
              Secure Your Space
            </h3>
            <p className="text-slate-400">
              Confirm your booking and reserve your space with complete confidence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Optional subtle noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-10 pointer-events-none"></div>
    </section>
  );
};

export default Homepage4;
