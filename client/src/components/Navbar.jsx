import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Gem, Sparkles, Menu, X } from 'lucide-react';
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
    { label: 'About', icon: Sparkles, path: '/about' },
    { label: 'Contact', icon: Sparkles, path: '/contact' },
    { label: 'Ai Tools', icon: Sparkles, path: '/ai-tolls' },
  ];

  const renderNavButton = ({ label, icon: Icon, path }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden group px-4 py-2 rounded-full"
      onClick={() => navigate(path)}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-amber-600/20 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-all duration-300" />
      <span className="absolute inset-0.5 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent rounded-full border border-amber-400/30 group-hover:border-amber-400/50 transition-all duration-300" />
      <span className="relative z-10 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 text-sm font-medium">
        <Icon className="w-4 h-4 mr-2 text-amber-300" />
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
          scrolled ? 'bg-gray-950/95 border-b border-amber-500/20' : 'bg-gray-950/80'
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
            {!user && !isMobile && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-3 px-2 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 flex items-center"
              >
                <Gem className="w-3 h-3 text-amber-400 mr-1" />
                <span className="text-xs font-medium text-amber-300">PREMIUM</span>
              </motion.div>
            )}
          </motion.div>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              {navButtons.map(renderNavButton)}
            </div>
          )}

          {/* User Area */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                {!isMobile && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent border border-amber-400/30 text-amber-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                    onClick={() => navigate('/upgrade')}
                  >
                    <Gem className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Upgrade</span>
                  </motion.button>
                )}
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-8 h-8 sm:w-10 sm:h-10 border border-amber-400/40 shadow-lg shadow-amber-500/10',
                      userButtonPopoverCard: 'bg-gray-900 border border-amber-500/20',
                    },
                  }}
                />
              </>
            ) : (
              <motion.button
                onClick={openSignIn}
                className="flex items-center gap-1 sm:gap-2 rounded-full font-medium cursor-pointer bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-gray-950 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{isMobile ? 'Start' : 'Get Started'}</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-all" />
              </motion.button>
            )}
            {isMobile && (
              <motion.button
                className="relative p-2 rounded-md focus:outline-none group"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-amber-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-amber-400" />
                  ) : (
                    <>
                      <Menu className="w-6 h-6 text-amber-400" />
                      {!user && <Gem className="absolute -top-1 -right-1 w-3 h-3 text-amber-300" />}
                    </>
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
              className="fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-gray-950 to-gray-950/95 z-40 border-r border-amber-500/30 shadow-2xl shadow-amber-500/10 flex flex-col"
            >
              <div className="p-6 border-b border-amber-500/20 flex justify-between items-center">
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
                  {!user && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-3 px-2 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 flex items-center"
                    >
                      <Gem className="w-3 h-3 text-amber-400 mr-1" />
                      <span className="text-xs font-medium text-amber-300">PREMIUM</span>
                    </motion.div>
                  )}
                </motion.div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-amber-500/10 transition">
                  <X className="w-5 h-5 text-amber-400" />
                </button>
              </div>

              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {navButtons.map(({ label, icon, path }) => (
                  <motion.button
                    key={label}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(path);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500/5 via-amber-600/5 to-transparent border border-amber-400/20 hover:border-amber-400/40 transition-all group"
                  >
                    <div className="flex items-center">
                      {React.createElement(icon, { className: 'w-4 h-4 mr-3 text-amber-300' })}
                      <span className="text-amber-100 font-medium">{label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
                {user && renderNavButton({ label: 'Upgrade', icon: Gem, path: '/upgrade' })}
              </div>

              <div className="p-6 border-t border-amber-500/20">
                {!user ? (
                  <motion.button
                    onClick={() => {
                      openSignIn();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full font-medium cursor-pointer bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-gray-950 px-6 py-3 text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ) : (
                  <div className="flex justify-center">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: 'w-10 h-10 border border-amber-400/40 shadow-lg shadow-amber-500/10',
                          userButtonPopoverCard: 'bg-gray-900 border border-amber-500/20',
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
