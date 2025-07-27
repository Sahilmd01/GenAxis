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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Changed to 1024 for better tablet support
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
      }, 100);
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
    { label: 'Careers', path: '/company/careers' },  // Fixed spelling and path
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy', path: '/legal/privacy' },
    { label: 'Terms', path: '/legal/tearms' },       // This matches your filename, but ideally rename to "terms"
    { label: 'Security', path: '/legal/security' },
  ]
};


  // Render navigation button
  const renderNavButton = ({ label, icon: Icon, path }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden group px-3 sm:px-4 lg:px-5 py-2 rounded-lg lg:rounded-xl"
      onClick={() => navigate(path)}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-transparent rounded-lg lg:rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
      <span className="absolute inset-0.5 bg-gradient-to-r from-emerald-500/5 via-violet-500/5 to-transparent rounded-lg lg:rounded-xl border border-emerald-400/30 group-hover:border-emerald-400/50 transition-all duration-300" />
      <span className="relative z-10 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600 text-xs sm:text-sm font-medium">
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-violet-500" />
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
    }, 300); // Reduced delay for better UX
    setDropdownTimeout(timeout);
  };

  // Render dropdown button (desktop)
  const renderDropdownButton = ({ label, items, dropdownKey }) => (
    <div 
      className="relative group"
      onMouseEnter={() => !isMobile && handleDropdownMouseEnter(dropdownKey)}
      onMouseLeave={() => !isMobile && handleDropdownMouseLeave(dropdownKey)}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden group px-3 sm:px-4 lg:px-5 py-2 rounded-lg lg:rounded-xl"
        onClick={() => isMobile && handleMobileDropdownToggle(dropdownKey)}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-transparent rounded-lg lg:rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
        <span className="absolute inset-0.5 bg-gradient-to-r from-emerald-500/5 via-violet-500/5 to-transparent rounded-lg lg:rounded-xl border border-emerald-400/30 group-hover:border-emerald-400/50 transition-all duration-300" />
        <span className="relative z-10 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600 text-xs sm:text-sm font-medium">
          {label}
          <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 ml-0.5 sm:ml-1 text-violet-500 transition-transform ${
            isMobile && mobileDropdownOpen[dropdownKey] ? 'rotate-90' : 'group-hover:translate-x-1'
          }`} />
        </span>
      </motion.button>

      {!isMobile && (
        <AnimatePresence>
          {(hoveredDropdown === dropdownKey) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-56 bg-white border border-emerald-100 rounded-xl shadow-xl p-2 z-50"
              onMouseEnter={() => handleDropdownMouseEnter(dropdownKey)}
              onMouseLeave={() => handleDropdownMouseLeave(dropdownKey)}
            >
              {items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-emerald-800 hover:bg-emerald-50 rounded-lg transition"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );

  // Render mobile dropdown
  const renderMobileDropdown = ({ label, items, dropdownKey }) => (
    <div className="space-y-1">
      <button
        onClick={() => handleMobileDropdownToggle(dropdownKey)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 via-violet-50 to-transparent border border-emerald-100 hover:border-emerald-200 transition-all"
      >
        <span className="text-emerald-800 font-medium text-sm sm:text-base">{label}</span>
        <ChevronRight className={`w-4 h-4 text-emerald-500 transition-transform ${
          mobileDropdownOpen[dropdownKey] ? 'rotate-90' : ''
        }`} />
      </button>

      <AnimatePresence>
        {(mobileDropdownOpen[dropdownKey] || closingDropdown === dropdownKey) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: mobileDropdownOpen[dropdownKey] ? 'auto' : 0,
              opacity: mobileDropdownOpen[dropdownKey] ? 1 : 0
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pl-4 space-y-1"
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
                className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
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
          scrolled ? 'bg-white/95 border-b border-emerald-100 shadow-sm' : 'bg-white/90'
        } backdrop-blur-3xl transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={assets.logo} alt="logo" className="h-8 sm:h-10 w-auto" />
            <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
              GenAxis
            </span>
          </motion.div>

          {!isMobile && (
            <div className="flex items-center space-x-1 sm:space-x-2">
              {navButtons.map(renderNavButton)}
              {renderDropdownButton({ label: 'Product', items: dropdownItems.product, dropdownKey: 'product' })}
              {renderDropdownButton({ label: 'Resources', items: dropdownItems.resources, dropdownKey: 'resources' })}
              {renderDropdownButton({ label: 'Company', items: dropdownItems.company, dropdownKey: 'company' })}
              {renderDropdownButton({ label: 'Legal', items: dropdownItems.legal, dropdownKey: 'legal' })}
            </div>
          )}

          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-8 h-8 sm:w-9 sm:h-9 border border-emerald-200 shadow-lg shadow-emerald-100/50',
                    userButtonPopoverCard: 'bg-white border border-emerald-100 shadow-xl',
                    userButtonPopoverActionButton: 'hover:bg-emerald-50',
                  },
                }}
              />
            ) : (
              <motion.button
                onClick={openSignIn}
                className="flex items-center gap-1 sm:gap-2 rounded-lg lg:rounded-xl font-medium cursor-pointer bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-xs sm:text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{isMobile ? 'Start' : 'Get Started'}</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-all" />
              </motion.button>
            )}
            {isMobile && (
              <motion.button
                className="relative p-1.5 sm:p-2 rounded-lg lg:rounded-xl focus:outline-none group"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  )}
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

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
              className="fixed top-0 left-0 w-72 sm:w-80 h-full bg-gradient-to-b from-white to-emerald-50 z-40 border-r border-emerald-100 shadow-2xl shadow-emerald-100/50 flex flex-col"
            >
              <div className="p-4 sm:p-6 border-b border-emerald-100 flex justify-between items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                >
                  <img src={assets.logo} alt="logo" className="h-8 sm:h-10 w-auto" />
                  <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                    GenAxis
                  </span>
                </motion.div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 sm:p-1.5 rounded-lg lg:rounded-xl hover:bg-emerald-100 transition"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </button>
              </div>

              <div className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto">
                {navButtons.map(({ label, icon, path }) => (
                  <motion.button
                    key={label}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(path);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 via-violet-50 to-transparent border border-emerald-100 hover:border-emerald-200 transition-all group"
                  >
                    <div className="flex items-center">
                      {React.createElement(icon, { className: 'w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-emerald-500' })}
                      <span className="text-sm sm:text-base text-emerald-800 font-medium">{label}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}

                {renderMobileDropdown({ label: 'Product', items: dropdownItems.product, dropdownKey: 'product' })}
                {renderMobileDropdown({ label: 'Resources', items: dropdownItems.resources, dropdownKey: 'resources' })}
                {renderMobileDropdown({ label: 'Company', items: dropdownItems.company, dropdownKey: 'company' })}
                {renderMobileDropdown({ label: 'Legal', items: dropdownItems.legal, dropdownKey: 'legal' })}
              </div>

              <div className="p-4 sm:p-6 border-t border-emerald-100">
                {!user ? (
                  <motion.button
                    onClick={() => {
                      openSignIn();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-1 sm:gap-2 rounded-lg lg:rounded-xl font-medium cursor-pointer bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Get Started</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ) : (
                  <div className="flex justify-center">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: 'w-9 h-9 sm:w-10 sm:h-10 border border-emerald-200 shadow-lg shadow-emerald-100/50',
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