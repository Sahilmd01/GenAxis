import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Zap, ShieldCheck, Bolt, Server, Lock, InfinityIcon,
  Rocket, Database, Shield, Crown, BarChart2, Globe,
  Award, Cpu, Sparkles, Users, Gem
} from 'lucide-react';

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);

  // Custom cursor animation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('button, a, .hover-effect')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
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

  const features = [
    { icon: <Zap />, title: "Quantum AI Processing", desc: "Quantum-inspired performance", badge: "EXCLUSIVE" },
    { icon: <ShieldCheck />, title: "Military-Grade Security", desc: "256-bit zero-knowledge", badge: "TRUSTED" },
    { icon: <Bolt />, title: "Nanosecond Response", desc: "Sub-50ms latency", badge: "ULTRA" }
  ];

  const stats = [
    { val: "99.999%", label: "Uptime SLA", icon: <Server /> },
    { val: "256-bit", label: "Encryption", icon: <Lock /> },
    { val: "<10ms", label: "Latency", icon: <Bolt /> },
    { val: "Unlimited", label: "Scale", icon: <InfinityIcon /> },
    { val: "Priority", label: "Processing", icon: <Rocket /> },
    { val: "Dedicated", label: "Nodes", icon: <Database /> },
    { val: "SOC3", label: "Compliance", icon: <Shield /> },
    { val: "PLATINUM", label: "Tier", icon: <Crown /> }
  ];

  const enterprise = [
    { title: "Global AI Infrastructure", desc: "28 regions worldwide", icon: <Globe /> },
    { title: "Enterprise SLAs", desc: "Financial-backed uptime", icon: <Award /> },
    { title: "Dedicated Acceleration", desc: "ASIC-optimized models", icon: <Cpu /> }
  ];

  return (
    <>
      <section className="relative w-full py-24 overflow-hidden bg-gray-950">
        {/* Background elements matching Hero component */}
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
                <pattern id="hexPattern" width="52" height="60" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
                  <path
                    d="M26 0 L52 15 L52 45 L26 60 L0 45 L0 15 Z"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="0.6"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexPattern)" />
            </svg>
          </div>
        </div>

        {/* Custom cursor */}
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
            scale: isHovering ? 0.8 : 1,
            opacity: isHovering ? 0.7 : 1
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <motion.img
            src="/cursor.png" // Replace with your cursor image
            alt="Cursor"
            className="w-9 h-9 object-contain"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))'
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            className="mb-12 inline-flex items-center px-4 py-2 rounded-full bg-amber-900/40 border border-amber-800/60 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="mx-2 text-sm text-amber-400 font-medium uppercase tracking-widest">GenAxis Advantage</span>
            <Gem className="w-4 h-4 text-amber-400" />
          </motion.div>

          <motion.img 
            src="/logo.png" 
            alt="Logo" 
            className="mx-auto h-24 mb-6 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
          
          <motion.h2 
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Powering the AI Revolution
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            GenAxis delivers <span className="text-amber-300 font-semibold">military-grade security</span>, 
            <span className="text-amber-300 font-semibold"> nanosecond latency</span>, and 
            <span className="text-amber-300 font-semibold"> limitless scalability</span>.
          </motion.p>

          {/* Features */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }} 
                className={`border rounded-xl p-6 transition duration-300 ${activeFeature === i ? 'border-amber-500/40' : 'border-gray-700/50'} bg-gray-900/60 backdrop-blur-sm`}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div className="flex items-center gap-4 mb-3 text-amber-400">
                  <div className="p-2 bg-amber-500/10 rounded-full">{f.icon}</div>
                  <div className="text-left">
                    <h4 className="font-semibold">{f.title}</h4>
                    <span className="text-xs bg-amber-800/30 px-2 py-1 rounded-full text-amber-300">{f.badge}</span>
                  </div>
                </div>
                <p className="text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-24 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-8 text-amber-400">
              <BarChart2 className="w-6 h-6" />
              <h3 className="text-2xl font-bold">Enterprise-Grade Performance</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {stats.map((s, i) => (
                <motion.div 
                  key={i} 
                  className="text-center hover:bg-gray-800/50 p-4 rounded-lg transition hover-effect"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-2 text-amber-400">{s.icon}<span className="font-bold">{s.val}</span></div>
                  <p className="text-xs text-gray-400 mt-1 uppercase">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enterprise Features */}
          <motion.div 
            className="mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="mb-12">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-900/30 text-sm text-amber-300 border border-amber-500/30 backdrop-blur-sm"><Crown className="w-4 h-4 mr-2" />PLATINUM ENTERPRISE FEATURES</span>
              <h3 className="text-3xl font-bold text-amber-200 mt-4">Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">Mission-Critical</span> Workloads</h3>
              <p className="text-gray-400 mt-2">Engineered for the most demanding environments</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {enterprise.map((f, i) => (
                <motion.div 
                  key={i} 
                  className="bg-gray-900/40 border border-gray-800 p-6 rounded-xl hover:border-amber-500/30 transition backdrop-blur-sm hover-effect"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-3 text-amber-400">{f.icon}<h4 className="font-semibold text-lg">{f.title}</h4></div>
                  <p className="text-gray-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            className="relative bg-gray-900/40 border border-gray-800 p-10 rounded-2xl max-w-4xl mx-auto backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-6" />
            <blockquote className="text-xl italic text-gray-300 mb-6">"At GenAxis, we're pioneering the next evolution of AI with quantum-inspired architecture."</blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 font-medium">Dr. Elena Rodriguez</p>
                <p className="text-sm text-gray-500">Chief AI Scientist</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Bee */}
        <motion.div
          className="fixed bottom-8 right-8 w-24 h-24 z-40 pointer-events-none"
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <img src="/logo.png" alt="Mascot" className="w-full h-full object-contain" />
        </motion.div>
      </section>
    </>
  );
};

export default About;