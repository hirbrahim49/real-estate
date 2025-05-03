"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { MdVerified, MdLocationPin } from 'react-icons/md';

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
      quote: "HostelHub saved me weeks of stressful searching. The verified listings are exactly as shown in photos.",
      avatar: "/avatars/john.jpg"
    },
    {
      name: "Amina Bello",
      university: "UI",
      rating: 5,
      quote: "I secured my premium hostel from abroad thanks to the virtual tours. No surprises when I arrived!",
      avatar: "/avatars/amina.jpg"
    },
    {
      name: "Chike Eze",
      university: "OAU",
      rating: 4,
      quote: "Direct contact with owners helped me negotiate better terms. The verification badge gave me confidence.",
      avatar: "/avatars/chike.jpg"
    }
  ];

  return (
    <div className="bg-slate-50">
      {/* Premium About Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
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
                <span className="text-sm font-medium tracking-widest text-amber-500">OUR MISSION</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light font-serif leading-tight">
                Redefining <span className="text-amber-400">Student Living</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  At HostelHub, we're transforming student accommodation with verified listings, premium media, and direct owner connections. Our platform eliminates the stress of finding quality housing.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  We combine modern living with academic convenience, ensuring your transition to campus life is seamless and exceptional.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {['Verified Listings', 'Virtual Tours', 'Direct Contact', 'Secure Payments'].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="flex items-center bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700"
                  >
                    <MdVerified className="text-amber-500 mr-2" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
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
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20">
                <div className="flex items-center">
                  <MdLocationPin className="text-amber-600 text-2xl mr-2" />
                  <div>
                    <p className="text-xs text-slate-500">Featured Location</p>
                    <p className="font-medium text-slate-800">OAU Premium Hostels</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-slate-100">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-amber-50 px-6 py-2 rounded-full mb-6">
              <span className="text-sm font-medium tracking-widest text-amber-600">TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl font-light font-serif text-slate-800 mb-4">
              What Students Say
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto">
              Hear from students who found their ideal accommodation through HostelHub
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
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 flex flex-col"
                whileHover={{ y: -8 }}
              >
                <FaQuoteLeft className="text-amber-500/30 text-4xl mb-4" />
                <p className="text-slate-600 italic mb-6 flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden mr-4">
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{testimonial.name}</h3>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-amber-500 text-sm" />
                      ))}
                      <span className="text-xs text-slate-500 ml-2">{testimonial.university}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutAndTestimonials;
