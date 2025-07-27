import { useClerk, useUser } from '@clerk/clerk-react';
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
  Zap,
  Lock
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Updated nav items with your requested access levels
const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House, accessibleTo: ['free', 'premium', 'exclusive'] },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen, accessibleTo: ['free'] }, // Free
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, accessibleTo: ['free'] }, // Free
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image, accessibleTo: ['free'] }, // Free
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser, accessibleTo: ['premium', 'exclusive'] }, // Premium+
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors, accessibleTo: ['premium', 'exclusive'] }, // Premium+
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText, accessibleTo: ['free', 'premium', 'exclusive'] }, // Free
  { to: '/ai/community', label: 'Community', Icon: Users, accessibleTo: ['free', 'premium', 'exclusive'] }, // Free
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  // Get user's plan status
  const getPlanStatus = () => {
    if (!user) return { badge: null, status: 'Loading...', plan: 'free' };

    const plan = user.publicMetadata?.plan || 'free';

    if (plan === 'exclusive') {
      return {
        badge: (
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs px-2.5 py-1 rounded-full">
            <Crown className="w-3 h-3" />
            <span>EXCLUSIVE</span>
          </div>
        ),
        status: (
          <>
            <Gem className="w-3 h-3 text-amber-500" />
            <span className="text-amber-600">Exclusive Member</span>
          </>
        ),
        plan: 'exclusive'
      };
    }

    if (plan === 'premium') {
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
        ),
        plan: 'premium'
      };
    }

    return {
      badge: <span className="text-gray-600 text-xs px-2.5 py-1">FREE</span>,
      status: <span>Free Plan</span>,
      plan: 'free'
    };
  };

  const { badge, status, plan } = getPlanStatus();

  // Check if user can access a specific nav item
  const canAccessItem = (accessibleTo) => {
    return accessibleTo.includes(plan);
  };

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
              GENAXIS
            </h1>
          </div>
          {badge}
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map(({ to, label, Icon, accessibleTo }) => {
            const isAccessible = canAccessItem(accessibleTo);
            const isPremiumOnly = accessibleTo.includes('premium') && !accessibleTo.includes('free');
            
            return (
              <div key={to} className="relative group/navitem">
                <NavLink
                  to={isAccessible ? to : '#'}
                  end={to === '/ai'}
                  onClick={() => {
                    if (isAccessible) {
                      setSidebar(false);
                    } else {
                      // Optionally trigger upgrade modal here
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 text-purple-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`
                  }
                >
                  <div className={`p-2 rounded-lg ${
                    isPremiumOnly
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium flex-1">{label}</span>
                  {isPremiumOnly && (
                    <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 border border-purple-100 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>PREMIUM</span>
                    </span>
                  )}
                </NavLink>
                
                {!isAccessible && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 rounded-xl flex items-center justify-center opacity-0 group-hover/navitem:opacity-100 transition-opacity">
                    <div className="text-center p-2">
                      <Lock className="w-4 h-4 mx-auto text-gray-500 mb-1" />
                      <span className="text-xs font-medium text-gray-700">
                        Upgrade to Premium
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
              {plan === 'premium' && (
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-0.5 shadow-sm">
                  <div className="bg-white rounded-full p-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-purple-600" />
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
