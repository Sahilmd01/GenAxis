import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, Sparkles, Cpu, Database, Globe, Shield } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const features = [
  {
    name: 'Enterprise AI Solutions',
    icon: <Cpu className="w-6 h-6 text-emerald-600" />,
    description: 'Scalable AI infrastructure designed for Fortune 500 performance requirements',
  },
  {
    name: 'Data Intelligence',
    icon: <Database className="w-6 h-6 text-emerald-600" />,
    description: 'Real-time analytics and insights from petabytes of structured/unstructured data',
  },
  {
    name: 'Global Deployment',
    icon: <Globe className="w-6 h-6 text-emerald-600" />,
    description: 'Multi-region architecture with 99.999% SLA for mission-critical operations',
  },
  {
    name: 'Security Compliance',
    icon: <Shield className="w-6 h-6 text-emerald-600" />,
    description: 'End-to-end encryption with SOC 2 Type II, ISO 27001, and GDPR compliance',
  },
];

const stats = [
  { value: '4.9/5', label: 'Customer Satisfaction' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '256-bit', label: 'Encryption' },
  { value: '50ms', label: 'Response Time' },
];

const companies = [
  'google', 'amazon', 'netflix', 'microsoft', 'tesla', 'nvidia', 'ibm', 'intel',
].map(name => ({ name, logo: `/logos/${name}.svg` }));

const Hero = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const spring = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, spring);
  const cursorYSpring = useSpring(cursorY, spring);

  useEffect(() => {
    const interval = setInterval(() => setActiveFeature(i => (i + 1) % features.length), 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const move = e => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const enter = e => e.target.closest('button, a') && setIsHoveringButton(true);
    const leave = () => setIsHoveringButton(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />

      {/* Cursor */}
      <motion.div
        className="fixed z-50 pointer-events-none"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHoveringButton ? 0.7 : 1, opacity: isHoveringButton ? 0.9 : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      >
        <img src="/cursor.png" alt="Cursor" className="w-8 h-8 object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
            ENTERPRISE AI PLATFORM
          </span>
          <div className="ml-2 px-2 py-0.5 rounded-full bg-violet-100 text-xs font-medium text-violet-700">NEW</div>
        </motion.div>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">Intelligent AI</span>
            <br /><span className="text-gray-900">For The Modern Enterprise</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            The most advanced AI platform with unmatched performance, security, and scalability for mission-critical applications.
          </p>
        </motion.div>

        {/* Feature */}
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
              <div className="flex items-center gap-3 text-2xl font-semibold">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                  {features[activeFeature].icon}
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">{features[activeFeature].name}</span>
              </div>
              <p className="mt-4 text-xl text-center text-gray-600 max-w-2xl leading-relaxed">{features[activeFeature].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16 w-full max-w-4xl">
          {stats.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/90 border border-emerald-100 rounded-xl p-5 text-center backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 mb-2">{s.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-5 mb-20">
          {[
            {
              label: 'Get Started',
              icon: <Zap className="w-5 h-5" />,
              onClick: () => navigate('/enterprise-contact'),
              className: 'bg-gradient-to-r from-emerald-600 to-violet-600 text-white',
              overlay: true,
            },
            {
              label: 'Live Demo',
              icon: <Sparkles className="w-5 h-5 text-violet-500" />,
              onClick: () => navigate('/demo'),
              className: 'bg-white/90 border border-emerald-200 text-gray-800',
              overlay: false,
            },
          ].map(({ label, icon, onClick, className, overlay }, i) => (
            <motion.button
              key={label}
              onClick={onClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold group relative overflow-hidden shadow-md hover:shadow-lg transition-all ${className}`}
            >
              {overlay && <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
              {icon}
              <span className="text-lg">{label}</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </motion.button>
          ))}
        </motion.div>

        {/* Logo Carousel */}
        <div className="w-full overflow-hidden py-8">
          <div className="text-center text-sm uppercase tracking-wider text-gray-400 mb-6">Trusted by industry leaders</div>
          <motion.div className="flex items-center gap-12" animate={{ x: ['0%', '-100%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            {[...companies, ...companies].map((c, i) => (
              <div key={`${c.name}-${i}`} className="flex-shrink-0">
                <div className="w-40 h-20 flex items-center justify-center bg-white/90 rounded-lg p-4 shadow-sm border border-emerald-100 hover:shadow-md transition-all">
                  <img src={c.logo} alt={c.name} className="max-h-12 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

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
  );
};

export default Hero;
