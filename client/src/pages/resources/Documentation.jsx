import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { Book, Code, Database, Cpu, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

const documentationSections = [
  {
    title: 'Getting Started',
    icon: <Book className="w-5 h-5 text-purple-400" />,
    items: [
      'Introduction to GenAI Platform',
      'System Requirements',
      'Installation Guide',
      'First Steps'
    ]
  },
  {
    title: 'API Reference',
    icon: <Code className="w-5 h-5 text-purple-400" />,
    items: [
      'Authentication',
      'Endpoints',
      'Request/Response Formats',
      'Rate Limiting'
    ]
  },
  {
    title: 'AI Models',
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    items: [
      'Image Generation',
      'Text Processing',
      'Model Architectures',
      'Performance Tuning'
    ]
  },
  {
    title: 'Data Management',
    icon: <Database className="w-5 h-5 text-purple-400" />,
    items: [
      'Data Formats',
      'Storage Options',
      'Privacy Compliance',
      'Data Retention'
    ]
  }
];

const Documentation = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
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
          DOCUMENTATION
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Everything you need to integrate and maximize our AI platform's potential.
        </motion.p>
      </motion.div>

      {/* Documentation Sections */}
      <div className="max-w-4xl mx-auto mb-28">
        {documentationSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-4 rounded-2xl overflow-hidden border border-gray-800 backdrop-blur-sm bg-gray-900/50"
          >
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-800/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg border border-purple-500/30 group-hover:bg-purple-600/20 transition-colors">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                  {section.title}
                </h3>
              </div>
              {expandedSection === index ? (
                <ChevronDown className="w-5 h-5 text-purple-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              )}
            </button>

            {expandedSection === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 border-t border-gray-800"
              >
                <ul className="py-4 space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:bg-purple-400 transition-colors"></div>
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="px-8 py-12 rounded-2xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-gray-900/80 to-purple-900/20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
          >
            Need more help?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
          >
            Our technical support team is available 24/7 to assist you.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 mx-auto"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-lg">Contact Support</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Documentation;