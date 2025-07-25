import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Menu, X, Zap, Database, Globe, Shield, Info, Phone, Contact } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setShowNavbar(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };

    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  const navButtons = [
    { label: 'About', icon: Info, path: '/about' },
    { label: 'Contact us', icon: Contact, path: '/contact' },
    // { label: 'Global Network', icon: Globe, path: '/' },
    // { label: 'Security', icon: Shield, path: '/' },
  ];

  const renderNavButton = ({ label, icon: Icon, path }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden group px-5 py-2.5 rounded-xl"
      onClick={() => navigate(path)}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-transparent rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
      <span className="absolute inset-0.5 bg-gradient-to-r from-emerald-500/5 via-violet-500/5 to-transparent rounded-xl border border-emerald-400/30 group-hover:border-emerald-400/50 transition-all duration-300" />
      <span className="relative z-10 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600 text-sm font-medium">
        <Icon className="w-4 h-4 mr-2 text-violet-500" />
        {label}
      </span>
    </motion.button>
  );

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed z-50 w-full ${
          scrolled ? 'bg-white/95 border-b border-emerald-100 shadow-sm' : 'bg-white/90'
        } backdrop-blur-3xl transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={assets.logo} alt="logo" className="h-10 sm:h-12 w-auto" />
            <span className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 hidden sm:block">
              GenAxis 
            </span>
          </motion.div>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="flex items-center space-x-2">
              {navButtons.map(renderNavButton)}
            </div>
          )}

          {/* User Area */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-9 h-9 sm:w-10 sm:h-10 border border-emerald-200 shadow-lg shadow-emerald-100/50',
                    userButtonPopoverCard: 'bg-white border border-emerald-100 shadow-xl',
                    userButtonPopoverActionButton: 'hover:bg-emerald-50',
                  },
                }}
              />
            ) : (
              <motion.button
                onClick={openSignIn}
                className="flex items-center gap-2 rounded-xl font-medium cursor-pointer bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-5 py-2.5 text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="w-4 h-4" />
                <span>{isMobile ? 'Start' : 'Get Started'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
              </motion.button>
            )}
            {isMobile && (
              <motion.button
                className="relative p-2 rounded-xl focus:outline-none group"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Menu className="w-6 h-6 text-emerald-600" />
                  )}
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-white to-emerald-50 z-40 border-r border-emerald-100 shadow-2xl shadow-emerald-100/50 flex flex-col"
            >
              <div className="p-6 border-b border-emerald-100 flex justify-between items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                >
                  <img src={assets.logo} alt="logo" className="h-10 w-auto" />
                  <span className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                    GenAxis
                  </span>
                </motion.div>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-1.5 rounded-xl hover:bg-emerald-100 transition"
                >
                  <X className="w-5 h-5 text-emerald-600" />
                </button>
              </div>

              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {navButtons.map(({ label, icon, path }) => (
                  <motion.button
                    key={label}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(path);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-violet-50 to-transparent border border-emerald-100 hover:border-emerald-200 transition-all group"
                  >
                    <div className="flex items-center">
                      {React.createElement(icon, { className: 'w-4 h-4 mr-3 text-emerald-500' })}
                      <span className="text-emerald-800 font-medium">{label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>

              <div className="p-6 border-t border-emerald-100">
                {!user ? (
                  <motion.button
                    onClick={() => {
                      openSignIn();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl font-medium cursor-pointer bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-6 py-3.5 text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Sparkles className="w-4 h-4" />
                    <span>Get Started</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ) : (
                  <div className="flex justify-center">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: 'w-10 h-10 border border-emerald-200 shadow-lg shadow-emerald-100/50',
                          userButtonPopoverCard: 'bg-white border border-emerald-100 shadow-xl',
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
