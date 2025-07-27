import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Database, Cpu, ChevronDown, ChevronRight } from 'lucide-react';

const documentationSections = [
  {
    title: 'Getting Started',
    icon: <Book className="w-5 h-5 text-emerald-600" />,
    items: [
      'Introduction to GenAI Platform',
      'System Requirements',
      'Installation Guide',
      'First Steps'
    ]
  },
  {
    title: 'API Reference',
    icon: <Code className="w-5 h-5 text-violet-600" />,
    items: [
      'Authentication',
      'Endpoints',
      'Request/Response Formats',
      'Rate Limiting'
    ]
  },
  {
    title: 'AI Models',
    icon: <Cpu className="w-5 h-5 text-purple-600" />,
    items: [
      'Image Generation',
      'Text Processing',
      'Model Architectures',
      'Performance Tuning'
    ]
  },
  {
    title: 'Data Management',
    icon: <Database className="w-5 h-5 text-blue-600" />,
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Documentation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to integrate and maximize our AI platform's potential.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {documentationSections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4 border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white border border-gray-200">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                </div>
                {expandedSection === index ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6"
                >
                  <ul className="py-4 space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-violet-50 rounded-xl p-8 border border-emerald-100">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Need more help?</h3>
          <p className="text-gray-600 mb-6">Our technical support team is available 24/7 to assist you.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-md transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documentation;