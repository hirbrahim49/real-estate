"use client";
import { motion } from "framer-motion";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { HeroDataBase } from "../Data/HeroData"; // Adjust path if necessary

const slideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function Slide() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <motion.div
      className="w-full h-[80vh] relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      variants={slideVariants}
      viewport={{ amount: 0.5 }} // Adjust the amount as needed
    >
      <Slider {...settings}>
        {HeroDataBase.map((item, index) => (
          <div key={index} className="relative w-full h-[80vh]">
            {/* Image container */}
            <div className="relative w-[98%] mx-auto h-[80vh]">
              <Image
                src={item.image}
                alt="Apartment Image"
                layout="fill"
                objectFit="cover"
                quality={90}
                priority // To load image first for LCP
                className="z-0"
              />
            </div>
            {/* Text Overlay positioned near top */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 to-transparent">
              <h1 className="text-white text-4xl md:text-7xl font-bold text-center mb-4">
                {item.title}
              </h1>
              <p className="text-white text-lg md:text-xl text-center max-w-2xl">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
}

export default Slide;