import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import {
  Eraser, FileText, Hash, House, Image,
  LogOut, Scissors, SquarePen, Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-64 z-40 bg-white border-r border-gray-100 flex flex-col justify-between max-sm:fixed top-14 bottom-0
      transition-transform duration-300 ease-in-out shadow-md
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} sm:translate-x-0`}
    >
      {/* Top section */}
      <div className="my-6 px-4">
        {user ? (
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt="User"
                className="w-16 h-16 rounded-full border-2 border-purple-100 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full p-1">
                <div className="bg-white rounded-full p-0.5">
                  <svg className="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="mt-3 text-gray-800 font-medium text-center">{user.fullName}</h1>
            <div className="mt-1 px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-full text-xs text-purple-600 font-medium">
              <Protect plan="premium" fallback="Free Plan">Premium Member</Protect>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user...</p>
        )}

        {/* Navigation */}
        <div className="mt-8 space-y-1.5">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600 border border-purple-100 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-500' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">{label}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <div className="flex items-center justify-between px-2">
          <div onClick={openUserProfile} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <img
                src={user?.imageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-purple-300"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full p-1">
                <div className="bg-white rounded-full p-0.5">
                  <svg className="w-2.5 h-2.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-sm font-medium text-gray-800">{user?.fullName}</h1>
              <p className="text-xs text-gray-500">
                <Protect plan="premium" fallback="Free">
                  <span className="text-purple-500">Premium</span>
                </Protect>
                <span> Plan</span>
              </p>
            </div>
          </div>

          <button
            onClick={signOut}
            className="p-2 rounded-full hover:bg-gray-100 group"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
