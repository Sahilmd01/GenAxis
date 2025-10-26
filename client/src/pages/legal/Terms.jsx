import React from 'react';
import { FileText, Clipboard, Scale, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';

const Terms = () => {
  const sections = [
    {
      title: 'Acceptable Use',
      icon: <Clipboard className="w-5 h-5 text-purple-400" />,
      points: [
        'Proper use of our services',
        'Prohibited activities',
        'Content guidelines'
      ]
    },
    {
      title: 'Account Terms',
      icon: <FileText className="w-5 h-5 text-purple-400" />,
      points: [
        'Registration requirements',
        'Account security',
        'Termination policy'
      ]
    },
    {
      title: 'Legal Terms',
      icon: <Scale className="w-5 h-5 text-purple-400" />,
      points: [
        'Limitations of liability',
        'Governing law',
        'Dispute resolution'
      ]
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
          <FileText className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">LEGAL AGREEMENT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          TERMS OF SERVICE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>
      </motion.div>

      {/* Content Sections */}
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
        className="space-y-8 mb-28"
      >
        {sections.map((section, index) => (
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
            className="p-8 rounded-2xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group bg-gray-900/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg border border-purple-500/30 group-hover:bg-purple-600/20 transition-colors">
                {section.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                {section.title}
              </h2>
            </div>

            <ul className="space-y-4">
              {section.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                    <ChevronRight className="w-3 h-3 text-purple-400" />
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-lg leading-relaxed">
                    {point}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
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
            By using our services, you agree to these terms.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
          >
            Download the complete terms of service document for detailed information.
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
            <FileText className="w-5 h-5" />
            <span className="text-lg">Download Full Terms</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;