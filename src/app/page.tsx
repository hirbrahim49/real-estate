"use client"
import Homepage1 from "./Components/HomePage/Homepage1";
import Homepage2 from "./Components/HomePage/Homepage2";
import Homepage3 from "./Components/HomePage/Homepage3";
import Homepage4 from "./Components/HomePage/Homepage4";
import Homepage5 from "./Components/HomePage/Homepage5";
import { useEffect,useState } from "react";
import {motion} from "framer-motion"

export default function Home() {
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
    <div className=" flex flex-col ">
      <section><Homepage1/></section>
      <section><Homepage2/></section>
      <section><Homepage3/></section>
      <section><Homepage4/></section>
      <section><Homepage5/></section>
     
    </div>
  );
}
