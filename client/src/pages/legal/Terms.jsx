import React from 'react';
import { FileText, Clipboard, Scale, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Terms = () => {
  const sections = [
    {
      title: 'Acceptable Use',
      icon: <Clipboard className="w-5 h-5 text-emerald-600" />,
      points: [
        'Proper use of our services',
        'Prohibited activities',
        'Content guidelines'
      ]
    },
    {
      title: 'Account Terms',
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      points: [
        'Registration requirements',
        'Account security',
        'Termination policy'
      ]
    },
    {
      title: 'Legal Terms',
      icon: <Scale className="w-5 h-5 text-emerald-600" />,
      points: [
        'Limitations of liability',
        'Governing law',
        'Dispute resolution'
      ]
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
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              LEGAL AGREEMENT
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Terms of</span>
            <span className="text-gray-900"> Service</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/90 border border-emerald-100 rounded-xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              
              <ul className="space-y-4">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-gray-600">{point}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            By using our services, you agree to these terms.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3"
          >
            <span>Download Full Terms</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;