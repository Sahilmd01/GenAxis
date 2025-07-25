import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import * as Icons from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 700 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 700 });

  useEffect(() => {
    const interval = setInterval(() => setActiveFeature(prev => (prev + 1) % 3), 3000);
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xwpbojaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      icon: <Icons.Zap className="w-6 h-6 text-emerald-400" />,
      title: "Lightning Response",
      description: "Guaranteed 15-minute response time for all enterprise clients"
    },
    {
      icon: <Icons.ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Dedicated Security",
      description: "Military-grade encryption and compliance with all industry standards"
    },
    {
      icon: <Icons.BarChart2 className="w-6 h-6 text-emerald-400" />,
      title: "Performance Metrics",
      description: "Real-time analytics dashboard for your AI solutions"
    }
  ];

  const stats = [
    { icon: <Icons.Globe className="w-6 h-6 text-emerald-600" />, value: "150+", label: "Countries Served" },
    { icon: <Icons.Users className="w-6 h-6 text-emerald-600" />, value: "1,200+", label: "Enterprise Clients" },
    { icon: <Icons.Clock className="w-6 h-6 text-emerald-600" />, value: "99.99%", label: "Uptime SLA" },
    { icon: <Icons.ShieldCheck className="w-6 h-6 text-emerald-600" />, value: "256-bit", label: "Encryption" }
  ];

  const socialLinks = [
    { icon: Icons.Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/genaxis" },
    { icon: Icons.Twitter, label: "Twitter", url: "#" },
    { icon: Icons.Github, label: "GitHub", url: "https://github.com/genaxis" },
    { icon: Icons.Instagram, label: "Instagram", url: "https://www.instagram.com/genaxis" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />
      <div className="absolute right-0 bottom-0 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl opacity-20 lg:opacity-30 z-0">
        <img src="/contact.png" alt="Contact illustration" className="w-full h-auto" />
      </div>

      <motion.div
        className="fixed z-50 pointer-events-none"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHoveringButton ? 1.5 : 1, opacity: isHoveringButton ? 0.9 : 0.7 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_12px_#0ff]">
          {isHoveringButton && <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-50"></div>}
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
              <Icons.Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              PREMIUM ENTERPRISE SUPPORT
            </span>
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
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Reach out to our premium support specialists for immediate assistance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-emerald-600">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-emerald-400 animate-pulse"></span>
              Executive Contact Details
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <ContactItem icon={<Icons.Mail className="h-5 w-5" />} title="Priority Email" value="support@genaxis.ai" />
              <ContactItem icon={<Icons.Phone className="h-5 w-5" />} title="24/7 Dedicated Line" value="+1 (800) GEN-AXIS" />
              <ContactItem icon={<Icons.MapPin className="h-5 w-5" />} title="Global Headquarters" value="123 AI Plaza, San Francisco" />
            </div>

            <div className="pt-6 sm:pt-8">
              <h4 className="font-medium mb-3 sm:mb-4 text-xs sm:text-sm text-emerald-500">Connect With Our Leadership</h4>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <SocialLink key={index} icon={social.icon} url={social.url} label={social.label} />
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-100">
              <h4 className="text-lg font-semibold text-emerald-600 mb-4 flex items-center gap-2">
                <Icons.Gem className="w-5 h-5 text-emerald-500" />
                Enterprise Benefits
              </h4>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Dedicated account manager with direct line",
                  "Guaranteed 15-minute response time",
                  "Custom AI solutions and white-glove onboarding",
                  "Priority access to new features and beta programs",
                  "SLA-backed uptime and performance guarantees"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Icons.Sparkles className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-emerald-600">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-emerald-400 animate-pulse"></span>
              Send Us a Priority Message
            </h3>

            {submitSuccess ? (
              <SuccessMessage onReset={() => setSubmitSuccess(false)} />
            ) : (
              <ContactForm 
                formData={formData} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                isSubmitting={isSubmitting} 
              />
            )}
          </motion.div>
        </div>

        <EnterpriseFeatures features={premiumFeatures} stats={stats} />
      </div>
    </div>
  );
};

// Reusable Components
const ContactItem = ({ icon, title, value }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center gap-4 p-4 hover:bg-emerald-50/50 rounded-xl transition-all border border-emerald-100 bg-white/50"
  >
    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">{icon}</div>
    <div>
      <p className="text-xs sm:text-sm text-emerald-500">{title}</p>
      <span className="text-sm sm:text-base font-medium text-gray-800">{value}</span>
    </div>
  </motion.div>
);

const SocialLink = ({ icon: Icon, url, label }) => (
  <motion.a
    whileHover={{ y: -3 }}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-700 transition-all border border-emerald-200"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </motion.a>
);

const SuccessMessage = ({ onReset }) => (
  <div className="text-center py-8">
    <div className="inline-flex items-center justify-center mb-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
        <Icons.Sparkles className="w-8 h-8 text-emerald-500 relative" />
      </div>
    </div>
    <h4 className="text-xl font-semibold text-emerald-600 mb-2">Message Received!</h4>
    <p className="text-gray-600">Our executive team will contact you within 15 minutes.</p>
    <button
      onClick={onReset}
      className="mt-6 px-6 py-2 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-600 hover:bg-emerald-200 transition-colors"
    >
      Send Another Message
    </button>
  </div>
);

const ContactForm = ({ formData, onChange, onSubmit, isSubmitting }) => (
  <form className="space-y-6" onSubmit={onSubmit}>
    <FormInput 
      id="name" 
      name="name" 
      label="Your Name" 
      value={formData.name} 
      onChange={onChange} 
      placeholder="John Smith" 
    />
    <FormInput 
      id="email" 
      name="email" 
      type="email" 
      label="Your Email" 
      value={formData.email} 
      onChange={onChange} 
      placeholder="john@yourcompany.com" 
    />
    <FormTextArea 
      id="message" 
      name="message" 
      label="Your Message" 
      value={formData.message} 
      onChange={onChange} 
      placeholder="Tell us about your enterprise needs..." 
    />
    <SubmitButton isSubmitting={isSubmitting} />
  </form>
);

const FormInput = ({ id, name, type = 'text', label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-emerald-600">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-800 placeholder-gray-400"
      placeholder={placeholder}
    />
  </div>
);

const FormTextArea = ({ id, name, label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-emerald-600">{label}</label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      rows={5}
      className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-800 placeholder-gray-400"
      placeholder={placeholder}
    />
  </div>
);

const SubmitButton = ({ isSubmitting }) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-violet-600 text-white font-medium shadow-lg shadow-emerald-500/30 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
  >
    {isSubmitting ? (
      <>
        <Icons.Loader2 className="h-5 w-5 animate-spin" />
        Sending...
      </>
    ) : (
      <>
        Send Priority Message
        <Icons.Send size={18} />
      </>
    )}
  </motion.button>
);

const EnterpriseFeatures = ({ features, stats }) => (
  <div className="mt-20">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-emerald-600">
        Why Choose GenAxis Enterprise?
      </h2>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto">
        Our premium solutions are designed for organizations that demand the highest level of performance.
      </p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          index={index}
          feature={feature}
        />
      ))}
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </motion.div>
  </div>
);

const FeatureCard = ({ index, feature }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: 1,
      y: 0,
      scale: 1.02
    }}
    transition={{ duration: 0.5 }}
    className="p-8 rounded-2xl border border-emerald-100 bg-white shadow-lg"
  >
    <div className="mb-4">{feature.icon}</div>
    <h3 className="text-xl font-bold text-emerald-600 mb-2">{feature.title}</h3>
    <p className="text-gray-700">{feature.description}</p>
  </motion.div>
);

const StatCard = ({ stat }) => (
  <div className="p-6 rounded-xl bg-white border border-emerald-100 text-center">
    <div className="flex justify-center mb-2">{stat.icon}</div>
    <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
    <p className="text-sm sm:text-base text-gray-700">{stat.label}</p>
  </div>
);

export default Contact;