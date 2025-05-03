"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdVerified, MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

// Animation configurations
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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(testimonialInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-xl font-medium text-slate-800">Loading HostelHub</h3>
          <p className="text-slate-500">Preparing your premium experience</p>
        </motion.div>
        
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

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-amber-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-500" />);
      }
    }
    return stars;
  };

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

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.3}
            className="mt-12"
          >
            <a 
              href="/explore" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-medium text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Hostels
              <FiArrowRight className="ml-2" />
            </a>
          </motion.div>
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
            <div className="pt-4">
              <ul className="space-y-3">
                {[
                  "100% Verified Listings",
                  "Virtual Tours Available",
                  "Direct Owner Communication",
                  "No Hidden Fees"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <MdVerified className="text-amber-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Verified Hostels" },
              { value: "10,000+", label: "Students Served" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                custom={i * 0.1}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2 text-amber-400">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
                icon: <MdPhone className="text-3xl text-amber-500" />
              },
              { 
                title: "Premium Media", 
                description: "High-quality photos and virtual tours",
                icon: <FaStar className="text-3xl text-amber-500" />
              },
              { 
                title: "Transparent Pricing", 
                description: "No hidden fees or surprise charges",
                icon: <MdLocationOn className="text-3xl text-amber-500" />
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={scaleUp}
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
              bio: "Visionary behind HostelHub's innovative platform",
              social: {
                twitter: "#",
                linkedin: "#"
              }
            },
            { 
              name: "Banji", 
              role: "Marketing Lead", 
              image: "/Image/Jane.jpg",
              bio: "Connecting students with the perfect accommodations",
              social: {
                twitter: "#",
                linkedin: "#"
              }
            },
            { 
              name: "Emmanuel", 
              role: "Influencer & Promoter", 
              image: "/Image/emma.jpg",
              bio: "Ensuring seamless experiences for all users",
              social: {
                twitter: "#",
                linkedin: "#"
              }
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
                <p className="text-slate-200 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <a href={member.social.twitter} className="text-white hover:text-amber-300 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href={member.social.linkedin} className="text-white hover:text-amber-300 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
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
          
          <div className="relative">
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
                  rating: 4.5
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
                  className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${activeTestimonial === i ? 'ring-2 ring-amber-500' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                >
                  <div className="flex mb-4">
                    {renderStars(testimony.rating)}
                  </div>
                  <p className="italic text-slate-700 mb-6">"{testimony.review}"</p>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{testimony.name}</h3>
                    <p className="text-slate-500 text-sm">{testimony.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === i ? 'bg-amber-500 w-6' : 'bg-slate-300'}`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section (Simplified) */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-400 to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-3xl font-light mb-6 font-serif"
          >
            Ready to find your perfect accommodation?
          </motion.h2>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.1}
            className="text-xl mb-8"
          >
            Join thousands of students who found their ideal home through HostelHub
          </motion.p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            custom={0.2}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a 
              href="/explore" 
              className="px-8 py-4 bg-white text-slate-800 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg"
            >
              Browse Hostels
            </a>
            <a 
              href="/contact" 
              className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  ); 
};

export default Page;