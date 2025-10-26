import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Zap, ChevronRight, Sparkles, Cpu, Database, Globe, Shield, Clipboard } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const endpoints = [
  {
    name: 'Image Generation',
    method: 'POST',
    path: '/api/v1/images/generate',
    description: 'Generate AI images from text prompts with customizable parameters.',
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
  },
  {
    name: 'Background Removal',
    method: 'POST',
    path: '/api/v1/images/remove-background',
    description: 'Remove backgrounds from images with high precision.',
    icon: <Database className="w-5 h-5 text-purple-400" />,
  },
  {
    name: 'Object Removal',
    method: 'POST',
    path: '/api/v1/images/remove-object',
    description: 'Remove unwanted objects from images seamlessly.',
    icon: <Globe className="w-5 h-5 text-purple-400" />,
  },
  {
    name: 'Text Analysis',
    method: 'POST',
    path: '/api/v1/text/analyze',
    description: 'Analyze and process text content with AI models.',
    icon: <Shield className="w-5 h-5 text-purple-400" />,
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
    <div className="max-w-7xl mx-auto z-20 my-30 px-4">
      <div className="fixed top-0 left-0 w-full z-50 bg-opacity-70 backdrop-blur-md border-b border-purple-500/10">
        <Navbar />
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          GENAXIS API
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Powerful, scalable API endpoints to integrate AI capabilities directly into your applications.
        </motion.p>
      </motion.div>

      {/* API Endpoints */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28"
      >
        {endpoints.map((endpoint, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5
                }
              }
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group bg-gray-900/50"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg border border-purple-500/30 group-hover:bg-purple-600/20 transition-colors">
                {endpoint.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xl">
                    {endpoint.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${endpoint.method === 'POST'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                    {endpoint.method}
                  </span>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4 leading-relaxed">
                  {endpoint.description}
                </p>
                <div className="bg-gray-800/50 rounded-lg p-3 font-mono text-sm text-gray-300 overflow-x-auto border border-gray-700">
                  {endpoint.path}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Code Sample Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-28"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Code Samples
        </motion.h3>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl p-1 border border-gray-700">
            {['javascript', 'python', 'curl'].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === lang
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="flex items-center justify-between bg-gray-800/80 px-6 py-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 font-mono text-sm">{endpoints[0].path}</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-xl text-sm text-gray-300 hover:bg-gray-600/50 transition-all duration-300 border border-gray-600 hover:border-purple-500/30"
            >
              <Clipboard className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <pre className="p-8 overflow-x-auto text-gray-100 font-mono text-sm leading-relaxed bg-gradient-to-br from-gray-900 to-gray-800">
            {codeSamples[activeTab]}
          </pre>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="px-8 py-16 rounded-2xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-gray-900/80 to-purple-900/20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
          >
            Ready to integrate AI into your application?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
          >
            Get started with our API today and unlock the power of AI for your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group"
            >
              <Zap className="w-5 h-5" />
              <span className="text-lg">Get API Key</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/documentation')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 border border-gray-600 text-white font-semibold rounded-xl hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 group"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-lg">View Documentation</span>
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Api;