"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-serif font-bold mb-6">Privacy Policy</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Effective Date: {new Date().toLocaleDateString()}
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
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">1. Information We Collect</h2>
              <p className="text-slate-600">
                We collect information necessary to provide our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Personal details (name, email, phone number)</li>
                <li>Property information for listings</li>
                <li>Payment and transaction details</li>
                <li>Usage data and cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">2. How We Use Information</h2>
              <p className="text-slate-600">
                Your information helps us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Provide and improve our services</li>
                <li>Verify user identities and prevent fraud</li>
                <li>Process transactions and send notifications</li>
                <li>Communicate with users about their accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">3. Data Sharing</h2>
              <p className="text-slate-600">
                We do not sell your personal data. We may share information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Service providers essential to our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Other users as necessary for transactions (e.g., contact info for property viewings)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">4. Data Security</h2>
              <p className="text-slate-600">
                We implement industry-standard measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>SSL encryption for data transmission</li>
                <li>Secure storage with access controls</li>
                <li>Regular security audits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-light text-slate-800 mb-4">5. Your Rights</h2>
              <p className="text-slate-600">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-slate-600">
                Contact our Data Protection Officer at{" "}
                <Link href="mailto:privacy@estatehub.com" className="text-amber-600 hover:underline">
                  privacy@estatehub.com
                </Link>{" "}
                with any concerns.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;