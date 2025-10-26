import React from 'react';
import { Lock, ShieldCheck, Key, Cpu, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';

const Security = () => {
  const features = [
    {
      title: 'Encryption',
      icon: <Lock className="w-5 h-5 text-purple-400" />,
      description: 'All data encrypted in transit and at rest'
    },
    {
      title: 'Access Control',
      icon: <Key className="w-5 h-5 text-purple-400" />,
      description: 'Role-based permissions and 2FA enforcement'
    },
    {
      title: 'Infrastructure',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      description: 'Enterprise-grade secure cloud hosting'
    }
  ];

  const certifications = [
    'SOC 2 Type II',
    'ISO 27001',
    'GDPR Compliant',
    'CCPA Ready'
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
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">ENTERPRISE SECURITY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          SECURITY STANDARDS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Our commitment to protecting your data with industry-leading security practices.
        </motion.p>
      </motion.div>

      {/* Features */}
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
        {features.map((feature, index) => (
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
                {feature.icon}
              </div>
              <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xl">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Certifications */}
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
            className="text-2xl lg:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Compliance & Certifications
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-300 font-medium hover:bg-purple-500/20 transition-all duration-300"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Security Practices */}
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
            className="text-2xl lg:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Our Security Practices
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              'Regular third-party security audits and penetration testing',
              '24/7 security monitoring and incident response',
              'Employee security training and background checks'
            ].map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                  <ChevronRight className="w-3 h-3 text-purple-400" />
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {practice}
                </p>
              </motion.div>
            ))}
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
            Need detailed security documentation for your compliance team?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
          >
            Request our comprehensive security brief and compliance documentation.
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
            <ShieldCheck className="w-5 h-5" />
            <span className="text-lg">Request Security Brief</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Security;