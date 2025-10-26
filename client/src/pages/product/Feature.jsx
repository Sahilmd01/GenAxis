import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Play, Pause } from 'lucide-react';
import Navbar from '../../components/Navbar';

const features = [
  {
    title: "AI Image Generation",
    description: "Create stunning visuals from text descriptions with our state-of-the-art image generation models.",
    icon: "/images/image-generation.png",
    highlights: [
      "Multiple art styles",
      "High-resolution output",
      "Customizable parameters"
    ]
  },
  {
    title: "Content Enhancement",
    description: "Automatically improve and optimize your written content with AI-powered suggestions.",
    icon: "/images/content-enhancement.png",
    highlights: [
      "Grammar correction",
      "Style improvements",
      "SEO optimization"
    ]
  },
  {
    title: "Document Processing",
    description: "Extract, analyze, and process information from documents with intelligent automation.",
    icon: "/images/document-processing.png",
    highlights: [
      "PDF/text extraction",
      "Data categorization",
      "Key point summarization"
    ]
  }
];

const Feature = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.8
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:py-28">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            OUR FEATURES
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the comprehensive capabilities of our AI platform designed to transform your workflow.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setActiveFeature(index)}
              className={`p-6 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer group ${
                activeFeature === index 
                  ? 'bg-gray-900/80 border-purple-500/50 ring-2 ring-purple-500/20' 
                  : 'bg-gray-900/50 border-gray-800 hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center group-hover:bg-purple-600/30 transition-colors duration-300 border border-purple-500/30">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Feature Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-800 backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {features[activeFeature].title}
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {features[activeFeature].description}
              </p>
            </div>
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden border border-gray-800"
              >
                <video 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover aspect-video"
                  poster="/images/feature-demo-poster.png"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/videos/feature-demo.mp4" type="video/mp4" />
                  <img 
                    src="/images/feature-demo-poster.png" 
                    alt="Feature Demo"
                    className="w-full h-full object-cover"
                  />
                </video>
                
                {/* Play/Pause Button */}
                <motion.button
                  onClick={togglePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center group hover:bg-black/90 transition-all duration-300"
                >
                  <div className="relative">
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                    {/* Purple shine effect */}
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md group-hover:bg-purple-500/30 transition-all duration-300 scale-0 group-hover:scale-100" />
                  </div>
                </motion.button>

                {/* Fallback if video doesn't load */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center pointer-events-none">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                      <img 
                        src={features[activeFeature].icon} 
                        alt=""
                        className="w-8 h-8"
                      />
                    </div>
                    <p className="text-white font-semibold">{features[activeFeature].title} Demo</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feature;