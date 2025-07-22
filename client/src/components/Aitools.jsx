import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion, AnimatePresence } from 'framer-motion';
import { AiToolsData } from '../assets/assets';
import { 
  Sparkles, X, Crown, Zap, Shield, Rocket, 
  BarChart2, Globe, Lock, Cpu, Database, 
  Infinity as InfinityIcon, Key, Briefcase, Server, Clock 
} from 'lucide-react';

const Aitools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const enterpriseTools = AiToolsData.map((tool, index) => ({
    ...tool,
    id: tool.id || `tool-${index}`,
    features: [
      'Unlimited Usage',
      'Priority Processing',
      'Dedicated Infrastructure',
      'SOC2 Compliance'
    ],
    stats: [
      { id: 'uptime', value: "99.99%", label: "Uptime", icon: <Server className="w-4 h-4" /> },
      { id: 'encryption', value: "256-bit", label: "Encryption", icon: <Lock className="w-4 h-4" /> },
      { id: 'latency', value: "<50ms", label: "Latency", icon: <Clock className="w-4 h-4" /> }
    ]
  }));

  const categories = [
    { id: 'all', name: 'All Tools', icon: <InfinityIcon className="w-4 h-4" /> },
    { id: 'productivity', name: 'Productivity', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'global', name: 'Global', icon: <Globe className="w-4 h-4" /> },
    { id: 'premium', name: 'Premium', icon: <Crown className="w-4 h-4" /> }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? enterpriseTools 
    : enterpriseTools.filter(tool => tool.category === selectedCategory);

  const handleToolClick = (tool) => {
    if (!user) {
      openSignIn({
        afterSignInUrl: window.location.href,
        afterSignUpUrl: window.location.href
      });
      return;
    }
    navigate(tool.path);
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gray-950 overflow-hidden">
      {/* Hero Component Background Effects */}
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

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-900/40 border border-amber-800/60 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium tracking-widest text-amber-400 uppercase">
              Enterprise AI Suite
            </span>
            <div className="flex items-center gap-1 ml-2">
              {[...Array(3)].map((_, i) => (
                <Crown key={`crown-${i}`} className="w-4 h-4 text-amber-300" />
              ))}
            </div>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 mb-4 leading-tight">
            AI Command Center
          </h2>
          
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Mission-critical AI infrastructure with enterprise-grade reliability, security, and performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { id: 'uptime', value: "99.99%", label: "Uptime SLA", icon: <Server className="w-5 h-5" /> },
            { id: 'scalability', value: "∞", label: "Scalability", icon: <InfinityIcon className="w-5 h-5" /> },
            { id: 'encryption', value: "256-bit", label: "Encryption", icon: <Lock className="w-5 h-5" /> },
            { id: 'infrastructure', value: "Global", label: "Infrastructure", icon: <Globe className="w-5 h-5" /> }
          ].map((metric) => (
            <motion.div
              key={metric.id}
              className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 backdrop-blur-sm"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  {metric.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">{metric.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{metric.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
                selectedCategory === category.id 
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' 
                  : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
            >
              <span className="text-amber-400">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative group rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800 hover:border-amber-500/50 transition-all overflow-hidden"
              onClick={() => handleToolClick(tool)}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/30 text-xs text-amber-300">
                <Cpu className="w-3 h-3" />
                <span>ENTERPRISE</span>
              </div>

              <motion.div 
                className="absolute inset-0 bg-amber-500/5"
                animate={{ opacity: hoveredTool === tool.id ? 1 : 0 }}
              />
              
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-amber-500/10">
                    <tool.Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-1">{tool.title}</h3>
                    <p className="text-gray-400 text-sm">{tool.description}</p>
                  </div>
                </div>

                <div className="flex gap-3 mb-4">
                  {tool.stats.map((stat) => (
                    <div key={stat.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800/50 text-xs text-gray-300">
                      <span className="text-amber-400">{stat.icon}</span>
                      <span>{stat.value}</span>
                      <span className="text-gray-500 text-[10px]">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-800/50">
                  <ul className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <li key={`${tool.id}-feature-${i}`} className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-3 h-3 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showAccessModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full p-8 shadow-xl overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-500/15 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-amber-600/15 blur-[80px]" />
              
              <button 
                className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-amber-400 transition-colors z-10"
                onClick={() => setShowAccessModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <div className="w-16 h-16 mb-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Key className="w-6 h-6 text-amber-400" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-100 mb-3">Enterprise Access Required</h3>
                    <p className="text-gray-400 mb-6">
                      This tool requires enterprise-level access. Please contact our sales team to upgrade your account.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-800">
                        <Briefcase className="w-6 h-6 text-amber-400" />
                        <div>
                          <h4 className="font-medium text-gray-100">Dedicated Resources</h4>
                          <p className="text-sm text-gray-400">Isolated infrastructure for maximum performance</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-800">
                        <Shield className="w-6 h-6 text-amber-400" />
                        <div>
                          <h4 className="font-medium text-gray-100">Enhanced Security</h4>
                          <p className="text-sm text-gray-400">SOC2 Type II compliant data handling</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="h-full p-6 rounded-lg bg-gray-900/50 border border-gray-800">
                      <h4 className="text-lg font-semibold text-amber-400 mb-4">Request Access</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-gray-400 uppercase mb-2">Company Email</label>
                          <input 
                            type="email" 
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30" 
                            placeholder={user ? user.primaryEmailAddress?.emailAddress : "name@company.com"}
                            value={user ? user.primaryEmailAddress?.emailAddress : ""}
                            readOnly={!!user}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-400 uppercase mb-2">Company Name</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30" 
                            placeholder="Your Organization"
                          />
                        </div>
                        
                        <button 
                          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all mt-4"
                          onClick={() => setShowAccessModal(false)}
                        >
                          Contact Enterprise Team
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Aitools;