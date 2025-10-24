import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { ChevronRight, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Aitools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [inViewCards, setInViewCards] = useState({});
  const cardRefs = useRef([]);

  // Memoized click handler
  const handleToolClick = useCallback(
    (tool) => {
      if (user) {
        navigate(tool.path);
      } else {
        setShowLoginModal(true);
      }
    },
    [user, navigate]
  );

  // Intersection Observer for lazy video loading + scroll animations
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

  // Animation variants (simplified for performance)
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
      x: index % 2 === 0 ? -60 : 60,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      x: 0,
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
        <div className="absolute top-20 left-10 w-64 h-64 bg-gray-300/15 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gray-400/15 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-black text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          EXPLORE OUR AI TOOLS
        </motion.h2>

        <motion.p
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Discover cutting-edge AI solutions that transform your workflow and boost productivity
        </motion.p>
      </div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 max-w-7xl mx-auto"
      >
        {AiToolsData.map((tool, index) => (
          <motion.div
            key={tool.id || index}
            ref={(el) => (cardRefs.current[index] = el)}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={inViewCards[index] ? "visible" : "hidden"}
            whileHover="hover"
            style={{ willChange: "transform, opacity" }}
            onClick={() => handleToolClick(tool)}
            className="group relative p-6 rounded-2xl bg-black/95 backdrop-blur-sm border-2 border-gray-800 hover:border-purple-400 shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)] transition-all duration-300 cursor-pointer overflow-hidden min-h-[320px] flex flex-col"
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
                    src={`/videos/${tool.title.toLowerCase().replace(/\s+/g, '')}.mp4`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
            </div>

            {/* Card content */}
            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:border-purple-300/60 overflow-hidden p-0">
                  <img
                    src={`/images/${tool.title.toLowerCase().replace(/\s+/g, '')}.png`}
                    alt={tool.title}
                    className="w-full h-full object-cover p-0"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const iconFallback = e.target.parentElement.querySelector('.icon-fallback');
                      if (iconFallback) {
                        iconFallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="icon-fallback hidden w-full h-full items-center justify-center">
                    <tool.Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {!user && (
                  <div className="p-2 bg-black/50 rounded-full border border-gray-600 backdrop-blur-sm group-hover:border-purple-400/50 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-300">
                    <Lock className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="mt-2 mb-3 text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                  {tool.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center mt-auto">
                <span
                  className={`text-sm font-semibold ${user
                    ? 'text-white group-hover:text-purple-200'
                    : 'text-gray-400'} transition-colors duration-300`}
                >
                  {user ? 'Access Tool' : 'Login Required'}
                </span>
                <ChevronRight
                  className={`w-4 h-4 ml-2 ${user
                    ? 'text-white group-hover:text-purple-200'
                    : 'text-gray-400'} transition-colors duration-300 group-hover:translate-x-1 transition-transform`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-xl border border-gray-700"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-black-600 to-black-800 flex items-center justify-center border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-white mb-3">
                Content is Locked
              </h3>

              <p className="text-gray-300 text-base text-center mb-6 leading-relaxed">
                Please login to access our professional AI tools suite.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Aitools;
