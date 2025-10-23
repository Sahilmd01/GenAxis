import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Sparkles, Cpu, Database, Globe, Shield, 
  BookOpen, FileText, Play, ArrowRight, Star, Award, Clock, 
  Lock, Users, Brain, Cloud, BarChart, CheckCircle, ArrowUpRight,
  Eye, Code, Palette, MessageCircle, BarChart3, Settings, Zap,
  Crown, Gem, Target, Rocket, Shield as ShieldIcon, Zap as ZapIcon,
  Grid, Circle, Square, Sun
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';



const stats = [
  { value: '99.9%', label: 'PRECISION ACCURACY', icon: <Target className="w-6 h-6" />, change: 'Industry Leading' },
  { value: '50ms', label: 'RESPONSE TIME', icon: <ZapIcon className="w-6 h-6" />, change: 'Real-time Processing' },
  { value: '256-bit', label: 'SECURITY STANDARD', icon: <ShieldIcon className="w-6 h-6" />, change: 'Military Grade' },
  { value: '24/7', label: 'PLATFORM UPTIME', icon: <Gem className="w-6 h-6" />, change: 'Enterprise SLA' },
];

const testimonials = [
  {
    name: "Alexander Thorne",
    role: "Head of AI Research - Quantum Tech",
    content: "The intuitive interface combined with powerful AI capabilities has transformed our creative workflow.",
    avatar: "/avatars/1.png",
    rating: 5
  },
  {
    name: "Isabella Chen",
    role: "Chief Product Officer - Nexus Systems",
    content: "Unprecedented processing speeds coupled with architectural precision and ease of use.",
    avatar: "/avatars/2.png",
    rating: 5
  },
  {
    name: "Marcus Reyes",
    role: "Director of Innovation - Synthetic Minds",
    content: "The modular AI architecture allows for seamless enterprise integration with minimal setup.",
    avatar: "/avatars/3.png",
    rating: 5
  }
];

const companies = [
  'Quantum', 'Synthetic', 'Nexus', 'Vertex', 'Polaris', 'Astral',
  'Nova', 'Orion', 'Zenith', 'Apex', 'Vector', 'Matrix'
];

// Custom Hexagon component
const Hexagon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const Hero = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const FloatingElements = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-blue-200/30 rounded-lg"
          style={{
            width: 30 + i * 8,
            height: 30 + i * 8,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 180, 360],
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating circles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-amber-200/30 rounded-full"
          style={{
            width: 20 + i * 6,
            height: 20 + i * 6,
            top: `${Math.random() * 100}%`,
            right: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Hexagon network */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Hexagon className="w-24 h-24 text-blue-100" />
      </motion.div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Light Background with subtle patterns */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-amber-50/40" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[size:100px_100px] bg-[linear-gradient(to_right,_#3b82f6_1px,_transparent_1px),_linear-gradient(to_bottom,_#3b82f6_1px,_transparent_1px)]"></div>
        </div>

        {/* Animated sun rays */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-yellow-200/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 mb-16 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-blue-200 shadow-lg"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-amber-500 flex items-center justify-center">
            <Sun className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold tracking-wider text-gray-700">
            Intelligent AI Platform
          </span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-6xl sm:text-8xl lg:text-9xl font-black mb-8 tracking-tighter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
              GENAXIS
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Modern AI Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your workflow with our intuitive AI platform designed for creativity and productivity
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Showcase */}
        

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="text-center mb-20"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">
              Start Your AI Journey
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Join thousands of creators and businesses transforming their workflow
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/get-started')}
                className="px-12 py-4 bg-gradient-to-r from-blue-500 to-amber-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="flex items-center gap-3">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/demo')}
                className="px-12 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0 + index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-100 to-amber-100 mr-4 overflow-hidden border-2 border-white shadow-sm">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                ))}
              </div>
              
              <p className="text-gray-600 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4 }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold text-gray-600 mb-12">
            Trusted by innovative teams worldwide
          </h4>
          
          <div className="flex flex-wrap justify-center gap-12">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.6 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-gray-700 text-xl font-bold hover:text-blue-600 transition-colors cursor-pointer"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Light rays */}
        <motion.div
          className="absolute top-0 left-1/2 w-px h-64 bg-gradient-to-b from-transparent via-blue-200/30 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ originX: "0.5px", originY: "32px" }}
        />
      </div>
    </div>
  );
};

export default Hero;