import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, Gem, Sparkles, Code, Image, PenTool, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const cursorRef = useRef(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rotate = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const features = [
    {
      name: 'AI Image Generation',
      icon: <Image className="w-5 h-5 text-amber-400" />,
      description: 'Create stunning visuals from text prompts with our quantum-powered engine'
    },
    {
      name: 'Code Automation',
      icon: <Code className="w-5 h-5 text-amber-400" />,
      description: 'Generate production-ready code in multiple languages instantly'
    },
    {
      name: 'Content Creation',
      icon: <PenTool className="w-5 h-5 text-amber-400" />,
      description: 'Perfectly crafted marketing copy, blogs, and social content'
    },
    {
      name: 'Enterprise Security',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      description: 'Military-grade data protection for mission-critical AI workflows'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      rotate.set((e.clientX + e.clientY) * 0.1);
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('button')) {
        setIsHoveringButton(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHoveringButton(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 opacity-95"></div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[15%] w-72 h-72 rounded-full bg-amber-500/10 blur-[120px]"
          animate={{ opacity: 0.3, scale: 1.1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute bottom-[25%] right-[15%] w-80 h-80 rounded-full bg-amber-600/10 blur-[140px]"
          animate={{ opacity: 0.4, scale: 1.15 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
        />

        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#fbbf24" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <motion.div
        className="fixed z-50 pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        ref={cursorRef}
        animate={{
          scale: isHoveringButton ? 0.8 : 1,
          opacity: isHoveringButton ? 0.7 : 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <motion.img
          src="/cursor.png"
          alt="Cursor"
          className="w-12 h-12 object-contain"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))'
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-amber-900/40 border border-amber-800/60 backdrop-blur-sm"
        >
          <Gem className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium tracking-widest text-amber-400 uppercase">
            Platinum Edition
          </span>
          <div className="ml-2 px-2 py-0.5 rounded-full bg-amber-900/50 text-xs font-semibold text-amber-300">
            EXCLUSIVE
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-8 leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
            Next-Generation
          </span>
          <br />
          <span className="text-gray-100">AI Platform</span>
        </motion.h1>

        <div className="relative h-24 mb-12 w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              className="absolute inset-0 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 text-xl font-medium text-amber-400">
                {features[activeFeature].icon}
                {features[activeFeature].name}
              </div>
              <p className="mt-3 text-lg text-center text-gray-300">
                {features[activeFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => navigate('/signup')}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-medium hover:shadow-lg hover:shadow-amber-500/40 transition-all duration-300 group"
          >
            <Zap className="w-5 h-5" />
            <span>Get Started</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => navigate('/demo')}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-900/90 border border-gray-800 text-gray-100 font-medium hover:bg-gray-800/80 hover:border-amber-500/40 transition-all duration-300 group"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Live Demo</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-6 text-center">
            Trusted by elite innovators
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {['TESLA', 'NASA', 'LOCKHEED', 'NVIDIA', 'JPMORGAN'].map((logo) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.1 }}
                className="text-lg font-bold text-gray-600 hover:text-amber-400 transition-colors cursor-default"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
