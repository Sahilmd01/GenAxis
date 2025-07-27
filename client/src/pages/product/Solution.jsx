import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Sparkles, Briefcase, Server, Globe, Shield, BarChart2 } from 'lucide-react';

const solutions = [
  {
    industry: "Marketing & Advertising",
    challenges: [
      "Creating engaging content at scale",
      "Personalizing customer experiences",
      "Measuring campaign effectiveness"
    ],
    ourSolution: "AI-powered content generation and analytics to create, optimize, and measure marketing campaigns.",
    icon: <BarChart2 className="w-8 h-8 text-emerald-600" />
  },
  {
    industry: "E-commerce",
    challenges: [
      "Product description generation",
      "Visual content creation",
      "Customer support automation"
    ],
    ourSolution: "Automated product content creation and AI chatbots to enhance online shopping experiences.",
    icon: <Globe className="w-8 h-8 text-emerald-600" />
  },
  {
    industry: "Healthcare",
    challenges: [
      "Medical documentation",
      "Patient communication",
      "Research analysis"
    ],
    ourSolution: "Secure AI tools for medical transcription, patient education, and research data processing.",
    icon: <Shield className="w-8 h-8 text-emerald-600" />
  }
];

const stats = [
  { value: "3.5x", label: "Faster content creation" },
  { value: "78%", label: "Reduction in manual work" },
  { value: "4.8/5", label: "Customer satisfaction" },
  { value: "99.9%", label: "Accuracy rate" }
];

const Solution = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">Industry Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored AI solutions designed to address specific industry challenges and drive transformation.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/90 border border-emerald-100 rounded-xl p-5 text-center backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solutions */}
        <div className="space-y-8 mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/90 border border-emerald-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-8 bg-gradient-to-br from-emerald-50 to-violet-50 flex flex-col items-center justify-center">
                  <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-sm mb-4">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center">
                    {solution.industry}
                  </h3>
                </div>
                
                <div className="md:w-2/3 p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Key Challenges
                      </h4>
                      <ul className="space-y-3">
                        {solution.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            </div>
                            <p className="text-gray-700">{challenge}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Our Solution
                      </h4>
                      <p className="text-gray-700 mb-4">{solution.ourSolution}</p>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-violet-600 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        Explore Solution
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-emerald-600 to-violet-600 rounded-2xl p-12 text-center shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need a custom solution for your business?
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
            Our AI experts can design tailored solutions to address your specific challenges and goals.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold bg-white text-emerald-600 group relative overflow-hidden shadow-md hover:shadow-lg transition-all"
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-lg">Contact Our Solutions Team</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Solution;