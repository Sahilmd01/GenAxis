import React from 'react';
import { Shield, Database, EyeOff, User, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';

const Privacy = () => {
  const privacyPrinciples = [
    {
      title: 'Data Minimization',
      icon: <Database className="w-5 h-5 text-purple-400" />,
      description: 'We only collect what we need to provide our services'
    },
    {
      title: 'Transparency',
      icon: <EyeOff className="w-5 h-5 text-purple-400" />,
      description: 'Clear explanations of how we use your data'
    },
    {
      title: 'User Control',
      icon: <User className="w-5 h-5 text-purple-400" />,
      description: 'Easy-to-use tools to manage your preferences'
    }
  ];

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
        >
          <Shield className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">YOUR PRIVACY MATTERS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          PRIVACY POLICY
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          We're committed to protecting your personal information and being transparent about our practices.
        </motion.p>
      </motion.div>

      {/* Privacy Principles */}
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28"
      >
        {privacyPrinciples.map((principle, index) => (
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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg border border-purple-500/30 group-hover:bg-purple-600/20 transition-colors">
                {principle.icon}
              </div>
              <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xl">
                {principle.title}
              </h3>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              {principle.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Detailed Sections */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-28"
      >
        <div className="p-8 rounded-2xl border border-gray-800 backdrop-blur-sm bg-gray-900/50">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl lg:text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Data Collection & Use
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-400" />
                Information We Collect
              </h4>
              <ul className="space-y-3">
                {[
                  'Account information (name, email, etc.)',
                  'Service usage data and analytics',
                  'Device and browser information'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-400 hover:text-gray-300 transition-colors">
                    <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-400" />
                How We Use Your Data
              </h4>
              <ul className="space-y-3">
                {[
                  'To provide and improve our services',
                  'For security and fraud prevention',
                  'To communicate with you about our services'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-400 hover:text-gray-300 transition-colors">
                    <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
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
        <div className="px-8 py-12 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
          >
            Have questions about our privacy practices?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
          >
            Contact our Data Protection Officer for any privacy-related inquiries.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 mx-auto group"
          >
            <Shield className="w-5 h-5" />
            <span className="text-lg">Contact Privacy Team</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;