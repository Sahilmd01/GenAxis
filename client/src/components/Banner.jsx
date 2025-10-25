import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  const bannerItems = [
    { id: 1, text: "🌟 Star Us on GitHub", icon: "🚀" },
    { id: 2, text: "📸 Follow on Instagram", icon: "⭐" },
    { id: 3, text: "🎥 Subscribe on YouTube", icon: "🔥" },
    { id: 4, text: "💼 Connect on LinkedIn", icon: "⚡" },
    { id: 5, text: "🚀 Join Our Community", icon: "❤️" },
    { id: 6, text: "💫 Stay Updated", icon: "👥" },
    { id: 7, text: "🎯 Exclusive Content", icon: "✨" },
    { id: 8, text: "📱 Follow for Updates", icon: "🌟" }
  ];

  // Duplicate the items for seamless loop
  const duplicatedItems = [...bannerItems, ...bannerItems];

  return (
    <div className="w-full bg-[#F6F6F6] py-6 overflow-hidden border-y-2 border-purple-400/30 relative">
      {/* Animated banner container */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="inline-flex items-center mx-6 px-5 py-3 bg-black/90 backdrop-blur-sm rounded-xl border border-purple-400/40 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-105 hover:border-purple-400/70 group cursor-pointer"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
            </div>

            {/* Icon */}
            <span className="text-xl mr-3 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </span>
            
            {/* Text */}
            <span className="text-white font-semibold text-base tracking-wide group-hover:text-purple-200 transition-colors duration-300">
              {item.text}
            </span>

            {/* Animated dot */}
            <div className="ml-3 w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:animate-pulse" />
          </div>
        ))}
      </motion.div>

      {/* Gradient overlays for fade effect on edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#F6F6F6] to-transparent z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#F6F6F6] to-transparent z-10" />
    </div>
  );
};

export default Banner;