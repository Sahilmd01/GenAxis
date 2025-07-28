import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return user ? (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 h-14 px-4 sm:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'}`}>
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img 
            src={assets.logo} 
            className="w-8 sm:w-10 transition-transform hover:scale-110" 
            alt="Logo" 
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent"
          >
            Genaxis
          </motion.span>
        </div>
        {sidebar ? (
          <X 
            onClick={() => setSidebar(false)} 
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer hover:text-purple-600 transition-colors" 
          />
        ) : (
          <Menu 
            onClick={() => setSidebar(true)} 
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer hover:text-purple-600 transition-colors" 
          />
        )}
      </nav>

      {/* Main content area below fixed navbar */}
      <div className="flex pt-14 h-full overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 overflow-y-auto bg-[#F4F7FB] p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <SignIn appearance={{
        elements: {
          rootBox: 'w-full max-w-md',
          card: 'shadow-lg border border-gray-200'
        }
      }} />
    </div>
  );
};

export default Layout;
