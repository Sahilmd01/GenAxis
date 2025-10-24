import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, X, Sparkles, Zap, Shield, Rocket, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClerk, useUser } from '@clerk/clerk-react';

const companies = [
  'google', 'apple', 'microsoft', 'netflix', 'instagram', 'samsung',
  'threads', 'nvidia', 'ibm', 'amazon', 'apple', 'microsoft'
];

const FloatingFeature = ({ icon: Icon, text, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10"
    whileHover={{ 
      scale: 1.05,
      backgroundColor: "rgba(168, 85, 247, 0.1)",
      borderColor: "rgba(168, 85, 247, 0.3)"
    }}
  >
    <Icon className="w-3 h-3 text-purple-400" />
    <span className="text-xs text-white/80 font-medium">{text}</span>
  </motion.div>
);

const Hero = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const backgroundVideoRef = useRef(null);
  const [showDemo, setShowDemo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = backgroundVideoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
      video.addEventListener('error', () => setIsVideoLoaded(false));
    }
  }, []);

  const handleDemoClose = () => {
    setShowDemo(false);
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/ai');
    } else {
      openSignIn();
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Enhanced Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={backgroundVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute min-w-full min-h-full w-auto h-auto object-cover"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
            onEnded={(e) => e.target.play()}
          >
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        
        {/* Enhanced Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(107, 33, 168, 0.2) 50%, rgba(0,0,0,0.5) 100%)'
          }}
        ></div>
        
        {/* Floating Animated Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-purple-500/30 backdrop-blur-sm border border-purple-400/30"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-pink-500/40 backdrop-blur-sm border border-pink-400/30"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-blue-500/50 backdrop-blur-sm"
        />

        {/* Enhanced Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 rounded-full blur-xl md:blur-3xl"
          style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
        />
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 right-1/3 w-40 h-40 md:w-64 md:h-64 rounded-full blur-xl md:blur-3xl"
          style={{ backgroundColor: 'rgba(192, 132, 252, 0.2)' }}
        />
      </div>

      {/* Enhanced Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 xl:py-28">
        {/* Enhanced Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
          className="inline-flex items-center gap-2 mb-8 lg:mb-12 px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#a855f7' }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-medium tracking-wider text-white/90 uppercase"
          >
            Enterprise AI Platform
          </motion.span>
        </motion.div>

        {/* Enhanced Main Heading */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            className="relative inline-block mb-6 lg:mb-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-tight"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-white drop-shadow-2xl bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                GENAXIS
              </span>
            </motion.h1>
            
            {/* Enhanced Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 blur-2xl -z-10 rounded-full scale-110"
              style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.h2
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              Intelligent{' '}
              <motion.span
                animate={{ 
                  filter: [
                    'brightness(1) drop-shadow(0 0 10px rgba(192, 132, 252, 0.4))',
                    'brightness(1.1) drop-shadow(0 0 20px rgba(192, 132, 252, 0.6))',
                    'brightness(1) drop-shadow(0 0 10px rgba(192, 132, 252, 0.4))'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-purple-300 font-semibold"
                style={{ color: '#c084fc' }}
              >
                AI Solutions
              </motion.span>
            </motion.h2>
            
            <motion.p
              className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Transform your workflow with our advanced AI toolkit: Background removal, 
              content creation, image generation, and intelligent analysis tools.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-3 mb-8 lg:mb-12 px-4"
        >
          <FloatingFeature icon={Zap} text="Lightning Fast" delay={1.2} />
          <FloatingFeature icon={Shield} text="Enterprise Security" delay={1.3} />
          <FloatingFeature icon={Rocket} text="AI Powered" delay={1.4} />
          <FloatingFeature icon={Brain} text="Smart Analysis" delay={1.5} />
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center mb-12 lg:mb-16 px-4"
        >
          <div className="max-w-2xl mx-auto">
            <motion.h3
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              Start Your{' '}
              <span className="font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Journey
              </span>
            </motion.h3>
            
            <motion.p
              className="text-white/70 mb-6 lg:mb-8 font-light text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              {isSignedIn 
                ? "Welcome back! Continue your AI journey" 
                : "Join thousands of innovators transforming their digital workflow"
              }
            </motion.p>
            
            {/* Buttons Container */}
            <motion.div
              className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              {/* Get Started Button - Glass Morphism with Neon */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `
                    0 0 40px rgba(192, 132, 252, 0.8),
                    0 0 80px rgba(192, 132, 252, 0.6),
                    0 0 120px rgba(192, 132, 252, 0.4),
                    inset 0 2px 4px rgba(255, 255, 255, 0.4)
                  `,
                  backdropFilter: "blur(20px)",
                  y: -2
                }}
                whileTap={{ scale: 0.95, y: 0 }}
                onClick={handleGetStarted}
                className="relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-500 group overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(168, 85, 247, 0.2) 0%,
                      rgba(192, 132, 252, 0.15) 50%,
                      rgba(147, 51, 234, 0.25) 100%
                    )
                  `,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    0 0 20px rgba(192, 132, 252, 0.4),
                    inset 0 1px 1px rgba(255, 255, 255, 0.2),
                    inset 0 -2px 4px rgba(0, 0, 0, 0.3)
                  `
                }}
              >
                {/* Animated Glass Shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"
                  animate={{
                    x: ['-100%', '200%', '-100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating Particles */}
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1
                  }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-1 -left-1"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  <Sparkles className="w-2 h-2 text-purple-300" />
                </motion.div>
                
                <span className="flex items-center justify-center gap-2 relative z-10 text-white">
                  {isSignedIn ? "Go to AI Dashboard" : "Get Started"}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </span>
              </motion.button>
              
              {/* Watch Demo Button - Glass Morphism with Holographic Effect */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `
                    0 0 30px rgba(59, 130, 246, 0.7),
                    0 0 60px rgba(59, 130, 246, 0.5),
                    inset 0 2px 4px rgba(255, 255, 255, 0.3)
                  `,
                  backdropFilter: "blur(20px)",
                  y: -2
                }}
                whileTap={{ scale: 0.95, y: 0 }}
                onClick={() => setShowDemo(true)}
                className="relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-500 group overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(59, 130, 246, 0.15) 0%,
                      rgba(96, 165, 250, 0.1) 50%,
                      rgba(37, 99, 235, 0.2) 100%
                    )
                  `,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    0 0 15px rgba(59, 130, 246, 0.3),
                    inset 0 1px 1px rgba(255, 255, 255, 0.15),
                    inset 0 -2px 4px rgba(0, 0, 0, 0.4)
                  `
                }}
              >
                {/* Holographic Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                  animate={{
                    x: ['-150%', '150%', '-150%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-transparent"
                  animate={{
                    boxShadow: [
                      "0 0 0 1px rgba(59, 130, 246, 0.3)",
                      "0 0 0 3px rgba(59, 130, 246, 0.2)",
                      "0 0 0 1px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <span className="flex items-center justify-center gap-2 relative z-10 text-white">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </motion.div>
                  Watch Demo
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-center px-4"
        >
          <motion.h4
            className="text-sm sm:text-base font-medium text-white/70 mb-6 lg:mb-10 tracking-wide"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.3 }}
          >
            Trusted by innovative teams
          </motion.h4>
          
          {/* Enhanced Carousel */}
          <div className="relative overflow-hidden py-4 lg:py-6">
            <motion.div
              className="flex gap-8 sm:gap-12 items-center"
              animate={{
                x: [0, -1440]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                }
              }}
            >
              {[...companies, ...companies].map((company, index) => (
                <motion.div
                  key={`${company}-${index}`}
                  whileHover={{ 
                    scale: 1.1,
                    filter: "brightness(1.5)",
                    y: -2,
                    transition: { 
                      type: "spring", 
                      stiffness: 400,
                      damping: 10 
                    }
                  }}
                  className="flex-shrink-0 cursor-pointer"
                >
                  <div className="w-20 h-10 sm:w-24 sm:h-12 lg:w-28 lg:h-14 relative">
                    <img 
                      src={`/logos/${company}.png`} 
                      alt={`${company} logo`}
                      className="w-full h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-20 h-10 sm:w-24 sm:h-12 lg:w-28 lg:h-14 flex items-center justify-center text-white/70 text-xs font-medium border border-white/20 rounded-lg bg-black/20 backdrop-blur-sm';
                        fallback.textContent = company;
                        e.target.parentNode.appendChild(fallback);
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Enhanced Gradient Overlays */}
            <div className="absolute left-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={handleDemoClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ 
                type: "spring", 
                damping: 25,
                stiffness: 300
              }}
              className="relative bg-black/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden w-full max-w-2xl lg:max-w-4xl border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(107, 33, 168, 0.2) 100%)'
              }}
            >
              {/* Enhanced Close Button */}
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(192, 132, 252, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors border border-white/20 backdrop-blur-sm"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>

              {/* Enhanced Video Player */}
              <div className="relative pt-[56.25%] bg-black">
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              </div>

              {/* Enhanced Video Info */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm border-t border-white/10"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  GENAXIS Platform Demo
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  See how our AI platform transforms workflows and boosts productivity
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;