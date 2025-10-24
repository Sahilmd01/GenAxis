import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonialsData = [
  { id: 1, name: "Sarah Johnson", role: "Product Manager", company: "TechCorp", rating: 5, text: "This AI tool has completely transformed our workflow. The efficiency gains are incredible!", userImage: "sarahjohnson.png" },
  { id: 2, name: "Mike Chen", role: "Data Scientist", company: "DataInsights", rating: 5, text: "The accuracy and speed of these AI tools are unmatched. Highly recommended for professionals.", userImage: "mikechen.png" },
  { id: 3, name: "Emily Rodriguez", role: "Creative Director", company: "DesignStudio", rating: 5, text: "Revolutionary tools that have elevated our creative projects to new heights. Absolutely love it!", userImage: "emilyrodriguez.png" },
  { id: 4, name: "David Kim", role: "CTO", company: "StartupXYZ", rating: 5, text: "The ROI we've seen from implementing these tools is phenomenal. Game-changing technology.", userImage: "davidkim.png" },
  { id: 5, name: "Lisa Wang", role: "Marketing Director", company: "GrowthLabs", rating: 5, text: "Our team's productivity has increased by 300%. These tools are worth every penny.", userImage: "lisawang.png" },
  { id: 6, name: "Alex Thompson", role: "Software Engineer", company: "DevOps Inc", rating: 5, text: "The most intuitive and powerful AI tools I've ever used. Integration was seamless.", userImage: "alexthompson.png" }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const updateCards = () =>
      setCardsToShow(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, []);

  const visibleTestimonials = Array.from({ length: cardsToShow }, (_, i) => {
    const index = (currentIndex + i) % testimonialsData.length;
    return { ...testimonialsData[index], position: i };
  });

  const getCardStyle = (position) => {
    if (cardsToShow === 1) return { scale: 1, x: 0 };
    switch (position) {
      case 0:
        return { scale: cardsToShow === 2 ? 0.95 : 0.92, x: cardsToShow === 2 ? -12 : -25 };
      case 1:
        return { scale: cardsToShow === 2 ? 1 : 0.96, x: 0 };
      case 2:
        return { scale: 0.92, x: 25 };
      default:
        return {};
    }
  };

  return (
    <div className="relative py-16 bg-[#F6F6F6] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
      {/* Floating gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 bg-gray-300/20 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-8 sm:bottom-10 right-4 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-gray-400/20 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-2 mb-8">
        <h2 className="text-black text-3xl sm:text-5xl font-bold mb-2">What Our Clients Say</h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Discover how our AI tools are transforming businesses
        </p>
      </div>

      {/* Carousel */}
      <motion.div
        className="relative z-10 flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 max-w-6xl mx-auto"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.x < -50 || velocity.x < -500)
            setCurrentIndex((i) => (i + 1) % testimonialsData.length);
          if (offset.x > 50 || velocity.x > 500)
            setCurrentIndex((i) => (i - 1 + testimonialsData.length) % testimonialsData.length);
        }}
      >
        <AnimatePresence mode="popLayout">
          {visibleTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0.8 }}
              animate={{ ...getCardStyle(i), opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -6, scale: 1.025 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              style={{ willChange: "transform, opacity" }}
              className="group relative bg-black/95 backdrop-blur-sm border-2 border-gray-800 hover:border-purple-400 rounded-2xl p-6 sm:p-7 flex flex-col min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] xl:min-w-[360px] h-[360px] sm:h-[380px] lg:h-[400px] max-w-md flex-1 shadow-xl hover:shadow-[0_12px_32px_rgba(168,85,247,0.25)] transition-all duration-300 overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 overflow-hidden z-0 rounded-2xl pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />
              </div>

              {/* Glow gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/5 group-hover:from-purple-600/3 group-hover:to-purple-600/8 transition-all duration-300 z-0 rounded-2xl pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-1">
                <p className="text-gray-200 text-sm sm:text-base italic mb-5 flex-1 leading-relaxed">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-gray-700 shadow-inner">
                    <img
                      src={`/images/${t.userImage}`}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg">{t.name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {t.role} - {t.company}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center mt-8 gap-1.5">
        {testimonialsData.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex % testimonialsData.length
                ? 'bg-purple-600 w-6 h-1.5'
                : 'bg-gray-500 w-1.5 h-1.5'
            }`}
          />
        ))}
      </div>

      {/* Mobile hint */}
      <div className="lg:hidden relative z-10 text-center mt-6">
        <p className="text-gray-500 text-sm">Swipe left or right to navigate</p>
      </div>
    </div>
  );
};

export default Testimonials;
