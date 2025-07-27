import React from 'react';
import { Lock, ShieldCheck, Key, Cpu, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Security = () => {
  const features = [
    {
      title: 'Encryption',
      icon: <Lock className="w-5 h-5 text-emerald-600" />,
      description: 'All data encrypted in transit and at rest'
    },
    {
      title: 'Access Control',
      icon: <Key className="w-5 h-5 text-emerald-600" />,
      description: 'Role-based permissions and 2FA enforcement'
    },
    {
      title: 'Infrastructure',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
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
              <ShieldCheck className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              ENTERPRISE SECURITY
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Security</span>
            <span className="text-gray-900"> Standards</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Our commitment to protecting your data with industry-leading security practices.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
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
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white/90 border border-emerald-100 rounded-xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span>Compliance & Certifications</span>
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-700 font-medium"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Security Practices</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-gray-600">Regular third-party security audits and penetration testing</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-gray-600">24/7 security monitoring and incident response</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-gray-600">Employee security training and background checks</p>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            Need detailed security documentation for your compliance team?
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3"
          >
            <span>Request Security Brief</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Security;