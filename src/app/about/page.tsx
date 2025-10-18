"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdVerified, 
  MdLocationOn, 
  MdPhone,
  MdSecurity,
  MdSpeed
} from "react-icons/md";
import { 
  FaStar, 
  FaRegStar, 
  FaStarHalfAlt,
  FaWhatsapp,
  FaShieldAlt,
  FaUniversity,
  FaMoneyBillWave
} from "react-icons/fa";
import { 
  FiArrowRight, 
  FiCheckCircle,
  FiAward,
  FiUsers,
  FiHeart
} from "react-icons/fi";

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center space-y-6">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="relative w-20 h-20"
        >
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-xl font-semibold text-slate-800">Loading HostelHub</h3>
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
        stars.push(<FaStar key={i} className="text-amber-500 text-sm" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-500 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-500 text-sm" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600">
      {/* Premium Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FiAward className="mr-2" />
            <span className="text-sm font-medium tracking-wider">PREMIUM ACCOMMODATION PLATFORM</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Redefining Student
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Living Experience
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connecting students to premium, verified accommodations with unparalleled transparency, 
            convenience, and modern living standards.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/explore" 
              className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Explore Premium Hostels
              <FiArrowRight className="ml-2" />
            </Link>
            
            <Link 
              href="https://chat.whatsapp.com/H5PxQGnXBZk2s7jzooEGvO"
              className="px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2 text-green-500" />
              Join Community
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="flex items-center">
              <div className="w-12 h-0.5 bg-amber-500 mr-4" />
              <span className="text-sm font-semibold tracking-widest text-amber-600 uppercase">Our Mission</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              Elevating Student Living to Premium Standards
            </h2>
            
            <p className="text-lg leading-relaxed text-slate-600">
              We transform the stressful process of finding accommodation into a seamless, 
              transparent digital experience. Our platform connects students with verified, 
              high-quality hostels while ensuring safety, convenience, and value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: <MdVerified className="text-2xl" />, text: "100% Verified Listings" },
                { icon: <FiCheckCircle className="text-2xl" />, text: "Quality Assurance" },
                { icon: <FaShieldAlt className="text-2xl" />, text: "Secure Platform" },
                { icon: <MdSpeed className="text-2xl" />, text: "Instant Booking" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                    {item.icon}
                  </div>
                  <span className="font-medium text-slate-700">{item.text}</span>
                </div>
              ))}
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
            <Image
              src="/Image/students-checking-rooms.jpg"
              alt="Students Checking Rooms"
              width={600}
              height={450}
              className="relative rounded-3xl shadow-xl object-cover z-10 group-hover:shadow-2xl transition-all duration-500"
            />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "500+", label: "Premium Hostels", icon: <FiAward /> },
              { value: "2K+", label: "Students Served", icon: <FiUsers /> },
              { value: "98%", label: "Satisfaction Rate", icon: <FaStar /> },
              { value: "24/7", label: "Support", icon: <MdSecurity /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-amber-400 text-2xl mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 text-amber-400">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-slate-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose HostelHub */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Why Choose HostelHub
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We set new standards in student accommodation with premium features and unmatched service quality
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { 
                title: "Verified Premium Listings", 
                description: "Every property undergoes rigorous verification with quality checks and premium standards",
                icon: <MdVerified className="text-3xl" />,
                color: "from-green-500 to-green-600"
              },
              { 
                title: "Direct Owner Contact", 
                description: "Connect directly with property owners for instant communication and negotiations",
                icon: <MdPhone className="text-3xl" />,
                color: "from-blue-500 to-blue-600"
              },
              { 
                title: "Virtual Tours & Media", 
                description: "High-quality photos and virtual tours for informed decision-making",
                icon: <FaStar className="text-3xl" />,
                color: "from-purple-500 to-purple-600"
              },
              { 
                title: "Transparent Pricing", 
                description: "No hidden fees or surprise charges with clear, upfront pricing",
                icon: <FaMoneyBillWave className="text-3xl" />,
                color: "from-amber-500 to-amber-600"
              },
              { 
                title: "Campus Proximity", 
                description: "Strategic locations near educational institutions for convenience",
                icon: <FaUniversity className="text-3xl" />,
                color: "from-red-500 to-red-600"
              },
              { 
                title: "24/7 Security", 
                description: "Secure platform with verified properties and safety measures",
                icon: <FaShieldAlt className="text-3xl" />,
                color: "from-indigo-500 to-indigo-600"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:border-amber-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

{/* Team Section */}
<section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
        Meet Our <span className="text-amber-500">Team</span>
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full" />
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        The passionate team dedicated to revolutionizing student accommodation in Nigeria
      </p>
    </motion.div>
    
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={staggerContainer}
      className="grid gap-8 grid-cols-1 md:grid-cols-3"
    >
      {[
        { 
          name: "Ibrahim", 
          role: "Lead Developer", 
          bio: "Visionary behind HostelHub's innovative platform and technical architecture. Passionate about creating seamless digital experiences for students.",
          expertise: ["Full-Stack Development", "System Architecture", "UI/UX Design"],
          image: "/Image/ibrahim.jpg"
        },
        { 
          name: "Banji", 
          role: "Marketing Lead", 
          bio: "Driving growth and connecting students with perfect accommodations across campuses. Expert in building vibrant student communities.",
          expertise: ["Digital Marketing", "Community Building", "Brand Strategy"],
          image: "/Image/logo.png"
        },
        { 
          name: "Emmanuel", 
          role: "Growth Specialist", 
          bio: "Expanding HostelHub's reach and ensuring exceptional user experiences. Focused on partnerships and customer success.",
          expertise: ["User Acquisition", "Partnerships", "Customer Success"],
          image: "/Image/emma.jpg"
        },
      ].map((member, i) => (
        <motion.div
          key={i}
          variants={fadeIn}
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200"
          whileHover={{ y: -8 }}
        >
          {/* Image Container with Overlay */}
          <div className="relative h-80 overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            {/* Name and Role Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.h3 
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {member.name}
              </motion.h3>
              <motion.p 
                className="text-amber-300 font-semibold text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {member.role}
              </motion.p>
            </div>

            {/* Social Links (Top Right) */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {[
                { icon: "📧", label: "Email" },
                { icon: "💼", label: "LinkedIn" },
                { icon: "🐦", label: "Twitter" }
              ].map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm hover:bg-white/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            <p className="text-slate-600 mb-6 leading-relaxed text-sm">{member.bio}</p>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider flex items-center">
                <span className="w-4 h-0.5 bg-amber-500 mr-2"></span>
                Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, skillIndex) => (
                  <motion.span 
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + skillIndex * 0.1 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 rounded-full text-xs font-semibold border border-amber-200 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>

    {/* Team CTA Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="text-center mt-16"
    >
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Join Our Mission</h3>
        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
          We're always looking for passionate individuals to help us transform student accommodation across Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            View Open Positions
          </button>
          <button className="px-6 py-3 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 border border-slate-300">
            Contact Our Team
          </button>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Student Experiences
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Hear from students who found their ideayl accommodation through HostelHub
            </p>
          </motion.div>
          
          <div className="relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              className="grid gap-8 grid-cols-1 md:grid-cols-3"
            >
              {[
                {
                  name: "John Doe",
                  review: "HostelHub completely transformed my accommodation search. The verified listings and virtual tours saved me from countless scams and disappointments.",
                  year: "3rd Year Computer Science - OAU",
                  rating: 5,
                  avatar: "JD"
                },
                {
                  name: "Olawuyi David",
                  review: "The direct contact feature allowed me to negotiate terms directly with the owner. Unmatched convenience and transparency throughout the process!",
                  year: "2nd Year Engineering - OAU",
                  rating: 4.5,
                  avatar: "OD"
                },
                {
                  name: "Alex Joseph",
                  review: "As an international student, the virtual tours were invaluable. I secured my perfect hostel before even arriving in Nigeria. Professional service!",
                  year: "4th Year Medicine - OAU",
                  rating: 5,
                  avatar: "AJ"
                },
              ].map((testimony, i) => (
                <motion.div
                  key={i}
                  variants={scaleUp}
                  className={`bg-slate-50 p-8 rounded-2xl border-2 transition-all duration-300 ${
                    activeTestimonial === i 
                      ? 'border-amber-500 shadow-xl' 
                      : 'border-slate-200 shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => setActiveTestimonial(i)}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimony.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{testimony.name}</h3>
                      <p className="text-slate-500 text-sm">{testimony.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {renderStars(testimony.rating)}
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed italic">
                    &quot;{testimony.review}&quot;
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center mt-12 space-x-3">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTestimonial === i 
                      ? 'bg-amber-500 w-8' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Find Your Perfect Home?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of students who found their ideal accommodation through HostelHub's premium platform
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/explore"
              className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Explore Premium Hostels
              <FiArrowRight className="ml-2" />
            </Link>
            
            <Link 
              href="https://chat.whatsapp.com/H5PxQGnXBZk2s7jzooEGvO"
              className="px-8 py-4 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2 text-green-500" />
              Join WhatsApp Community
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-slate-700"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-300">
              <div>
                <div className="text-2xl font-bold text-amber-400">500+</div>
                <div className="text-sm">Premium Hostels</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">2K+</div>
                <div className="text-sm">Happy Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">98%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  ); 
};

export default Page;