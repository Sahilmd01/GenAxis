import React from 'react';
import { PricingTable } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle, Zap, Shield, Globe, Infinity } from 'lucide-react';
import Navbar from '../../components/Navbar';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Features data
const features = [
  {
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    title: "High Performance",
    description: "Lightning-fast AI processing with minimal latency for all your content generation needs."
  },
  {
    icon: <Shield className="w-5 h-5 text-purple-400" />,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties. Enterprise-grade security."
  },
  {
    icon: <Globe className="w-5 h-5 text-purple-400" />,
    title: "Global CDN",
    description: "Content delivered through our global network for optimal performance worldwide."
  },
  {
    icon: <Infinity className="w-5 h-5 text-purple-400" />,
    title: "Unlimited Projects",
    description: "Create as many projects as you need with no artificial limits on your creativity."
  }
];

// FAQ data
const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and are prorated."
  },
  {
    question: "Is there a free trial?",
    answer: "All paid plans come with a 14-day free trial. No credit card required to start with our free plan."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime. You'll continue to have access to paid features until the end of your billing cycle."
  }
];

const Pricing = () => {
  return (
    <div className="max-w-7xl mx-auto z-20 my-30 px-4">
      <div className="fixed top-0 left-0 w-full z-50 bg-opacity-70 backdrop-blur-md border-b border-purple-500/10">
        <Navbar />
      </div>
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          CHOOSE YOUR PLAN
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Start for free and scale up as you grow. Find the perfect plan for your AI content creation needs
        </motion.p>
      </div>

      {/* Pricing Table */}
      <div className="mt-14 max-sm:mx-8">
        <div className='mt-14 max-sm:mx-8'>
          <PricingTable />
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-28 mt-20"
      >
        <motion.h3
          variants={itemVariants}
          className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          All Plans Include
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg border border-purple-500/30 group-hover:bg-purple-600/20 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-white group-hover:text-purple-200 transition-colors">
                  {feature.title}
                </h4>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-28"
      >
        <motion.h3
          variants={itemVariants}
          className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <HelpCircle className="w-5 h-5 mt-0.5 text-purple-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-3">{faq.question}</h4>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <div className="px-8 py-12 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
          >
            Still have questions?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
          >
            Our team is here to help you choose the right plan for your specific needs and requirements.
          </motion.p>

        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;