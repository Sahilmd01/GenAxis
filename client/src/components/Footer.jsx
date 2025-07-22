import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Gem, Code, Image, PenTool, ShieldCheck, Lock, Globe, Server, Clock, BookOpen, Layout, Scissors, FileText } from 'lucide-react';

const Footer = () => {
  const enterpriseStats = [
    { value: "99.99%", label: "Uptime SLA", icon: <Server className="w-5 h-5 text-amber-400" /> },
    { value: "∞", label: "Scalability", icon: <Zap className="w-5 h-5 text-amber-400" /> },
    { value: "256-bit", label: "Encryption", icon: <Lock className="w-5 h-5 text-amber-400" /> },
    { value: "Global", label: "Infrastructure", icon: <Globe className="w-5 h-5 text-amber-400" /> }
  ];

  return (
    <div className="relative w-full bg-gray-950 border-t border-gray-800/50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 opacity-95"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-64 h-64 rounded-full bg-amber-500/10 blur-[100px]"
        animate={{ opacity: 0.2, scale: 1.1 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Enterprise Solutions Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-amber-900/40 border border-amber-800/60 backdrop-blur-sm"
          >
            <Gem className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium tracking-widest text-amber-400 uppercase">
              Enterprise AI Suite
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
              Enterprise-Grade
            </span>
            <span className="text-gray-100"> AI Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 max-w-3xl mb-12"
          >
            Mission-critical AI infrastructure for organizations that demand reliability, scalability, and uncompromising performance.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {enterpriseStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  {stat.icon}
                  <span className="text-2xl font-bold text-amber-400">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">All Solutions</h3>
            <div className="flex flex-wrap gap-2">
              {['Productivity', 'Security', 'Global', 'ENTERPRISE'].map((tag, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800/60 border border-gray-700 text-gray-300 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-800/50 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Solutions', 'Pricing', 'Demo'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'API Reference', 'Blog', 'Case Studies'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Careers', 'Press', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Security', 'Compliance'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-800/50">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                GenAxis
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GenAxis Technologies. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social, index) => (
                <a key={index} href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;