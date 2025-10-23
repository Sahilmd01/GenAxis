import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Menu, X, Globe, Info, Contact } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({
    product: false,
    resources: false,
    company: false,
    legal: false
  });
  const [closingDropdown, setClosingDropdown] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  // Handle dropdown closing animation
  useEffect(() => {
    if (closingDropdown) {
      const timer = setTimeout(() => {
        setMobileDropdownOpen(prev => ({
          ...prev,
          [closingDropdown]: false
        }));
        setClosingDropdown(null);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [closingDropdown]);

  // Handle scroll and resize events
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setShowNavbar(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };

    const handleResize = () => {
      const isNowMobile = window.innerWidth < 1024;
      setIsMobile(isNowMobile);
      if (!isNowMobile) {
        setMobileMenuOpen(false);
        setMobileDropdownOpen({
          product: false,
          resources: false,
          company: false,
          legal: false
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  // Navigation items
  const navButtons = [
    { label: 'Home', icon: Globe, path: '/' },
    { label: 'About', icon: Info, path: '/about' },
    { label: 'Contact us', icon: Contact, path: '/contact' },
  ];

  // Dropdown items
  const dropdownItems = {
    product: [
      { label: 'Features', path: '/product/feature' },
      { label: 'Solutions', path: '/product/solution' },
      { label: 'Pricing', path: '/product/pricing' },
      { label: 'Demo', path: '/product/demo' },
    ],
    resources: [
      { label: 'Documentation', path: '/resources/documentation' },
      { label: 'API Reference', path: '/resources/api' },
      { label: 'Blog', path: '/resources/blog' },
    ],
    company: [
      { label: 'About', path: '/about' },
      { label: 'Careers', path: '/company/careers' },
      { label: 'Contact', path: '/contact' },
    ],
    legal: [
      { label: 'Privacy', path: '/legal/privacy' },
      { label: 'Terms', path: '/legal/terms' },
      { label: 'Security', path: '/legal/security' },
    ]
  };

  // Glass morphism navigation button
  const renderNavButton = ({ label, icon: Icon, path }) => (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden group px-4 py-2.5 rounded-2xl backdrop-blur-sm border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-xl"
      onClick={() => navigate(path)}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <span className="relative z-10 flex items-center text-white text-sm font-medium">
        <Icon className="w-4 h-4 mr-2 text-blue-300" />
        {label}
      </span>
    </motion.button>
  );

  // Toggle mobile dropdown
  const handleMobileDropdownToggle = (dropdownKey) => {
    if (mobileDropdownOpen[dropdownKey]) {
      setClosingDropdown(dropdownKey);
    } else {
      setMobileDropdownOpen(prev => ({
        ...prev,
        [dropdownKey]: true
      }));
    }
  };

  // Handle desktop dropdown hover
  const handleDropdownMouseEnter = (dropdownKey) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setHoveredDropdown(dropdownKey);
  };

  // Handle desktop dropdown leave
  const handleDropdownMouseLeave = (dropdownKey) => {
    const timeout = setTimeout(() => {
      setHoveredDropdown(null);
    }, 300);
    setDropdownTimeout(timeout);
  };

  // Glass morphism dropdown button
  const renderDropdownButton = ({ label, items, dropdownKey }) => (
    <div 
      className="relative group"
      onMouseEnter={() => !isMobile && handleDropdownMouseEnter(dropdownKey)}
      onMouseLeave={() => !isMobile && handleDropdownMouseLeave(dropdownKey)}
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden group px-4 py-2.5 rounded-2xl backdrop-blur-sm border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-xl"
        onClick={() => isMobile && handleMobileDropdownToggle(dropdownKey)}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-700" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <span className="relative z-10 flex items-center text-white text-sm font-medium">
          {label}
          <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${
            isMobile && mobileDropdownOpen[dropdownKey] ? 'rotate-90' : 'group-hover:rotate-90'
          }`} />
        </span>
      </motion.button>

      {!isMobile && (
        <AnimatePresence>
          {(hoveredDropdown === dropdownKey) && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 mt-3 w-56 backdrop-blur-2xl bg-black/30 border border-white/20 rounded-2xl shadow-2xl p-2 z-50"
              onMouseEnter={() => handleDropdownMouseEnter(dropdownKey)}
              onMouseLeave={() => handleDropdownMouseLeave(dropdownKey)}
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />
              
              {items.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(item.path)}
                  className="relative w-full text-left px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 group overflow-hidden"
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                  <span className="relative z-10 text-sm">{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );

  // Glass morphism mobile dropdown
  const renderMobileDropdown = ({ label, items, dropdownKey }) => (
    <div className="space-y-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleMobileDropdownToggle(dropdownKey)}
        className="w-full flex items-center justify-between p-4 rounded-2xl backdrop-blur-sm border border-white/20 bg-white/10 text-white transition-all duration-500"
      >
        <span className="font-medium text-sm">{label}</span>
        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
          mobileDropdownOpen[dropdownKey] ? 'rotate-90' : ''
        }`} />
      </motion.button>

      <AnimatePresence>
        {(mobileDropdownOpen[dropdownKey] || closingDropdown === dropdownKey) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: mobileDropdownOpen[dropdownKey] ? 'auto' : 0,
              opacity: mobileDropdownOpen[dropdownKey] ? 1 : 0
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pl-4 space-y-2"
          >
            {items.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl backdrop-blur-sm border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed z-50 w-full ${
          scrolled 
            ? 'backdrop-blur-2xl bg-black/20 border-b border-white/10 shadow-2xl' 
            : 'backdrop-blur-2xl bg-gradient-to-b from-black/40 to-transparent'
        } transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Animated Logo */}
          <motion.div
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer group relative"
            onClick={() => navigate('/')}
          >
            {/* Logo glow effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-2xl">
              <img src={assets.logo} alt="GenAxis" className="h-8 w-auto filter brightness-0 invert" />
            </div>
            
            <div className="ml-4 relative">
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                GenAxis
              </span>
              {/* Underline animation */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-2">
              {navButtons.map(renderNavButton)}
              {renderDropdownButton({ label: 'Product', items: dropdownItems.product, dropdownKey: 'product' })}
              {renderDropdownButton({ label: 'Resources', items: dropdownItems.resources, dropdownKey: 'resources' })}
              {renderDropdownButton({ label: 'Company', items: dropdownItems.company, dropdownKey: 'company' })}
              {renderDropdownButton({ label: 'Legal', items: dropdownItems.legal, dropdownKey: 'legal' })}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                {/* User button glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-10 h-10 border-2 border-white/30 backdrop-blur-sm shadow-2xl relative z-10',
                      userButtonPopoverCard: 'backdrop-blur-2xl bg-black/30 border border-white/20 shadow-2xl rounded-2xl',
                    },
                  }}
                />
              </div>
            ) : (
              <motion.button
                onClick={openSignIn}
                className="flex items-center gap-2 rounded-2xl font-medium cursor-pointer relative group px-6 py-3 text-sm transition-all duration-500 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform group-hover:scale-105 transition-transform duration-500" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                {/* Inner glow */}
                <div className="absolute inset-1 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 flex items-center text-white font-semibold">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            )}
            
            {isMobile && (
              <motion.button
                className="relative p-2.5 rounded-2xl backdrop-blur-sm border border-white/20 bg-white/10 focus:outline-none group transition-all duration-500"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Button glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-white" />
                  )}
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Glass Morphism Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-3xl z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-80 h-full z-50 flex flex-col backdrop-blur-3xl bg-black/40 border-r border-white/10 shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-2xl">
                    <img src={assets.logo} alt="GenAxis" className="h-8 w-auto filter brightness-0 invert" />
                  </div>
                  <span className="ml-3 text-xl font-bold text-white">GenAxis</span>
                </motion.div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl backdrop-blur-sm border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Content */}
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
                    className="w-full flex items-center justify-between p-4 rounded-2xl backdrop-blur-sm border border-white/20 bg-white/10 text-white transition-all duration-500 group"
                  >
                    <div className="flex items-center">
                      {React.createElement(icon, { className: 'w-4 h-4 mr-3 text-blue-300' })}
                      <span className="font-medium text-sm">{label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                ))}

                {renderMobileDropdown({ label: 'Product', items: dropdownItems.product, dropdownKey: 'product' })}
                {renderMobileDropdown({ label: 'Resources', items: dropdownItems.resources, dropdownKey: 'resources' })}
                {renderMobileDropdown({ label: 'Company', items: dropdownItems.company, dropdownKey: 'company' })}
                {renderMobileDropdown({ label: 'Legal', items: dropdownItems.legal, dropdownKey: 'legal' })}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                {!user ? (
                  <motion.button
                    onClick={() => {
                      openSignIn();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl font-medium cursor-pointer relative group px-6 py-4 text-sm transition-all duration-500 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <span className="relative z-10 flex items-center text-white font-semibold">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Started
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                ) : (
                  <div className="flex justify-center">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: 'w-12 h-12 border-2 border-white/30 backdrop-blur-sm shadow-2xl',
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