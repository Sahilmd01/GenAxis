import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Gem, 
  Crown,
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
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
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Lightning Response",
      description: "Guaranteed 15-minute response time for all enterprise clients"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: "Dedicated Security",
      description: "Military-grade encryption and compliance with all industry standards"
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-amber-400" />,
      title: "Performance Metrics",
      description: "Real-time analytics dashboard for your AI solutions"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gray-950 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-500/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      {/* Cursor-following Logo */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: position.x - 40,
          y: position.y - 40,
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.5
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-1 shadow-lg shadow-amber-500/30">
          <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="GenAxis Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-amber-900/30 border border-amber-500/30 shadow-lg shadow-amber-500/10">
            <Crown className="w-5 h-5 text-amber-400 mr-2" />
            <span className="text-sm font-medium text-amber-300">PLATINUM ENTERPRISE SUPPORT</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
            Contact Our Executive Team
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Reach out to our premium support specialists for immediate assistance or discuss enterprise solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-900/10 to-gray-900/50 border border-amber-500/20 shadow-lg shadow-amber-500/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-amber-200">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-amber-400 animate-pulse"></span>
              Executive Contact Details
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Email */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-amber-500/10 rounded-lg sm:rounded-xl transition-all duration-300 border border-amber-500/20 bg-gradient-to-r from-amber-900/10 to-transparent"
              >
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-amber-300/80">Priority Email</p>
                  <a
                    href="mailto:support@genaxis.ai"
                    className="text-sm sm:text-base font-medium hover:text-amber-300 text-amber-400 transition-colors"
                  >
                    support@genaxis.ai
                  </a>
                </div>
              </motion.div>
              
              {/* Phone */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-amber-500/10 rounded-lg sm:rounded-xl transition-all duration-300 border border-amber-500/20 bg-gradient-to-r from-amber-900/10 to-transparent"
              >
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-amber-300/80">24/7 Dedicated Line</p>
                  <a
                    href="tel:+18005551234"
                    className="text-sm sm:text-base font-medium hover:text-amber-300 text-amber-400 transition-colors"
                  >
                    +1 (800) GEN-AXIS
                  </a>
                </div>
              </motion.div>
              
              {/* Location */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-amber-500/10 rounded-lg sm:rounded-xl transition-all duration-300 border border-amber-500/20 bg-gradient-to-r from-amber-900/10 to-transparent"
              >
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-amber-300/80">Global Headquarters</p>
                  <span className="text-sm sm:text-base font-medium text-amber-400">
                    123 AI Plaza, San Francisco
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8">
              <h4 className="font-medium mb-3 sm:mb-4 text-xs sm:text-sm text-amber-300/80">Connect With Our Leadership</h4>
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
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 transition-all duration-300 border border-amber-500/20"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            <div className="mt-8 pt-6 border-t border-amber-500/20">
              <h4 className="text-lg font-semibold text-amber-200 mb-4 flex items-center gap-2">
                <Gem className="w-5 h-5 text-amber-400" />
                Enterprise Benefits
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                  Dedicated account manager with direct line
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                  Guaranteed 15-minute response time
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                  Custom AI solutions and white-glove onboarding
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                  Priority access to new features and beta programs
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                  SLA-backed uptime and performance guarantees
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gray-900/50 border border-amber-500/20 shadow-lg shadow-amber-500/10 backdrop-blur-sm"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-amber-200">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-amber-400 animate-pulse"></span>
              Send Us a Priority Message
            </h3>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping"></div>
                    <Sparkles className="w-8 h-8 text-amber-400 relative" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-amber-300 mb-2">Message Received!</h4>
                <p className="text-gray-300">Our executive team will contact you within 15 minutes.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 px-6 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs sm:text-sm font-medium text-amber-300/80"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-amber-500/30 bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all text-sm sm:text-base text-gray-200 placeholder-gray-500"
                    placeholder="John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs sm:text-sm font-medium text-amber-300/80"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-amber-500/30 bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all text-sm sm:text-base text-gray-200 placeholder-gray-500"
                    placeholder="john@yourcompany.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs sm:text-sm font-medium text-amber-300/80"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-amber-500/30 bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all resize-none text-sm sm:text-base text-gray-200 placeholder-gray-500"
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
                    bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium 
                    hover:opacity-90 transition-all duration-300 shadow-lg shadow-amber-500/30 
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              Why Choose GenAxis Enterprise?
            </h2>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto">
              Our premium solutions are designed for organizations that demand the highest level of performance, security, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                className={`p-6 sm:p-8 rounded-xl sm:rounded-2xl border ${activeFeature === index ? 'border-amber-500/50 bg-gradient-to-br from-amber-900/20 to-gray-900/50' : 'border-gray-800 bg-gray-900/30'} shadow-lg ${activeFeature === index ? 'shadow-amber-500/20' : 'shadow-transparent'} transition-all duration-500`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-amber-300 mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <Globe className="w-6 h-6 text-amber-400" />, value: "150+", label: "Countries Served" },
              { icon: <Users className="w-6 h-6 text-amber-400" />, value: "1,200+", label: "Enterprise Clients" },
              { icon: <Clock className="w-6 h-6 text-amber-400" />, value: "99.99%", label: "Uptime SLA" },
              { icon: <ShieldCheck className="w-6 h-6 text-amber-400" />, value: "256-bit", label: "Encryption" }
            ].map((stat, index) => (
              <div key={index} className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-amber-900/10 to-gray-900/30 border border-amber-500/20 text-center">
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-300">{stat.value}</p>
                <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-900/10 to-gray-900/50 border border-amber-500/20 shadow-lg shadow-amber-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-amber-900/30 border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-xs font-medium text-amber-300">TRUSTED BY INDUSTRY LEADERS</span>
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium text-gray-200 mb-6">
              "GenAxis's enterprise support transformed our AI capabilities. Their 24/7 dedicated team and custom solutions gave us a competitive edge we couldn't find elsewhere."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-amber-300">Sarah Johnson</p>
                <p className="text-sm text-gray-400">CTO, Fortune 500 Company</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;