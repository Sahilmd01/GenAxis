import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, Gem, Sparkles, Code, Image, PenTool, ShieldCheck, BarChart2, Cpu, Database, Globe, Server, Shield, Layers } from 'lucide-react';
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
      name: 'Enterprise AI Solutions',
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      description: 'Scalable AI infrastructure designed for Fortune 500 performance requirements'
    },
    {
      name: 'Data Intelligence',
      icon: <Database className="w-6 h-6 text-amber-400" />,
      description: 'Real-time analytics and insights from petabytes of structured/unstructured data'
    },
    {
      name: 'Global Deployment',
      icon: <Globe className="w-6 h-6 text-amber-400" />,
      description: 'Multi-region architecture with 99.999% SLA for mission-critical operations'
    },
    {
      name: 'Security Compliance',
      icon: <Shield className="w-6 h-6 text-amber-400" />,
      description: 'End-to-end encryption with SOC 2 Type II, ISO 27001, and GDPR compliance'
    }
  ];

  const stats = [
    { value: "4.9/5", label: "Customer Satisfaction" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "256-bit", label: "Encryption" },
    { value: "50ms", label: "Response Time" }
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
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 opacity-95"></div>
      
      {/* Premium animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-amber-500/5 to-amber-600/10 blur-[150px]"
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: 'reverse', 
            ease: 'easeInOut' 
          }}
        />

        <motion.div
          className="absolute bottom-[25%] right-[15%] w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-amber-600/5 to-amber-700/10 blur-[180px]"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 14, 
            repeat: Infinity, 
            repeatType: 'reverse', 
            ease: 'easeInOut', 
            delay: 2 
          }}
        />

        {/* Premium geometric pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPattern" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                <rect width="80" height="80" fill="none" stroke="#f59e0b" strokeWidth="0.3" strokeDasharray="2 2" />
                <path d="M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)" />
          </svg>
        </div>
      </div>

      {/* Your original custom cursor - kept exactly the same */}
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
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-10 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-900/40 to-amber-800/30 border border-amber-700/60 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Gem className="w-6 h-6 text-amber-300" />
            <span className="text-sm font-medium tracking-widest text-amber-300 uppercase">
              Enterprise Platinum
            </span>
          </div>
          <div className="ml-2 px-3 py-1 rounded-full bg-amber-900/70 text-xs font-semibold text-amber-200 border border-amber-700/50">
            EXCLUSIVE ACCESS
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
              Enterprise-Grade
            </span>
            <br />
            <span className="text-gray-100">AI Infrastructure</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            The most advanced AI platform for global enterprises, with unmatched performance, 
            security, and scalability for mission-critical applications.
          </p>
        </motion.div>

        {/* Rotating features */}
        <div className="relative h-28 mb-16 w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              className="absolute inset-0 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 text-2xl font-semibold text-amber-400">
                {features[activeFeature].icon}
                {features[activeFeature].name}
              </div>
              <p className="mt-4 text-xl text-center text-gray-300 max-w-2xl leading-relaxed">
                {features[activeFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 w-full max-w-4xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 text-center backdrop-blur-sm"
            >
              <div className="text-3xl font-bold text-amber-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          <button
            onClick={() => navigate('/enterprise-contact')}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            className="flex items-center gap-4 px-10 py-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-semibold hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Zap className="w-6 h-6" />
            <span className="text-lg">Get Started</span>
            <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
          </button>

          <button
            onClick={() => navigate('/demo')}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            className="flex items-center gap-4 px-10 py-5 rounded-xl bg-gray-900/90 border border-gray-800 text-gray-100 font-semibold hover:bg-gray-800/80 hover:border-amber-500/40 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span className="text-lg">Live Demo</span>
            <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
          </button>
        </motion.div>

        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full max-w-6xl"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-8 text-center">
            Trusted by the world's most innovative enterprises
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: 'JPMORGAN', industry: 'Finance' },
              { name: 'LOCKHEED', industry: 'Aerospace' },
              { name: 'SHELL', industry: 'Energy' },
              { name: 'NVIDIA', industry: 'Technology' },
              { name: 'SAMSUNG', industry: 'Electronics' }
            ].map((company, index) => (
              <motion.div
                key={company.name}
                whileHover={{ y: -5 }}
                className="bg-gray-900/70 border border-gray-800/50 rounded-lg p-4 flex flex-col items-center group cursor-default"
              >
                <div className="text-xl font-bold text-gray-400 group-hover:text-amber-400 transition-colors mb-1">
                  {company.name}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {company.industry}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
