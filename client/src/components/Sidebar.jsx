import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import React from 'react';
import { 
  LogOut, 
  Crown, 
  Zap, 
  LayoutDashboard, 
  Edit3, 
  Heading, 
  Image, 
  Scan, 
  Eraser, 
  FileText,
  Users 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ai/write-article', label: 'Write Article', icon: Edit3 },
  { to: '/ai/blog-titles', label: 'Blog Titles', icon: Heading },
  { to: '/ai/generate-images', label: 'Generate Images', icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', icon: Scan },
  { to: '/ai/remove-object', label: 'Remove Object', icon: Eraser },
  { to: '/ai/review-resume', label: 'Review Resume', icon: FileText },
  { to: '/ai/community', label: 'Community', icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 z-10 bg-gradient-to-b from-gray-900 via-black to-gray-900 border-r border-purple-500/20 flex flex-col max-sm:absolute top-0 bottom-0 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 shadow-2xl shadow-purple-500/10`}
    >
      {/* Compressed Header */}
      <div className="p-4 border-b border-purple-500/10 bg-gradient-to-r from-gray-900 to-black">
        {user && (
          <div 
            onClick={openUserProfile}
            className="group relative p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-800/50"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity"></div>
                <img src={user.imageUrl} alt="User" className="w-9 h-9 rounded-full border-2 border-gray-600 group-hover:border-purple-400 transition-colors relative" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{user.fullName}</p>
                <Protect plan='premium' fallback={
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                    <Zap className="w-3 h-3" />
                    Free Plan
                  </p>
                }>
                  <p className="text-yellow-300 text-xs flex items-center gap-1 mt-0.5">
                    <Crown className="w-3 h-3 fill-yellow-300" />
                    Premium
                  </p>
                </Protect>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compressed Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/40 shadow-lg shadow-purple-500/20'
                    : 'border-transparent hover:border-purple-500/20 hover:bg-gray-800/30'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30' 
                      : 'bg-gray-800 group-hover:bg-gray-700'
                  }`}>
                    <Icon 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}
                    />
                  </div>
                  <span className={`font-medium text-sm transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {label}
                  </span>
                  
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Compressed Footer */}
      <div className="p-4 border-t border-purple-500/10 bg-gradient-to-r from-black to-gray-900">
        <div className="bg-gray-800/20 rounded-lg p-3 border border-gray-700/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src={user?.imageUrl} alt="User" className="w-7 h-7 rounded-full border border-gray-600" />
              <div>
                <p className="text-white text-xs font-medium">Status</p>
                <Protect plan='premium' fallback={
                  <p className="text-gray-400 text-xs">Limited</p>
                }>
                  <p className="text-green-400 text-xs">Full Access</p>
                </Protect>
              </div>
            </div>
            
            <button
              onClick={signOut}
              className="p-2 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all duration-300 border border-gray-600 hover:border-red-500/30 group"
            >
              <LogOut className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* Premium Usage Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">AI Power</span>
              <Protect plan='premium' fallback={<span className="text-gray-400">50%</span>}>
                <span className="text-yellow-300">MAX</span>
              </Protect>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <Protect plan='premium' fallback={
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full w-1/2 transition-all duration-500"></div>
              }>
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1 rounded-full w-full shadow-lg shadow-yellow-500/20"></div>
              </Protect>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;