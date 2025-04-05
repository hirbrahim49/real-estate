"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Homefooter from "../../app/Components/HomePage/Homefooter";
import { MdVerified } from "react-icons/md";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      delay,
      ease: [0.16, 1, 0.3, 1]
    },
  }),
};

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        {/* Enhanced Loading Animation */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </div>
        
        {/* Text with fade animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-xl font-medium text-slate-800">Loading HostelHub</h3>
          <p className="text-slate-500">Preparing your premium experience</p>
        </motion.div>
        
        {/* Optional progress bar */}
        <div className="w-64 bg-slate-200 rounded-full h-1.5 mt-4 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-600">
      {/* Luxury Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium tracking-widest">ABOUT HOSTELHUB</span>
          </motion.div>
          
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
          >
            Redefining Student <br className="hidden lg:block" /> Accommodation
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          />
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="text-lg md:text-xl max-w-3xl mx-auto text-slate-200 leading-relaxed"
          >
            Connecting students to premium, verified accommodations with unparalleled transparency and convenience.
          </motion.p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-b from-slate-900/5 to-transparent" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="flex items-center mb-2">
              <div className="w-12 h-0.5 bg-amber-500 mr-4" />
              <span className="text-sm font-medium tracking-widest text-amber-600">OUR MISSION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 font-serif">
              Elevating the student living experience
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              We transform hostel hunting from a stressful chore into a seamless digital experience. 
              Our platform provides verified listings with high-quality media, direct owner connections, 
              and transparent pricing—all designed with the modern student in mind.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.3}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <Image
              src="/Image/students-checking-rooms.jpg"
              alt="Students Checking Rooms"
              width={600}
              height={450}
              className="relative rounded-3xl shadow-xl object-cover z-10 group-hover:shadow-2xl transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
              Why Choose HostelHub
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We set the standard for student accommodation with these premium features
            </p>
          </motion.div>
          
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: "Verified Listings", 
                description: "Every property undergoes rigorous verification",
                icon: <MdVerified className="text-3xl text-amber-500" />
              },
              { 
                title: "Direct Contact", 
                description: "Connect directly with property owners",
                icon: <MdVerified className="text-3xl text-amber-500" />
              },
              { 
                title: "Premium Media", 
                description: "High-quality photos and virtual tours",
                icon: <MdVerified className="text-3xl text-amber-500" />
              },
              { 
                title: "Transparent Pricing", 
                description: "No hidden fees or surprise charges",
                icon: <MdVerified className="text-3xl text-amber-500" />
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                custom={i * 0.1}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-light text-slate-800 mb-4 font-serif">
            Meet Our Team
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The passionate individuals dedicated to improving student accommodation
          </p>
        </motion.div>
        
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              name: "Ibrahim", 
              role: "Founder & Developer", 
              image: "/Image/Ibrahim.jpg",
              bio: "Visionary behind HostelHub's innovative platform"
            },
            { 
              name: "Banji", 
              role: "Marketing Lead", 
              image: "/Image/Jane.jpg",
              bio: "Connecting students with the perfect accommodations"
            },
            { 
              name: "Emmanuel", 
              role: "Influencer & promoter", 
              image: "/Image/emma.jpg",
              bio: "Ensuring seamless experiences for all users"
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              custom={i * 0.2}
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-amber-300 mb-2">{member.role}</p>
                <p className="text-slate-200 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
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
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {[
              {
                name: "John Doe",
                review: "HostelHub completely transformed my accommodation search. The verified listings saved me from countless scams.",
                year: "3rd Year - OAU",
                rating: 5
              },
              {
                name: "Jane Smith",
                review: "The direct contact feature allowed me to negotiate terms directly with the owner. Unmatched convenience!",
                year: "2nd Year - OAU",
                rating: 5
              },
              {
                name: "Alex Johnson",
                review: "As an international student, the virtual tours were invaluable. I secured my hostel before even arriving in Nigeria.",
                year: "4th Year - OAU",
                rating: 5
              },
            ].map((testimony, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                custom={i * 0.2}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimony.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-slate-700 mb-6">"{testimony.review}"</p>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{testimony.name}</h3>
                  <p className="text-slate-500 text-sm">{testimony.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-400 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.3}
            className="text-3xl font-light mb-4 font-serif"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.4}
            className="text-lg mb-6"
          >
            Have questions or want to list your accommodation? We are here to help.
          </motion.p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.5}
            className="flex justify-center gap-8"
          >
            <a href="mailto:hostelhubcontact@gmail.com" className="px-6 py-3 bg-white text-slate-800 rounded-full font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300">
              Email Us
            </a>
            <a href="tel:+2349135843102" className="px-6 py-3 bg-white text-slate-800 rounded-full font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300">
              Call Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  ); 
};

export default Page;