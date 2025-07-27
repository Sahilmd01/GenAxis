import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Zap, ChevronRight, Sparkles, Code, Image, FileText, Mic, Settings } from 'lucide-react';

const demos = [
  {
    id: 'image-gen',
    title: "Image Generation",
    description: "See how our AI creates stunning visuals from text prompts",
    icon: <Image className="w-6 h-6 text-emerald-600" />
  },
  {
    id: 'doc-process',
    title: "Document Processing",
    description: "Watch how we extract and analyze document content",
    icon: <FileText className="w-6 h-6 text-emerald-600" />
  },
  {
    id: 'audio-trans',
    title: "Audio Transcription",
    description: "Experience real-time speech-to-text conversion",
    icon: <Mic className="w-6 h-6 text-emerald-600" />
  }
];

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState(demos[0].id);

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">Interactive Demos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our AI capabilities firsthand with these interactive demonstrations.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Demo Selector */}
          <div className="lg:w-1/3">
            <div className="space-y-4">
              {demos.map((demo) => (
                <motion.div
                  key={demo.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`p-5 rounded-xl cursor-pointer transition-all ${
                    activeDemo === demo.id
                      ? 'bg-white shadow-lg border border-emerald-100'
                      : 'bg-white/70 border border-gray-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      activeDemo === demo.id
                        ? 'bg-gradient-to-r from-emerald-100 to-violet-100'
                        : 'bg-gray-100'
                    }`}>
                      {demo.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{demo.title}</h3>
                      <p className="text-sm text-gray-600">{demo.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-violet-600 text-white group relative overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <Code className="w-5 h-5" />
              <span>View API Integration</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </motion.button>
          </div>

          {/* Demo Display */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-emerald-100">
              <div className="bg-gray-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-300 font-mono">
                  {demos.find(d => d.id === activeDemo)?.title} Demo
                </div>
                <div className="w-8"></div>
              </div>
              
              <div className="p-8">
                <div className="bg-gray-100 rounded-lg aspect-video flex flex-col items-center justify-center mb-6">
                  <div className="bg-white p-8 rounded-full mb-6 shadow-inner">
                    <Play className="w-12 h-12 text-emerald-600 fill-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {demos.find(d => d.id === activeDemo)?.title} Interactive Demo
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Click play to experience this feature
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                    <h4 className="font-medium text-emerald-800 mb-2">How it works</h4>
                    <p className="text-sm text-gray-700">
                      Our AI processes your input in real-time using advanced algorithms to deliver accurate results.
                    </p>
                  </div>
                  <div className="bg-violet-50/50 p-4 rounded-lg border border-violet-100">
                    <h4 className="font-medium text-violet-800 mb-2">Use Cases</h4>
                    <p className="text-sm text-gray-700">
                      Perfect for content creators, developers, and businesses looking to automate workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;