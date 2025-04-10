"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
const Footer = () => {
  // Animation variants for footer items
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-gradient-to-br text-white from-slate-900 to-slate-800 py-12">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* EstateHub */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={footerVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-lg font-bold text-amber-600 mb-4">EstateHub</h2>
          <ul className="space-y-2">
            {["About Us", "Careers", "Blog"].map((item, index) => (
              <li
                key={index}
                className="text-sm hover:text-amber-600 transition duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={footerVariants}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-amber-600 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {["Search Properties", "Contact Agents", "FAQs"].map((item, index) => (
              <li
                key={index}
                className="text-sm hover:text-amber-600 transition duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={footerVariants}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-bold text-amber-600 mb-4">Services</h2>
          <ul className="space-y-2">
            {["Buy Properties", "Sell Properties", "Rent Properties", "Property Management"].map(
              (item, index) => (
              <li
                key={index}
                className="text-sm hover:text-amber-600 transition duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={footerVariants}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-lg font-bold text-amber-600 mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li className="text-sm">Email: hostelhubcontact@gmail.com</li>
            <li className="text-sm">Phone: +234 913 584 3102</li>
            <li className="flex space-x-3 text-amber-600 mt-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/hirbrahim?igsh=cHcxeXByaHn2MzJ6"
                className="cursor-pointer hover:text-amber-800 transition duration-300"
              >
                Instagram
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/share/15bmclAcu9/"
                className="cursor-pointer hover:text-amber-800 transition duration-300"
              >
                Facebook
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com"
                className="cursor-pointer hover:text-amber-800 transition duration-300"
              >
                Twitter
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={footerVariants}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm mt-8 text-amber-600"
      >
        &copy; {new Date().getFullYear()} EstateHub - All Rights <Link href="/submitHostel "> Reserved </Link>.
      </motion.div>
    </footer>
  );
};

export default Footer;