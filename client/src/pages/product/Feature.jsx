import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Sparkles, Layers, Palette, Image, Edit3, Type, FileText } from 'lucide-react';

const features = [
  {
    title: "AI Image Generation",
    description: "Create stunning visuals from text descriptions with our state-of-the-art image generation models.",
    icon: <Image className="w-6 h-6 text-emerald-600" />,
    highlights: [
      "Multiple art styles",
      "High-resolution output",
      "Customizable parameters"
    ]
  },
  {
    title: "Content Enhancement",
    description: "Automatically improve and optimize your written content with AI-powered suggestions.",
    icon: <Edit3 className="w-6 h-6 text-emerald-600" />,
    highlights: [
      "Grammar correction",
      "Style improvements",
      "SEO optimization"
    ]
  },
  {
    title: "Document Processing",
    description: "Extract, analyze, and process information from documents with intelligent automation.",
    icon: <FileText className="w-6 h-6 text-emerald-600" />,
    highlights: [
      "PDF/text extraction",
      "Data categorization",
      "Key point summarization"
    ]
  }
];

const Feature = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">Powerful Features</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the comprehensive capabilities of our AI platform designed to transform your workflow.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              onClick={() => setActiveFeature(index)}
              className={`bg-white/90 border rounded-xl p-6 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer ${
                activeFeature === index 
                  ? 'border-emerald-300 ring-2 ring-emerald-200/50' 
                  : 'border-emerald-100'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Active Feature Showcase */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-emerald-50 to-violet-50 rounded-2xl p-8 md:p-12 border border-emerald-100"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{features[activeFeature].title}</h2>
              <p className="text-gray-700 mb-6 text-lg">{features[activeFeature].description}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-violet-600 text-white group relative overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>Try {features[activeFeature].title}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </motion.button>
            </div>
            <div className="flex-1 bg-white rounded-xl p-4 shadow-md border border-emerald-100">
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center p-6">
                  <Layers className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">{features[activeFeature].title} Demo Preview</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feature;