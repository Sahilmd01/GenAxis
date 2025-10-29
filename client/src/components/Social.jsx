import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Social = () => {
  const [inViewCards, setInViewCards] = useState({});
  const cardRefs = useRef([]);

  const socialData = [
    {
      id: 1,
      name: 'github',
      title: 'GitHub',
      description: 'Star our repositories and contribute to open source projects',
      instruction: 'Star us on GitHub',
      url: 'https://github.com/sahilmd01',
      color: 'from-gray-900 to-black'
    },
    {
      id: 2,
      name: 'instagram',
      title: 'Instagram',
      description: 'Follow us for daily updates and behind-the-scenes content',
      instruction: 'Follow on Instagram',
      url: 'https://instagram.com/avoliq.dev',
      color: 'from-pink-600 to-purple-600'
    },
    {
      id: 3,
      name: 'youtube',
      title: 'YouTube',
      description: 'Subscribe to our channel for tutorials and updates',
      instruction: 'Subscribe on YouTube',
      url: 'https://youtube.com/@codewithkinu',
      color: 'from-red-600 to-red-800'
    },
    {
      id: 4,
      name: 'linkedin',
      title: 'LinkedIn',
      description: 'Connect with us for professional networking and opportunities',
      instruction: 'Connect on LinkedIn',
      url: 'https://linkedin.com/in/codewithkinu',
      color: 'from-blue-700 to-blue-900'
    }
  ];

  // Intersection Observer for lazy video loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updates = {};
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updates[entry.target.dataset.index] = true;
          }
        });
        if (Object.keys(updates).length > 0) {
          setInViewCards((prev) => ({ ...prev, ...updates }));
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.dataset.index = index;
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const handleSocialClick = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      y: 60,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "tween", ease: "easeOut", duration: 0.4 },
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: { type: "tween", ease: "easeOut", duration: 0.25 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.4 },
    },
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-28 bg-[#F6F6F6] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/15 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-black text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          CONNECT WITH US
        </motion.h2>

        <motion.p
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Join our community across different platforms and stay updated with our latest work
        </motion.p>
      </div>

      {/* Cards grid - 2 columns on phone, 4 on desktop */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-20 max-w-7xl mx-auto"
      >
        {socialData.map((platform, index) => (
          <motion.div
            key={platform.id}
            ref={(el) => (cardRefs.current[index] = el)}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={inViewCards[index] ? "visible" : "hidden"}
            whileHover="hover"
            style={{ willChange: "transform, opacity" }}
            onClick={() => handleSocialClick(platform.url)}
            className="group relative p-4 sm:p-6 rounded-2xl bg-black/95 backdrop-blur-sm border-2 border-gray-800 hover:border-purple-400 shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)] transition-all duration-300 cursor-pointer overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 overflow-hidden z-0 rounded-2xl pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/5 group-hover:from-purple-600/3 group-hover:to-purple-600/8 transition-all duration-300 z-0 rounded-2xl pointer-events-none" />

            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-2xl pointer-events-none">
              {inViewCards[index] ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                >
                  <source
                    src={`/video/${platform.name}.mp4`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${platform.color}`}></div>
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
            </div>

            {/* Card content */}
            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                {/* Logo occupying full rectangular area */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:border-purple-300/60 overflow-hidden p-0 bg-transparent">
                  <img
                    src={`/images/${platform.name}.png`}
                    alt={platform.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const iconFallback = e.target.parentElement.querySelector('.icon-fallback');
                      if (iconFallback) {
                        iconFallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="icon-fallback hidden w-full h-full items-center justify-center bg-white/10">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <ExternalLink className="w-3 h-3 text-black" />
                    </div>
                  </div>
                </div>

                <div className="p-1 sm:p-2 bg-black/50 rounded-full border border-gray-600 backdrop-blur-sm group-hover:border-purple-400/50 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-300">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="mt-2 mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                  {platform.title}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {platform.description}
                </p>
              </div>

              {/* Instruction section */}
              <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-700/50 group-hover:border-purple-400/30 transition-colors duration-300">
                <p className="text-purple-300 text-xs sm:text-sm font-semibold flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 group-hover:animate-pulse"></span>
                  {platform.instruction}
                </p>
              </div>

              <div className="flex items-center mt-2">
                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
                  Visit Platform
                </span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2 text-white group-hover:text-purple-200 transition-colors duration-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Social;