import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Menu, X, Gem, BarChart, Cpu, Zap, Diamond } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoverState, setHoverState] = useState({ logo: false, nav: null, cta: false });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'AI Studio', path: '/models', icon: <Cpu className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'Enterprise', path: '/enterprise', icon: <Gem className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  const LogoBranding = () => (
    <motion.div 
      className="flex items-center space-x-3 cursor-pointer group"
      onClick={() => navigate('/')}
      onHoverStart={() => !isMobile && setHoverState({...hoverState, logo: true})}
      onHoverEnd={() => !isMobile && setHoverState({...hoverState, logo: false})}
      whileTap={isMobile ? { scale: 0.95 } : {}}
    >
      <motion.div
        animate={{ 
          rotate: hoverState.logo ? [0, 3, -3, 0] : 0,
          scale: hoverState.logo ? 1.1 : 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative w-8 h-8 sm:w-10 sm:h-10"
      >
        <img 
          src={`${window.location.origin}/logo.svg`} 
          alt="GenAxis AI Platform" 
          className="w-full h-full object-contain"
          onError={(e) => { e.target.src = `${window.location.origin}/logo.png` }}
        />
        {!isMobile && hoverState.logo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent"
          />
        )}
      </motion.div>
      
      <div>
        <div className="text-lg font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
          Gen<span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">Axis</span>
        </div>
        <div className="flex items-center mt-0.5">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 mr-1.5"
          />
          <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">Intelligent Systems</span>
        </div>
      </div>
    </motion.div>
  );

  const DesktopNavItem = ({ item }) => (
    <motion.button
      onHoverStart={() => setHoverState({...hoverState, nav: item.name})}
      onHoverEnd={() => setHoverState({...hoverState, nav: null})}
      className="relative text-sm font-medium text-gray-400 hover:text-white flex items-center group"
      onClick={() => navigate(item.path)}
    >
      <AnimatePresence>
        {hoverState.nav === item.name && (
          <motion.span 
            className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-amber-400 to-amber-600"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0 }}
          />
        )}
      </AnimatePresence>
      <span className="flex items-center space-x-2 group-hover:space-x-3 transition-all">
        <span className="opacity-70 group-hover:opacity-100 group-hover:text-amber-400">{item.icon}</span>
        <span>{item.name}</span>
      </span>
    </motion.button>
  );

  const MobileMenuButton = () => (
    <motion.button 
      className="p-1.5 rounded-md text-gray-400 hover:text-amber-400 transition-all"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </motion.button>
  );

  const AuthButton = ({ mobile = false }) => (
    <motion.button
      onClick={openSignIn}
      className={`flex items-center gap-2 rounded-full font-medium cursor-pointer bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-gray-950 ${
        mobile ? 'px-5 py-2.5 text-sm' : 'px-6 py-2.5 text-base'
      } hover:shadow-lg hover:shadow-amber-500/30 transition-all group`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{mobile ? 'Start' : 'Begin Experience'}</span>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
    </motion.button>
  );

  const UpgradeButton = ({ mobile = false }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center space-x-2 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent border border-amber-400/30 text-amber-300 ${
        mobile ? 'text-xs px-4 py-2' : 'text-sm px-5 py-2.5'
      } rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all group`}
      onClick={() => navigate('/upgrade')}
    >
      <Diamond className="w-4 h-4 group-hover:text-amber-400" />
      <span>{mobile ? 'Platinum' : 'Platinum Tier'}</span>
    </motion.button>
  );

  return (
    <div className="fixed z-50 w-full bg-gray-950/98 border-b border-white/10 backdrop-blur-3xl shadow-xl shadow-black/30">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          <LogoBranding />

          <div className="hidden lg:flex items-center space-x-8">
            {user && navItems.map(item => <DesktopNavItem key={item.name} item={item} />)}
          </div>

          <div className="flex lg:hidden items-center space-x-4">
            {user ? (
              <>
                {!isMobile && <UpgradeButton mobile />}
                <UserButton appearance={{
                  elements: { userButtonAvatarBox: "w-9 h-9 border border-amber-400/40 shadow-lg shadow-amber-500/10" }
                }} />
                <MobileMenuButton />
              </>
            ) : <AuthButton mobile />}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <>
                <UpgradeButton />
                <UserButton appearance={{
                  elements: { userButtonAvatarBox: "w-10 h-10 border border-amber-400/40 shadow-lg shadow-amber-500/10" }
                }} />
              </>
            ) : <AuthButton />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-950/98 border-t border-white/10 overflow-hidden"
          >
            <div className="px-5 pt-4 pb-8 space-y-3">
              {user ? (
                <>
                  {navItems.map(item => (
                    <motion.button
                      key={item.name}
                      whileTap={{ scale: 0.97 }}
                      className="w-full text-left px-5 py-3.5 rounded-lg text-base font-medium text-gray-300 hover:bg-white/5 flex items-center space-x-4 border border-transparent hover:border-white/10"
                      onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                    >
                      <span className="text-amber-400">{item.icon}</span>
                      <span>{item.name}</span>
                    </motion.button>
                  ))}
                  <UpgradeButton mobile />
                  <div className="flex justify-center pt-6">
                    <UserButton appearance={{
                      elements: { userButtonAvatarBox: "w-12 h-12 border-2 border-amber-400/40 shadow-lg shadow-amber-500/20" }
                    }} />
                  </div>
                </>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 flex items-center justify-center gap-3 rounded-full text-base font-medium bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 px-7 py-4 hover:shadow-xl hover:shadow-amber-500/40 transition-all group"
                  onClick={() => { openSignIn(); setMobileMenuOpen(false); }}
                >
                  <Zap className="w-5 h-5" />
                  <span>Begin Experience</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
