import React from "react";
import { motion, useAnimation } from "framer-motion";
import img2 from "../assets/01.jfif";

const Slider = () => {
  const textAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      color: ["#FFFFFF", "#FFD700", "#00FF00", "#FF4500", "#FFFFFF"], // Color cycle
      transition: {
        duration: 4, // Total duration for color cycle
        repeat: Infinity, // Loop the animation
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Background Image */}
      <img src={img2} className="w-full h-full object-cover" alt="Slide" />

      {/* Overlay and Animated Text */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-5">
        <motion.h2
          className="text-4xl font-bold mb-3"
          variants={textAnimation}
          initial="initial"
          animate="animate"
        >
          Welcome to latest Tech Blog
        </motion.h2>
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Stay ahead with the latest in tech trends! Explore insights, tips, and
          innovations shaping the future of technology.
        </motion.p>
      </div>
    </div>
  );
};

export default Slider;
