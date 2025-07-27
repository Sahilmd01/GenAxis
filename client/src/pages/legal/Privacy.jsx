import React from 'react';
import { Shield, Database, EyeOff, User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Privacy = () => {
  const privacyPrinciples = [
    {
      title: 'Data Minimization',
      icon: <Database className="w-5 h-5 text-emerald-600" />,
      description: 'We only collect what we need to provide our services'
    },
    {
      title: 'Transparency',
      icon: <EyeOff className="w-5 h-5 text-emerald-600" />,
      description: 'Clear explanations of how we use your data'
    },
    {
      title: 'User Control',
      icon: <User className="w-5 h-5 text-emerald-600" />,
      description: 'Easy-to-use tools to manage your preferences'
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              YOUR PRIVACY MATTERS
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Privacy</span>
            <span className="text-gray-900"> Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            We're committed to protecting your personal information and being transparent about our practices.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {privacyPrinciples.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/90 border border-emerald-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{principle.title}</h3>
              </div>
              <p className="text-gray-600">{principle.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="bg-white/90 border border-emerald-100 rounded-xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-600" />
            <span>Data Collection & Use</span>
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-emerald-50 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Information We Collect</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Account information (name, email, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Service usage data and analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Device and browser information</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">How We Use Your Data</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>To provide and improve our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>For security and fraud prevention</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>To communicate with you about our services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            Have questions about our privacy practices? Contact our Data Protection Officer.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3"
          >
            <span>Contact Privacy Team</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;