import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Gem, 
  ShieldCheck,
  Zap,
  Clock,
  Globe,
  Users,
  BarChart2,
  Instagram,
  Linkedin,
  Send,
  Twitter,
  Github,
  Loader2
} from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const spring = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, spring);
  const cursorYSpring = useSpring(cursorY, spring);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const move = e => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const enter = e => e.target.closest('button, a') && setIsHoveringButton(true);
    const leave = () => setIsHoveringButton(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xwpbojaj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const premiumFeatures = [
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: "Lightning Response",
      description: "Guaranteed 15-minute response time for all enterprise clients"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Dedicated Security",
      description: "Military-grade encryption and compliance with all industry standards"
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-emerald-400" />,
      title: "Performance Metrics",
      description: "Real-time analytics dashboard for your AI solutions"
    }
  ];

  // Generate floating particles
  const floatingParticles = [...Array(20)].map((_, i) => {
    const size = Math.random() * 10 + 5;
    return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-emerald-400/20 to-violet-400/20"
        initial={{
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          width: size,
          height: size,
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
    );
  });

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <Navbar />
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />
      
      {/* Contact Image - Positioned in the bottom right corner */}
      <div className="absolute right-0 bottom-0 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl opacity-20 lg:opacity-30 z-0">
        <img 
          src="/contact.png" 
          alt="Contact illustration" 
          className="w-full h-auto"
        />
      </div>

<motion.div
  className="fixed z-50 pointer-events-none"
  style={{
    x: cursorXSpring,
    y: cursorYSpring,
    translateX: '-50%',
    translateY: '-50%',
  }}
  animate={{
    scale: isHoveringButton ? 1.5 : 1,
    opacity: isHoveringButton ? 0.9 : 0.7,
  }}
  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
>
  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_12px_#0ff]">
    {/* Inner pulse on hover */}
    {isHoveringButton && (
      <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-50"></div>
    )}
  </div>
</motion.div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              PREMIUM ENTERPRISE SUPPORT
            </span>
            <div className="ml-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">24/7</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">Contact Our</span>
              <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900">Executive Team</span>
            </h1>
            <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700 max-w-4xl mx-auto">
              Reach out to our premium support specialists for immediate assistance or discuss enterprise solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Information Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-gradient-to-r from-emerald-400 to-violet-400 animate-pulse"></span>
              Executive Contact Details
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Email */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gradient-to-r from-emerald-50/50 to-violet-50/50 rounded-lg sm:rounded-xl transition-all duration-300 border border-emerald-100 bg-white/50"
              >
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-100 to-violet-100 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500">Priority Email</p>
                  <a
                    href="mailto:support@genaxis.ai"
                    className="text-sm sm:text-base font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-600 hover:to-violet-600 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-violet-700 transition-colors"
                  >
                    support@genaxis.ai
                  </a>
                </div>
              </motion.div>
              
              {/* Phone */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gradient-to-r from-emerald-50/50 to-violet-50/50 rounded-lg sm:rounded-xl transition-all duration-300 border border-emerald-100 bg-white/50"
              >
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-100 to-violet-100 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500">24/7 Dedicated Line</p>
                  <a
                    href="tel:+18005551234"
                    className="text-sm sm:text-base font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-600 hover:to-violet-600 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-violet-700 transition-colors"
                  >
                    +1 (800) GEN-AXIS
                  </a>
                </div>
              </motion.div>
              
              {/* Location */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gradient-to-r from-emerald-50/50 to-violet-50/50 rounded-lg sm:rounded-xl transition-all duration-300 border border-emerald-100 bg-white/50"
              >
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-100 to-violet-100 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500">Global Headquarters</p>
                  <span className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-violet-700">
                    123 AI Plaza, San Francisco
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8">
              <h4 className="font-medium mb-3 sm:mb-4 text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500">Connect With Our Leadership</h4>
              <div className="flex gap-2 sm:gap-3">
                {[
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/company/genaxis",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter",
                    url: "#",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    url: "https://github.com/genaxis",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    url: "https://www.instagram.com/genaxis",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-100 to-violet-100 hover:from-emerald-200 hover:to-violet-200 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 hover:from-emerald-700 hover:to-violet-700 transition-all duration-300 border border-emerald-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            <div className="mt-8 pt-6 border-t border-emerald-100">
              <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 mb-4 flex items-center gap-2">
                <Gem className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500" />
                Enterprise Benefits
              </h4>
              <ul className="space-y-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-800">
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  Dedicated account manager with direct line
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  Guaranteed 15-minute response time
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  Custom AI solutions and white-glove onboarding
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  Priority access to new features and beta programs
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                  SLA-backed uptime and performance guarantees
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-gradient-to-r from-emerald-400 to-violet-400 animate-pulse"></span>
              Send Us a Priority Message
            </h3>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-violet-500/20 animate-ping"></div>
                    <Sparkles className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 relative" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 mb-2">Message Received!</h4>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700">Our executive team will contact you within 15 minutes.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-200 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 hover:from-emerald-200 hover:to-violet-200 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs sm:text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all text-sm sm:text-base text-gray-800 placeholder-gray-400"
                    placeholder="John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs sm:text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all text-sm sm:text-base text-gray-800 placeholder-gray-400"
                    placeholder="john@yourcompany.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs sm:text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all resize-none text-sm sm:text-base text-gray-800 placeholder-gray-400"
                    placeholder="Tell us about your enterprise needs..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-xl 
                    bg-gradient-to-r from-emerald-600 to-violet-600 text-white font-medium 
                    hover:opacity-90 transition-all duration-300 shadow-lg shadow-emerald-500/30 
                    text-sm sm:text-base ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Priority Message
                      <Send size={16} className="sm:size-[18px]" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Enterprise Features Section */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              Why Choose GenAxis Enterprise?
            </h2>
            <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700 max-w-4xl mx-auto">
              Our premium solutions are designed for organizations that demand the highest level of performance, security, and support.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeFeature === index ? 1 : 0.7,
                  y: activeFeature === index ? 0 : 10,
                  scale: activeFeature === index ? 1.02 : 1
                }}
                transition={{ duration: 0.5 }}
                className={`p-6 sm:p-8 rounded-xl sm:rounded-2xl border ${activeFeature === index ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-50 to-white' : 'border-emerald-100 bg-white'} shadow-lg ${activeFeature === index ? 'shadow-emerald-500/20' : 'shadow-sm'} transition-all duration-500`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 mb-2">{feature.title}</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { icon: <Globe className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600" />, value: "150+", label: "Countries Served" },
              { icon: <Users className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600" />, value: "1,200+", label: "Enterprise Clients" },
              { icon: <Clock className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600" />, value: "99.99%", label: "Uptime SLA" },
              { icon: <ShieldCheck className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600" />, value: "256-bit", label: "Encryption" }
            ].map((stat, index) => (
              <div key={index} className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 text-center">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">{stat.value}</p>
                <p className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonial Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-lg"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm"
            >
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center mr-2">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
              <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">TRUSTED BY INDUSTRY LEADERS</span>
            </motion.div>
            <blockquote className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-800 mb-6">
              "GenAxis's enterprise support transformed our AI capabilities. Their 24/7 dedicated team and custom solutions gave us a competitive edge we couldn't find elsewhere."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-200 flex items-center justify-center">
                <Users className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600" />
              </div>
              <div>
                <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Sarah Johnson</p>
                <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-600">CTO, Fortune 500 Company</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles}
      </div>
    </div>
  );
};

export default Contact;