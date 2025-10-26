import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();
  
  return user ? (
    <div className="flex flex-col item-start justify-start h-screen ">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200 ">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            className='cursor-pointer w-10 h-10 object-contain' 
            alt="Logo" 
            onClick={() => navigate('/')} 
          />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-slate-300 to-purple-400 bg-clip-text text-transparent tracking-wide font-serif">
            GenAxis Tools
          </span>
        </div>
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>
      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center'>
      <SignIn />
    </div>
  );
};

export default Layout;