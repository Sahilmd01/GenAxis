import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Menu, X, User } from 'lucide-react';
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  // Handle scroll and resize events
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setShowNavbar(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Handle GitHub navigation
  const handleGitHubClick = () => {
    window.open('https://github.com/sahilmd01/GenAxis', '_blank', 'noopener,noreferrer');
  };

  // Navigation items for right side
  const rightNavItems = [
    { 
      label: 'Star us', 
      path: 'https://github.com/Sahilmd01/GenAxis',
      external: true,
      icon: '/github.png'
    },
    { label: 'About', path: '/about', external: false },
    { label: 'Contact us', path: '/contact', external: false },
  ];

  // Dropdown items for left side
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
      { 
        label: 'Blog', 
        path: 'https://blogni.vercel.app',
        external: true 
      },
    ],
    company: [
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
    legal: [
      { label: 'Privacy', path: '/legal/privacy' },
      { label: 'Terms', path: '/legal/terms' },
      { label: 'Security', path: '/legal/security' },
    ]
  };

  // Handle navigation click
  const handleNavClick = (item) => {
    if (item.external) {
      handleGitHubClick();
    } else {
      navigate(item.path);
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Handle dropdown item click
  const handleDropdownItemClick = (item) => {
    if (item.external) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.path);
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Handle dropdown hover with proper timing
  const handleDropdownEnter = (key) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setHoveredDropdown(key);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredDropdown(null);
    }, 300);
    setDropdownTimeout(timeout);
  };

  const handleMobileDropdown = (key) => {
    setMobileDropdownOpen(mobileDropdownOpen === key ? null : key);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed z-50 w-full ${
          scrolled 
            ? 'bg-black/40 border-b border-white/10' 
            : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left Section - Logo & Dropdowns */}
          <div className="flex items-center space-x-8">
            {/* Logo with Name */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="h-6 w-6" />
                <span className="text-white text-lg font-semibold">
                  GenAxis
                </span>
              </div>
            </motion.div>

            {/* Desktop Dropdowns */}
            {!isMobile && (
              <div className="flex items-center space-x-6">
                {Object.entries(dropdownItems).map(([key, items]) => (
                  <div 
                    key={key} 
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(key)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center text-white/80 hover:text-white text-sm font-medium cursor-pointer transition-colors duration-200"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <ChevronRight className={`w-3 h-3 ml-1 transition-transform duration-300 ${
                        hoveredDropdown === key ? 'rotate-90' : ''
                      }`} />
                    </motion.button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 mt-2 w-48 backdrop-blur-2xl bg-black/40 border border-white/20 rounded-lg shadow-2xl p-2 z-50 ${
                        hoveredDropdown === key ? 'block' : 'hidden'
                      }`}
                      onMouseEnter={() => handleDropdownEnter(key)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {items.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleDropdownItemClick(item)}
                          className="w-full text-left px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Section - Navigation & Auth */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            {!isMobile && (
              <>
                {rightNavItems.map((item) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center text-white/80 hover:text-white text-sm font-medium cursor-pointer transition-colors duration-200"
                  >
                    {item.icon && (
                      <img 
                        src={item.icon} 
                        alt="GitHub" 
                        className="w-4 h-4 mr-2 filter brightness-0 invert" 
                      />
                    )}
                    {item.label}
                  </motion.button>
                ))}
                
                {user ? (
                  <div className="cursor-pointer">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: 'w-8 h-8 border border-white/30 cursor-pointer',
                        },
                      }}
                    />
                  </div>
                ) : (
                  <motion.button
                    onClick={openSignIn}
                    className="flex items-center text-white/80 hover:text-white text-sm font-medium cursor-pointer transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </motion.button>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white cursor-pointer p-1"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full z-40 backdrop-blur-2xl bg-black/60 border-b border-white/10 pt-16"
          >
            <div className="p-6 space-y-4">
              {/* Right Side Items */}
              <div className="space-y-3">
                {rightNavItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="w-full flex items-center p-3 text-white/80 hover:text-white text-base font-medium cursor-pointer transition-colors duration-200"
                  >
                    {item.icon && (
                      <img 
                        src={item.icon} 
                        alt="GitHub" 
                        className="w-5 h-5 mr-3 filter brightness-0 invert" 
                      />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Left Side Dropdowns */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {Object.entries(dropdownItems).map(([key, items]) => (
                  <div key={key}>
                    <button
                      onClick={() => handleMobileDropdown(key)}
                      className="w-full flex items-center justify-between p-3 text-white/80 hover:text-white text-base font-medium cursor-pointer transition-colors duration-200"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        mobileDropdownOpen === key ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {mobileDropdownOpen === key && (
                      <div className="pl-4 mt-2 space-y-2">
                        {items.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleDropdownItemClick(item)}
                            className="w-full text-left p-2 text-white/60 hover:text-white text-sm cursor-pointer transition-colors duration-200"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Auth Section */}
              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <div className="flex justify-center p-3 cursor-pointer">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: 'w-10 h-10 border border-white/30 cursor-pointer',
                        },
                      }}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      openSignIn();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center p-3 text-white/80 hover:text-white text-base font-medium cursor-pointer transition-colors duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;