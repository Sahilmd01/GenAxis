import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Gem, Sparkles, Code, Image, Server, Shield, Globe, Clock, Users, CreditCard } from 'lucide-react';

const Plans = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for individuals and small teams getting started with AI",
      cta: "Get Started",
      popular: false,
      features: [
        "10,000 AI Credits/month",
        "Basic Image Generation",
        "Standard Content Tools",
        "Community Support",
        "5 User Seats"
      ],
      icon: <Sparkles className="w-6 h-6 text-amber-400" />
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "For growing businesses scaling AI across teams",
      cta: "Start Free Trial",
      popular: true,
      features: [
        "50,000 AI Credits/month",
        "Advanced Image Generation",
        "Priority Content Tools",
        "Email Support",
        "15 User Seats",
        "API Access"
      ],
      icon: <Zap className="w-6 h-6 text-amber-400" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Mission-critical AI for large organizations",
      cta: "Contact Sales",
      popular: false,
      features: [
        "Unlimited AI Credits",
        "Premium Image Generation",
        "All Content Tools",
        "24/7 Dedicated Support",
        "Custom User Seats",
        "Advanced API",
        "SOC2 Compliance",
        "Dedicated Infrastructure"
      ],
      icon: <Gem className="w-6 h-6 text-amber-400" />
    }
  ];

  const enterpriseFeatures = [
    { icon: <Server className="w-5 h-5 text-amber-400" />, text: "99.99% Uptime SLA" },
    { icon: <Globe className="w-5 h-5 text-amber-400" />, text: "Global Infrastructure" },
    { icon: <Shield className="w-5 h-5 text-amber-400" />, text: "Military-Grade Security" },
    { icon: <Clock className="w-5 h-5 text-amber-400" />, text: "24/7 Priority Support" },
    { icon: <Users className="w-5 h-5 text-amber-400" />, text: "Dedicated Account Manager" },
    { icon: <CreditCard className="w-5 h-5 text-amber-400" />, text: "Flexible Billing" }
  ];

  return (
    <div className="relative w-full py-24 overflow-hidden bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 opacity-95"></div>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[15%] w-72 h-72 rounded-full bg-amber-500/10 blur-[120px]"
          animate={{ opacity: 0.3, scale: 1.1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[15%] w-80 h-80 rounded-full bg-amber-600/10 blur-[140px]"
          animate={{ opacity: 0.4, scale: 1.15 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
        />
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#fbbf24" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-amber-900/40 border border-amber-800/60 backdrop-blur-sm mx-auto"
        >
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium tracking-widest text-amber-400 uppercase">
            Pricing Plans
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-center mb-4 leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
            Flexible
          </span>
          <span className="text-gray-100"> Pricing for Every Team</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl text-center text-gray-400 max-w-3xl mx-auto mb-16"
        >
          Choose the perfect plan for your needs. Scale up or down as your business grows.
        </motion.p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden ${plan.popular ? 'border-2 border-amber-500/50' : 'border border-gray-800/50'} bg-gray-900/60 backdrop-blur-sm`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-amber-500 text-gray-950 px-4 py-1 text-xs font-bold rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  {plan.icon}
                  <h3 className="text-2xl font-bold text-gray-200">{plan.name}</h3>
                </div>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl font-bold text-amber-400">{plan.price}</span>
                  <span className="text-gray-400 mb-1">{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <button
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium mb-8 transition-all ${plan.popular ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 hover:shadow-lg hover:shadow-amber-500/30' : 'bg-gray-800/70 border border-gray-700 text-gray-200 hover:bg-gray-700/80 hover:border-amber-500/40'}`}
                >
                  {plan.cta}
                  <ChevronRight className="w-4 h-4" />
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-gray-200 mb-4">Enterprise-Grade Features</h3>
              <p className="text-gray-400 mb-6">
                Our Enterprise plan includes everything your organization needs to deploy AI at scale with confidence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {enterpriseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-amber-500/10 p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-amber-400 mb-4">Need Custom Solutions?</h4>
              <p className="text-gray-400 mb-6">
                Contact our sales team to discuss custom pricing, volume discounts, and dedicated infrastructure options.
              </p>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-800/70 border border-gray-700 text-gray-200 hover:bg-gray-700/80 hover:border-amber-500/40 rounded-lg font-medium transition-colors">
                Contact Enterprise Sales
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center text-gray-200 mb-12">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What are AI Credits?",
                answer: "AI Credits are used to measure your usage across our platform. Each AI operation consumes a certain number of credits based on complexity."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Yes, you can change plans at any time. Your subscription will be prorated based on your current billing cycle."
              },
              {
                question: "Is there a free trial available?",
                answer: "The Professional plan includes a 14-day free trial. Enterprise plans can request a custom demo period."
              },
              {
                question: "How is billing handled for teams?",
                answer: "Team plans are billed per organization. You can add or remove users at any time without changing your base plan."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-amber-400 mb-2">{item.question}</h4>
                <p className="text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Plans;