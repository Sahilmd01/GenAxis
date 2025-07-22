import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "CTO, Quantum Innovations",
      content: "This platform revolutionized our R&D process. The quantum-powered image generation reduced our prototyping time by 80% while maintaining exceptional quality.",
      rating: 5,
      avatar: "/avatars/scientist.png"
    },
    {
      id: 2,
      name: "Mark Williams",
      title: "Lead Developer, Nova Systems",
      content: "The code automation features are unlike anything I've seen. We deployed a complete microservice architecture in days instead of weeks. Simply phenomenal.",
      rating: 5,
      avatar: "/avatars/developer.png"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "Creative Director, Stellar Media",
      content: "Our content production has increased 300% without sacrificing quality. The AI understands brand voice better than some human writers we've worked with.",
      rating: 4,
      avatar: "/avatars/designer.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Background variants for animation
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      transition: { 
        duration: 8, 
        repeat: Infinity, 
        repeatType: 'reverse', 
        ease: 'easeInOut' 
      }
    }
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 opacity-95"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-amber-500/10 blur-[100px]"
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
        />
        
        <motion.div
          className="absolute bottom-[25%] right-[15%] w-80 h-80 rounded-full bg-amber-600/10 blur-[120px]"
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        />

        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPattern" width="52" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M26 0 L52 15 L52 45 L26 60 L0 45 L0 15 Z"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-900/40 border border-amber-800/60 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium tracking-widest text-amber-400 uppercase">
              Industry Testimonials
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
              Trusted
            </span>
            <span className="text-gray-100"> by visionaries</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from industry leaders who have transformed their workflows with our platform
          </p>
        </motion.header>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode='wait'>
            <motion.article
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/60 backdrop-blur-md border border-gray-800/80 rounded-2xl p-8 md:p-10 shadow-xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1">
                  <Quote className="w-8 h-8 text-amber-400/60 rotate-180" />
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-xl text-gray-300 mb-8 leading-relaxed">
                {testimonials[currentIndex].content}
              </blockquote>

              <footer className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-400">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </footer>
            </motion.article>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-gray-800/70 border border-gray-700 hover:bg-amber-500/10 hover:border-amber-500/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-amber-400" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-amber-400 w-4' : 'bg-gray-600 hover:bg-gray-500'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-gray-800/70 border border-gray-700 hover:bg-amber-500/10 hover:border-amber-500/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 hover:text-amber-400" />
            </button>
          </div>
        </div>

        {/* Clients Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-6 text-center">
            POWERING INNOVATION AT SCALE
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {['SPACEX', 'GOOGLE X', 'CERN', 'OPENAI', 'MIT'].map((logo) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.1 }}
                className="text-lg font-bold text-gray-600 hover:text-amber-400 transition-colors cursor-default"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;