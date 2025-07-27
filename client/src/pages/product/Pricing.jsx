import React from 'react';
import { PricingTable } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Zap, Shield, Clock, HelpCircle } from 'lucide-react';

const Pricing = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-emerald-500" />,
      title: "Instant Activation",
      description: "Get started immediately after payment"
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-500" />,
      title: "Secure Payments",
      description: "All transactions are encrypted and secure"
    },
    {
      icon: <Clock className="w-5 h-5 text-emerald-500" />,
      title: "Flexible Billing",
      description: "Switch plans or cancel anytime"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time."
    },
    {
      question: "Is there a free trial?",
      answer: "The free plan is available indefinitely with basic features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and PayPal."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto z-20 my-30 px-4 pb-20">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
            CUSTOMISE YOUR PLAN ACCORDINGLY
          </span>
        </motion.div>

        <h2 className="text-[42px] font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className="mt-14 max-sm:mx-8">
        <div className="clerk-pricing-wrapper sm:flex sm:justify-center sm:gap-6">
          <PricingTable
            appearance={{
              variables: {
                colorPrimary: 'linear-gradient(to right, #10B981, #7C3AED)',
                colorTextOnPrimaryBackground: '#fff',
                colorTextSecondary: '#6B7280',
                colorBackground: '#fff',
                colorInputBackground: '#fff',
                colorShimmer:
                  'linear-gradient(90deg, transparent, rgba(16,185,129,0.1), transparent)'
              },
              elements: {
                card: {
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E5E7EB'
                },
                badge: {
                  backgroundColor: '#ECFDF5',
                  color: '#065F46'
                },
                button: {
                  background: 'linear-gradient(to right, #10B981, #7C3AED)',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #0EA371, #6D28D9)'
                  }
                },
                footer: {
                  '& + div': {
                    borderTop: '1px solid #E5E7EB'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="mt-24 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-12">
          All plans include
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                {feature.icon}
                <h4 className="font-medium text-gray-900">{feature.title}</h4>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-28 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-12">
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="border-b border-gray-200 pb-6"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 mt-0.5 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">{faq.question}</h4>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block bg-gradient-to-r from-emerald-50 to-violet-50 px-8 py-12 rounded-2xl"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-violet-500 text-white font-medium rounded-lg hover:shadow-lg transition-all">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;