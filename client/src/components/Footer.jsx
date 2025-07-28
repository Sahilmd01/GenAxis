import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Sparkles, Cpu, Database, Globe, Shield, Server, Lock, BookOpen, FileText } from 'lucide-react';

const Footer = () => {
  const stats = [
    { value: '4.9/5', label: 'Customer Satisfaction', icon: <Sparkles className="w-5 h-5 text-emerald-400" /> },
    { value: '99.99%', label: 'Uptime SLA', icon: <Server className="w-5 h-5 text-emerald-400" /> },
    { value: '256-bit', label: 'Encryption', icon: <Lock className="w-5 h-5 text-emerald-400" /> },
    { value: '50ms', label: 'Response Time', icon: <Zap className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Same background as hero */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40">
        {/* Enterprise Badge - matches hero style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
            ENTERPRISE SOLUTIONS
          </span>
          <div className="ml-2 px-2 py-0.5 rounded-full bg-violet-100 text-xs font-medium text-violet-700">NEW</div>
        </motion.div>

        {/* Heading - matches hero typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">
              Complete AI Platform
            </span>
            <br />
            <span className="text-gray-900">For Your Business Needs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Everything you need to deploy AI at scale with enterprise-grade reliability and performance.
          </p>
        </motion.div>

        {/* Stats Grid - matches hero component */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20"
        >
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }} 
              className="bg-white/90 border border-emerald-100 rounded-xl p-5 text-center backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-center items-center gap-2 mb-2">
                {s.icon}
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                  {s.value}
                </div>
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-emerald-100 pt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Solutions', 'Pricing', 'Demo'].map((item, index) => (
                  <li key={index}>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 hover:text-emerald-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'API Reference', 'Blog', 'Case Studies'].map((item, index) => (
                  <li key={index}>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 hover:text-emerald-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Careers', 'Press', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 hover:text-emerald-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Security', 'Compliance'].map((item, index) => (
                  <li key={index}>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 hover:text-emerald-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-emerald-100">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 relative"
              >
                <img 
                  src="/logo.png" 
                  alt="Company Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div>
            <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              GenAxis
            </span>
                <span className="text-xs text-gray-500 block">Premium AI Solutions</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GenAxis AI Platform. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social, index) => (
                <motion.a 
                  key={index} 
                  href="#" 
                  className="text-gray-500 hover:text-emerald-600 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;