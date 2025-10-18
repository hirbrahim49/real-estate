"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaQuoteLeft, FaWhatsapp } from 'react-icons/fa';
import { MdVerified, MdLocationPin } from 'react-icons/md';
import { FiCheckCircle, FiArrowRight, FiUsers } from 'react-icons/fi';

const AboutAndTestimonials = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const testimonials = [
    {
      name: "John Okafor",
      university: "UNILAG",
      rating: 5,
      quote: "HostelHub saved me weeks of stressful searching. The verified listings are exactly as shown in photos and the virtual tours helped me make the right choice.",
      avatar: "/avatars/john.jpg",
      program: "Computer Science"
    },
    {
      name: "Amina Bello",
      university: "UI",
      rating: 5,
      quote: "I secured my premium hostel from abroad thanks to the detailed virtual tours. No surprises when I arrived! The verification process gave me complete peace of mind.",
      avatar: "/avatars/amina.jpg",
      program: "Medicine"
    },
    {
      name: "Chike Eze",
      university: "OAU",
      rating: 5,
      quote: "Direct contact with owners helped me negotiate better terms. The premium verification badge gave me confidence in my choice. Best platform for students!",
      avatar: "/avatars/chike.jpg",
      program: "Engineering"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Premium About Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-cover bg-center opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text Content */}
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-amber-500 mr-4" />
                <span className="text-sm font-semibold tracking-widest text-amber-500 uppercase">About HostelHub</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Redefining <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Student Living</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  At HostelHub, we're transforming student accommodation with verified premium listings, high-quality media, and direct owner connections. Our platform eliminates the stress of finding quality housing while ensuring premium living standards.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  We combine modern living amenities with academic convenience, ensuring your transition to campus life is seamless, comfortable, and exceptional.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <MdVerified className="text-amber-500 text-xl" />, text: "100% Verified Listings" },
                  { icon: <FiCheckCircle className="text-amber-500 text-xl" />, text: "Premium Quality Standards" },
                  { icon: <FaWhatsapp className="text-amber-500 text-xl" />, text: "Direct Owner Contact" },
                  { icon: <FiUsers className="text-amber-500 text-xl" />, text: "24/7 Student Support" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center bg-slate-800/50 px-4 py-3 rounded-xl border border-slate-700"
                  >
                    {feature.icon}
                    <span className="ml-3 text-slate-200">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-4"
              >
                <a 
                  href="/about"
                  className="inline-flex items-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Learn More About Us
                  <FiArrowRight className="ml-2" />
                </a>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-4  rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
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
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800 mb-1">2K+</div>
                  <div className="text-xs text-slate-600 font-semibold">Happy Students</div>
                  <div className="flex items-center justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-500 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-white">
        <div className="absolute inset-0  bg-cover bg-center opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-amber-50 rounded-full border border-amber-200 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FaQuoteLeft className="mr-2 text-amber-600" />
              <span className="text-sm font-semibold tracking-wider text-amber-600">STUDENT TESTIMONIALS</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              What Our <span className="text-amber-500">Students</span> Say
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-8 rounded-full" />
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Hear from students who found their ideal accommodation through HostelHub's premium platform
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 flex flex-col border border-slate-200"
                whileHover={{ y: -8 }}
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="text-amber-500/20 text-5xl mb-6 absolute top-4 right-4" />
                
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-500 text-lg" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow text-lg">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                {/* Student Info */}
                <div className="flex items-center pt-4 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">{testimonial.program}</p>
                    <p className="text-xs text-slate-500">{testimonial.university}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Join Our Community?</h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied students who have found their perfect accommodation through HostelHub
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/explore"
                  className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Browse Premium Hostels
                </a>
                <a 
                  href="/contact"
                  className="px-6 py-3 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 border border-slate-300"
                >
                  Get Personal Assistance
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutAndTestimonials;