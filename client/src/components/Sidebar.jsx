import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import React from 'react';
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
  Sparkles,
  Gem,
  Crown,
  Zap
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House, premium: false },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen, premium: true },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, premium: true },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image, premium: true },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser, premium: true },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors, exclusive: true },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText, premium: false },
  { to: '/ai/community', label: 'Community', Icon: Users, premium: false },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  // Get user's plan status
  const getPlanStatus = () => {
    if (!user) return { badge: null, status: 'Loading...' };

    // Check for exclusive first, then premium, then free
    if (user.publicMetadata?.plan === 'exclusive') {
      return {
        badge: (
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs px-2.5 py-1 rounded-full border-transparent">
            <Crown className="w-3 h-3" />
            <span>EXCLUSIVE</span>
          </div>
        ),
        status: (
          <>
            <Gem className="w-3 h-3 text-amber-500" />
            <span className="text-amber-600">Exclusive Member</span>
          </>
        )
      };
    }

    if (user.publicMetadata?.plan === 'premium') {
      return {
        badge: (
          <div className="flex items-center gap-1 text-purple-600 bg-purple-50 text-xs px-2.5 py-1 rounded-full border border-purple-100">
            <Sparkles className="w-3 h-3" />
            <span>PREMIUM</span>
          </div>
        ),
        status: (
          <>
            <Gem className="w-3 h-3 text-purple-500" />
            <span>Premium Member</span>
          </>
        )
      };
    }

    return {
      badge: <span className="text-gray-600 text-xs px-2.5 py-1">FREE</span>,
      status: <span>Free Plan</span>
    };
  };

  const { badge, status } = getPlanStatus();

  return (
    <div className={`w-72 z-10 bg-white border-r border-gray-100 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 ${
      sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
    } transition-all duration-300 ease-in-out shadow-sm`}>
      
      {/* Header Section */}
      <div className="w-full px-5 py-7">
        <div className="flex items-center justify-between mb-10 px-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent tracking-wide">
              AI STUDIO
            </h1>
          </div>
          {badge}
        </div>

        {/* User Profile */}
        {user ? (
          <div 
            onClick={openUserProfile}
            className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm mb-8 cursor-pointer hover:border-purple-200 hover:shadow-md transition-all group"
          >
            <div className="relative">
              <img
                src={user.imageUrl}
                alt="User"
                className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:border-purple-100 transition-colors"
              />
              {(user.publicMetadata?.plan === 'premium' || user.publicMetadata?.plan === 'exclusive') && (
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1 shadow-sm">
                  <div className="bg-white rounded-full p-0.5">
                    <Crown className="w-3 h-3 text-purple-600" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-medium text-gray-800 truncate">{user.fullName}</h2>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                {status}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-gray-50 mb-8 animate-pulse">
            <div className="h-12 w-full rounded-lg bg-gray-100"></div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map(({ to, label, Icon, premium, exclusive }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                } ${
                  exclusive && (!user || user.publicMetadata?.plan !== 'exclusive') 
                    ? 'opacity-50 pointer-events-none' 
                    : ''
                }`
              }
            >
              <div className={`p-2 rounded-lg ${
                exclusive 
                  ? 'bg-gradient-to-r from-amber-100 to-pink-100 text-amber-600' 
                  : premium
                    ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600'
                    : 'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium flex-1">{label}</span>
              {exclusive ? (
                <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-pink-100 text-amber-600 border border-amber-200 flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  <span>EXCLUSIVE</span>
                </span>
              ) : premium && (
                <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 border border-purple-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>PREMIUM</span>
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-gray-100 p-5 bg-gray-50">
        <div className="flex items-center justify-between">
          <button 
            onClick={openUserProfile}
            className="flex items-center gap-3 group flex-1"
          >
            <div className="relative">
              <img 
                src={user?.imageUrl} 
                alt="User" 
                className="w-9 h-9 rounded-full border border-gray-200 group-hover:border-purple-200 transition-colors"
              />
              {(user?.publicMetadata?.plan === 'premium' || user?.publicMetadata?.plan === 'exclusive') && (
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-0.5 shadow-sm">
                  <div className="bg-white rounded-full p-0.5">
                    <Crown className="w-2.5 h-2.5 text-purple-600" />
                  </div>
                </div>
              )}
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-700 group-hover:text-purple-600 transition-colors truncate max-w-[120px]">
                {user?.firstName || 'Account'}
              </p>
              <p className="text-xs text-gray-500 group-hover:text-purple-500 transition-colors flex items-center gap-1">
                {status}
              </p>
            </div>
          </button>
          
          <button 
            onClick={signOut}
            className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-purple-200 text-gray-500 hover:text-purple-500 transition-colors group shadow-sm"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
