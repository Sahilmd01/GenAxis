import React, { useState } from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { Zap, ChevronRight, Sparkles, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Aitools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hoveredTool, setHoveredTool] = useState(null);

  const handleToolClick = (tool) => {
    if (user) {
      navigate(tool.path);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-28 bg-gradient-to-b from-white to-emerald-50/20 relative overflow-hidden">
      {/* Floating gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-100/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
            PREMIUM AI TOOLS
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-slate-800 text-4xl sm:text-5xl font-bold mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">Professional-Grade</span> AI Solutions
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-500 text-lg max-w-2xl mx-auto"
        >
          Access our exclusive suite of AI tools designed for professionals who demand the best.
        </motion.p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        {AiToolsData.map((tool, index) => (
          <motion.div
            key={tool.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8 }}
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
            className="group relative p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-100 hover:border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleToolClick(tool)}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            
            {/* Hover shine effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
            </div>

            <div className="relative z-10">
              <div 
                className="w-16 h-16 p-4 text-white rounded-xl flex items-center justify-center shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                  boxShadow: `0 8px 20px ${tool.bg.from}40`
                }}
              >
                <tool.Icon className="w-6 h-6" />
              </div>
              
              <h3 className="mt-2 mb-3 text-xl font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{tool.description}</p>
              
              <div className="flex items-center">
                <span className={`text-sm font-medium ${user ? 'text-emerald-600' : 'text-gray-400'} transition-colors`}>
                  {user ? 'Access Tool' : 'Login Required'}
                </span>
                <ChevronRight className={`w-4 h-4 ml-2 ${user ? 'text-emerald-600' : 'text-gray-400'} transition-colors`} />
              </div>
              
              {!user && (
                <div className="absolute top-4 right-4 p-2 bg-white/80 rounded-full border border-gray-200">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 flex justify-center mt-16"
      >
        <button
          onClick={() => navigate(user ? '/dashboard' : '/sign-up')}
          className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-violet-600 text-white hover:shadow-xl transition-all relative overflow-hidden group"
        >
          <span className="relative z-10">{user ? 'Go to Dashboard' : 'Get Started'}</span>
          <Zap className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
        </button>
      </motion.div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-100"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-emerald-100 to-violet-100 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Content is Locked
              </h3>
              
              <p className="text-gray-500 text-center mb-6">
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