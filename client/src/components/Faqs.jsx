import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, Zap } from 'lucide-react';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const faqData = [
    {
      question: "How do I access the AI tools?",
      answer: "Simply create an account and log in to access our full suite of AI tools. Each tool is designed to be intuitive and user-friendly, with no technical expertise required."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for all new users. You'll have full access to all features during this period with no credit card required."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 customer support through live chat, email, and comprehensive documentation. Our team is always ready to help you get the most out of our tools."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time without any hidden fees or complicated processes. Your access will continue until the end of your billing period."
    },
    {
      question: "Are my data and files secure?",
      answer: "Security is our top priority. We use enterprise-grade encryption and comply with industry standards to ensure your data remains safe and confidential at all times."
    },
    {
      question: "Do you offer custom solutions for businesses?",
      answer: "Yes, we provide custom AI solutions tailored to your business needs. Contact our enterprise team to discuss your specific requirements and scale."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayedFaqs = showAllFaqs ? faqData : faqData.slice(0, 4);

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-20 bg-black relative overflow-hidden">
      {/* Floating gradient elements - purple/blue theme for dark background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          FAQs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Find answers to common questions about our AI tools and services
        </motion.p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-2/5"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden shadow-lg shadow-purple-500/10 border border-purple-500/10"
              >
                <img
                  src="/faq-image.jpg"
                  alt="FAQ Illustration"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = '/images/faqs.png';
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                className="absolute -top-2 -right-2 bg-purple-600/15 backdrop-blur-sm border border-purple-500/15 rounded-lg p-2 shadow-md"
              >
                <Zap className="w-5 h-5 text-purple-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
                className="absolute -bottom-2 -left-2 bg-blue-600/15 backdrop-blur-sm border border-blue-500/15 rounded-lg p-2 shadow-md"
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - FAQs */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-3/5 w-full"
          >
            <div className="space-y-2">
              {displayedFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    className="p-4 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/20 shadow-md hover:shadow-[0_5px_15px_rgba(168,85,247,0.1)] transition-all duration-200 cursor-pointer overflow-hidden relative"
                    onClick={() => toggleFAQ(index)}
                    whileHover={{ scale: 1.005 }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 overflow-hidden z-0 rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 -translate-x-full group-hover:translate-x-full group-hover:duration-800" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500/10 rounded-md flex items-center justify-center shadow-sm backdrop-blur-sm border border-purple-500/15 transition-all duration-200 group-hover:scale-102 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:border-purple-400/30">
                            <HelpCircle className="w-4 h-4 text-purple-400" />
                          </div>
                          <h3 className="text-base font-medium text-white group-hover:text-purple-100 transition-colors duration-200 pr-3">
                            {faq.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.15 }}
                          className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center border border-gray-600 group-hover:border-purple-500/30 group-hover:bg-purple-500/5 transition-all duration-200 flex-shrink-0"
                        >
                          <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <motion.p
                              initial={{ opacity: 0, y: -3 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15, delay: 0.05 }}
                              className="text-gray-300 text-sm leading-relaxed mt-3 pl-11 border-t border-gray-700/30 pt-3"
                            >
                              {faq.answer}
                            </motion.p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* View All FAQs Button */}
            {!showAllFaqs && faqData.length > 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-5"
              >
                <button
                  onClick={() => setShowAllFaqs(true)}
                  className="px-8 py-2.5 rounded-full text-sm font-medium
               text-white bg-black border border-neutral-800
               shadow-sm transition-all duration-300
               hover:bg-neutral-100 hover:text-black 
               hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]
               hover:border-purple-400"
                >
                  View All FAQs
                </button>
              </motion.div>

            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mt-10"
      >
        <p className="text-gray-400 text-sm mb-6">
          Still have questions? We're here to help!
        </p>
      </motion.div>
    </div>
  );
};

export default Faqs;