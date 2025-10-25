import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Youtube, Linkedin, Star, Users, ThumbsUp, UserPlus, ChevronRight } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'github',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/yourusername',
      label: 'Star us on GitHub',
      color: 'hover:text-gray-400'
    },
    {
      name: 'instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://instagram.com/yourusername',
      label: 'Follow on Instagram',
      color: 'hover:text-pink-400'
    },
    {
      name: 'youtube',
      icon: <Youtube className="w-5 h-5" />,
      url: 'https://youtube.com/yourchannel',
      label: 'Subscribe on YouTube',
      color: 'hover:text-red-400'
    },
    {
      name: 'linkedin',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/in/yourprofile',
      label: 'Connect on LinkedIn',
      color: 'hover:text-blue-400'
    }
  ];

  const quickLinks = [
    { name: 'AI Tools', path: '/tools' },
    { name: 'Use Cases', path: '/usecases' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Documentation', path: '/docs' }
  ];

  const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Status', path: '/status' },
    { name: 'API Reference', path: '/api' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Top Section with CTA */}
      <div className="relative bg-[#F6F6F6]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
              READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">TRANSFORM</span> YOUR WORKFLOW?
            </h2>
            <p className="text-gray-600 text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of professionals already using our AI tools to boost their productivity and creativity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-2xl font-semibold border-2 border-purple-400 hover:border-purple-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 backdrop-blur-sm"
            >
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2 inline" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Video Background Section - Starts from Get Started button */}
      <div className="relative">
        {/* Background Video - Full width and height */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/footer.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content Over Video */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column - Updated with logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-black/95 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-800 shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 overflow-hidden">
                    <img
                      src="/logo.png"
                      alt="GenAxis Logo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center bg-purple-500/20">
                      <span className="text-white font-bold text-lg">AI</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                      GenAxis
                    </span>
                    <p className="text-gray-400 text-sm">Premium AI Solutions</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  Building the next generation of AI tools to empower creators, developers, and businesses worldwide.
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 text-gray-400 transition-all duration-300 ${social.color} hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links - Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 shadow-xl hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)] transition-all duration-300">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                  <ChevronRight className="w-5 h-5 text-purple-300 mr-2" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.path}
                        className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-3 group-hover:animate-pulse"></span>
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Support - Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 shadow-xl hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)] transition-all duration-300">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                  <Users className="w-5 h-5 text-purple-300 mr-2" />
                  Support
                </h3>
                <ul className="space-y-3">
                  {supportLinks.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.path}
                        className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-3 group-hover:animate-pulse"></span>
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Newsletter - Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 shadow-xl hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)] transition-all duration-300">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                  <Star className="w-5 h-5 text-purple-300 mr-2" />
                  Stay Updated
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest updates on new features and tools.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-300 transition-colors backdrop-blur-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300 backdrop-blur-sm"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/80 text-sm">
                © {new Date().getFullYear()} GenAxis AI. All rights reserved.
              </p>
              <p className="text-white/80 text-sm">
                © Developed by Sahil with ❤️
              </p>
              <div className="flex gap-6 text-sm">
                <motion.a
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  href="/terms"
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Terms of Service
                </motion.a>
                <motion.a
                  href="/cookies"
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Cookies
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Footer;