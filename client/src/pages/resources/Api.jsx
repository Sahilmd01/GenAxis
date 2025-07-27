import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Zap, ChevronRight, Sparkles, Cpu, Database, Globe, Shield, Clipboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const endpoints = [
  {
    name: 'Image Generation',
    method: 'POST',
    path: '/api/v1/images/generate',
    description: 'Generate AI images from text prompts with customizable parameters.',
    icon: <Cpu className="w-5 h-5 text-emerald-600" />,
  },
  {
    name: 'Background Removal',
    method: 'POST',
    path: '/api/v1/images/remove-background',
    description: 'Remove backgrounds from images with high precision.',
    icon: <Database className="w-5 h-5 text-emerald-600" />,
  },
  {
    name: 'Object Removal',
    method: 'POST',
    path: '/api/v1/images/remove-object',
    description: 'Remove unwanted objects from images seamlessly.',
    icon: <Globe className="w-5 h-5 text-emerald-600" />,
  },
  {
    name: 'Text Analysis',
    method: 'POST',
    path: '/api/v1/text/analyze',
    description: 'Analyze and process text content with AI models.',
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
  },
];

const codeSamples = {
  javascript: `// JavaScript Example
const response = await fetch('https://api.genaxis.ai/api/v1/images/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: 'A futuristic city at sunset',
    width: 1024,
    height: 768,
    style: 'photorealistic'
  })
});`,
  python: `# Python Example
import requests

response = requests.post(
  'https://api.genaxis.ai/api/v1/images/generate',
  headers={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  json={
    'prompt': 'A futuristic city at sunset',
    'width': 1024,
    'height': 768,
    'style': 'photorealistic'
  }
)`,
  curl: `# cURL Example
curl -X POST https://api.genaxis.ai/api/v1/images/generate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "prompt": "A futuristic city at sunset",
    "width": 1024,
    "height": 768,
    "style": "photorealistic"
  }'`
};

const Api = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">GenAxis</span>
            <span className="text-gray-900"> API</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful, scalable API endpoints to integrate AI capabilities directly into your applications.
          </p>
        </motion.div>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {endpoints.map((endpoint, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/90 border border-emerald-100 rounded-xl p-6 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                  {endpoint.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{endpoint.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      endpoint.method === 'POST' 
                        ? 'bg-violet-100 text-violet-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm text-gray-700 overflow-x-auto">
                    {endpoint.path}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Sample Section */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Code Samples</h2>
            <div className="flex items-center gap-2">
              {['javascript', 'python', 'curl'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === lang
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/90 border border-emerald-100 text-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between bg-gray-800 px-6 py-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 font-mono text-sm">{endpoints[0].path}</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-600 transition-colors"
              >
                <Clipboard className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-gray-100 font-mono text-sm">
              {codeSamples[activeTab]}
            </pre>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-emerald-600 to-violet-600 rounded-2xl p-8 md:p-12 text-center shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to integrate AI into your application?</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
            Get started with our API today and unlock the power of AI for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold bg-white text-emerald-600 group relative overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <Zap className="w-5 h-5" />
              <span className="text-lg">Get API Key</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/documentation')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold bg-white/10 text-white border border-white/20 group relative overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-lg">View Documentation</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Api;