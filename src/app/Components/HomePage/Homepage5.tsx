"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutAndTestimonials = () => {
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
        delayChildren: 0.2
      } 
    },
  };

  return (
    <div className="bg-slate-50">
      {/* Luxury About Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ amount: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center mb-2">
                <div className="w-12 h-0.5 bg-amber-500 mr-4" />
                <span className="text-sm font-medium tracking-widest text-amber-600">ABOUT US</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-serif leading-tight">
                Redefining Student Living Experiences
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  At HostelHub, we transform the stressful search for student accommodation into a seamless digital experience. Our platform provides verified listings with premium media, direct owner connections, and transparent pricing.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Designed for the modern student, we combine luxury living with academic convenience, ensuring your transition to campus life is nothing short of exceptional.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div
               className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500"
                />
              <Image
                src="/Image/students-moving-in.jpg"
                alt="Students enjoying premium accommodation"
                priority
                quality={90}
                width={600}
                height={450}
                unoptimized={true} // Add this line
                className="relative rounded-3xl shadow-xl object-cover z-10 group-hover:shadow-2xl transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="relative py-32 bg-slate-100">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
              Student Experiences
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Hear from students who found their ideal accommodation through HostelHub
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            {/* Testimonial 1 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8"
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mr-4">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">John Doe</h3>
                  <p className="text-sm text-slate-500">3rd Year - UNILAG</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 italic">
                "HostelHub completely transformed my accommodation search. The verified listings saved me from countless scams and the premium options were exactly as advertised."
              </p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8"
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mr-4">
                  <span className="text-xl">👩</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Jane Smith</h3>
                  <p className="text-sm text-slate-500">2nd Year - UI</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 italic">
                "The direct contact feature allowed me to negotiate terms directly with the owner. The premium verification gave me confidence in my choice."
              </p>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8"
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mr-4">
                  <span className="text-xl">👨</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Alex Johnson</h3>
                  <p className="text-sm text-slate-500">4th Year - UniAbuja</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 italic">
                "As an international student, the virtual tours were invaluable. I secured my premium hostel before arriving in Nigeria, with no surprises."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutAndTestimonials;