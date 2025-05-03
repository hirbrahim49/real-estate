"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsOfService = () => {
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

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pt-24 pb-12">
      <div className="w-[80%] mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-serif font-bold mb-6">Terms of Service</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </motion.section>

        {/* Content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
          className="prose max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600">
                By accessing or using EstateHub's services, you agree to be bound by these Terms. If you disagree, please discontinue use immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">2. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>You must be at least 18 years old to use our services</li>
                <li>Provide accurate information in all listings and communications</li>
                <li>Do not post false, misleading, or illegal content</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">3. Service Fees</h2>
              <p className="text-slate-600">
                EstateHub charges a 10% service fee on all completed transactions. This fee covers platform maintenance, verification services, and customer support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">4. Intellectual Property</h2>
              <p className="text-slate-600">
                All content on EstateHub (logos, text, graphics) is our property or licensed to us. You may not reproduce, distribute, or create derivative works without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">5. Limitation of Liability</h2>
              <p className="text-slate-600">
                EstateHub is not liable for any indirect, incidental, or consequential damages arising from your use of our services. We do not guarantee the accuracy of listings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">6. Changes to Terms</h2>
              <p className="text-slate-600">
                We may modify these Terms at any time. Continued use after changes constitutes acceptance. We'll notify users of significant changes via email or platform notifications.
              </p>
            </section>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-slate-600">
                For questions about these Terms, contact us at{" "}
                <Link href="mailto:hostelhubcontact@gmail.com" className="text-amber-600 hover:underline">
                  hostelhubcontact@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;