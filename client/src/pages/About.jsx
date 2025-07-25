import Navbar from '../components/Navbar';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Zap, ShieldCheck, Bolt, Server, Lock, InfinityIcon,
  Rocket, Database, Shield, Crown, BarChart2, Globe,
  Award, Cpu, Sparkles, Users, Gem, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3500);
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
    {
      icon: <Cpu className="w-6 h-6 text-emerald-400" />, 
      title: "Quantum AI Processing", 
      desc: "Scalable AI infrastructure for enterprise needs",
      badge: "EXCLUSIVE" 
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, 
      title: "Military-Grade Security", 
      desc: "End-to-end encryption with compliance certifications",
      badge: "TRUSTED" 
    },
    {
      icon: <Bolt className="w-6 h-6 text-emerald-400" />, 
      title: "Nanosecond Response", 
      desc: "Multi-region architecture with 99.999% SLA",
      badge: "ULTRA" 
    }
  ];

  const stats = [
    { val: "99.99%", label: "Uptime SLA", icon: <Server className="w-5 h-5 text-emerald-400" /> },
    { val: "256-bit", label: "Encryption", icon: <Lock className="w-5 h-5 text-emerald-400" /> },
    { val: "<50ms", label: "Latency", icon: <Bolt className="w-5 h-5 text-emerald-400" /> },
    { val: "Unlimited", label: "Scale", icon: <InfinityIcon className="w-5 h-5 text-emerald-400" /> },
    { val: "Global", label: "Network", icon: <Globe className="w-5 h-5 text-emerald-400" /> },
    { val: "SOC2", label: "Compliance", icon: <Shield className="w-5 h-5 text-emerald-400" /> }
  ];

  const enterprise = [
    {
      title: "Global AI Infrastructure",
      desc: "28 regions worldwide with dedicated nodes",
      icon: <Globe className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Enterprise SLAs",
      desc: "Financial-backed uptime guarantees",
      icon: <Award className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Dedicated Acceleration",
      desc: "ASIC-optimized AI models",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <Navbar />

      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />

      <motion.div
        className="fixed z-50 pointer-events-none"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
        ref={cursorRef}
        animate={{ scale: isHovering ? 0.7 : 1, opacity: isHovering ? 0.9 : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      >
        <img src="/cursor.png" alt="Custom glowing cursor" loading="lazy" className="w-8 h-8 object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
            ABOUT GENAXIS AI
          </span>
          <div className="ml-2 px-2 py-0.5 rounded-full bg-violet-100 text-xs font-medium text-violet-700">NEW</div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Section */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-emerald-100 shadow-xl">
              <img 
                src="/about1.jpg" 
                alt="About GenAxis" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                <p className="text-emerald-100">Democratizing AI for enterprises worldwide</p>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1">
            <motion.h2 
              className="text-5xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Pioneering</span>
              <br />
              <span className="text-gray-900">AI Innovation</span>
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              GenAxis delivers <span className="font-semibold text-emerald-600">enterprise-grade AI solutions</span> with 
              unmatched performance, security, and scalability for mission-critical applications.
            </motion.p>

            {/* Features */}
            <motion.div 
              className="relative h-28 mb-12 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute inset-0 flex flex-col items-start">
                <div className="flex items-center gap-3 text-2xl font-semibold mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                    {features[activeFeature].icon}
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                    {features[activeFeature].title}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full ml-2">
                    {features[activeFeature].badge}
                  </span>
                </div>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  {features[activeFeature].desc}
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {stats.map((s, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }} 
                  className="bg-white/90 border border-emerald-100 rounded-xl p-5 text-center backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    {s.icon}
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                      {s.val}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold group relative overflow-hidden shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-emerald-600 to-violet-600 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Zap className="w-5 h-5" />
              <span className="text-lg">Contact Our Team</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Enterprise Features */}
        <motion.div 
          className="mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm mb-6">
              <Crown className="w-5 h-5 text-emerald-600" />
              <span className="ml-2 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                ENTERPRISE SOLUTIONS
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Mission-Critical</span> Workloads
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engineered for the most demanding AI applications in finance, healthcare, and government sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {enterprise.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white/90 border border-emerald-100 rounded-2xl p-8 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                    {f.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{f.title}</h4>
                </div>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 10 + 5;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-emerald-200/30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  width: size,
                  height: size,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  transition: {
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;