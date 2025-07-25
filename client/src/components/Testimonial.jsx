import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Zap, Sparkles } from 'lucide-react';

const Testimonial = () => {
  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'John Doe',
      title: 'Marketing Director, TechCorp',
      content: 'GenAI has revolutionized our content workflow. The AI tools provide outstanding quality and save us hours of work every week.',
      rating: 4,
      feature: 'AI Article Writer'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Jane Smith',
      title: 'Content Creator, DigitalMedia',
      content: 'The AI Image Generation produces stunning visuals that perfectly match our brand aesthetic. It has transformed our creative process.',
      rating: 5,
      feature: 'AI Image Generation'
    },
    {
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
      name: 'David Lee',
      title: 'CTO, StartupInc',
      content: 'The API integration was seamless and the performance is incredible. We process thousands of images daily with 99.99% uptime.',
      rating: 5,
      feature: 'AI Background Remover'
    },
    {
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200',
      name: 'Sarah Johnson',
      title: 'Product Manager, EnterpriseCo',
      content: 'The enterprise security features give us peace of mind while using GenAI for sensitive client projects. Compliance is flawless.',
      rating: 4,
      feature: 'Enterprise Security'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '99.99%', label: 'Uptime' },
    { value: '50ms', label: 'Response Time' },
  ];

  return (
    <div className="relative px-4 sm:px-20 xl:px-32 py-24 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-200/30"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              TRUSTED BY INDUSTRY LEADERS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Loved</span> by Creators Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users are saying about GenAI.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20 w-full max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
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

        {/* Testimonials */}
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              whileHover={{ y: -5 }}
              className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] p-8 rounded-xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'fill-emerald-500 text-emerald-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-3">"{testimonial.content}"</p>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  {testimonial.feature}
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-emerald-100">
                <img
                  src={testimonial.image}
                  className="w-12 h-12 object-cover rounded-full border-2 border-emerald-100"
                  alt={testimonial.name}
                />
                <div>
                  <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Ready to transform your workflow with AI?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-violet-600 text-white font-medium group"
            >
              Get Started
              <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-emerald-200 text-gray-800 font-medium group"
            >
              <Sparkles className="w-5 h-5 text-violet-500" />
              Request Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;