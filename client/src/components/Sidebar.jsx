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
      className={`w-60 z-10 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? 'translate-x-0 ' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        {user ? (
          <>
            <img
              src={user.imageUrl}
              alt="User"
              className="w-13  rounded-full mx-auto"
            />
            <h1 className="mt-1 text-center">{user.fullName}</h1>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading user...</p>
        )}

        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
         <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
           <img src={user.imageUrl} alt="" className="w-8 rounded-full" />
           <div>
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan='premium' fallback='Free'>
                Premium
              </Protect>
              Plan
            </p>
           </div>
         </div>

         <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
      </div>
    </div>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   LayoutDashboard, 
//   Image, 
//   Code, 
//   PenTool, 
//   FileText, 
//   Settings, 
//   User, 
//   LogOut, 
//   ChevronLeft, 
//   ChevronRight,
//   Zap,
//   Gem,
//   Sparkles,
//   Lock,
//   Server
// } from 'lucide-react';

// const Sidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [activeItem, setActiveItem] = useState('Dashboard');

//   const navItems = [
//     { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
//     { name: 'AI Image Generation', icon: <Image className="w-5 h-5" /> },
//     { name: 'Code Automation', icon: <Code className="w-5 h-5" /> },
//     { name: 'Content Creation', icon: <PenTool className="w-5 h-5" /> },
//     { name: 'Documentation', icon: <FileText className="w-5 h-5" /> }
//   ];

//   const toolsItems = [
//     { name: 'Background Removal', icon: <Sparkles className="w-5 h-5" /> },
//     { name: 'Object Removal', icon: <Zap className="w-5 h-5" /> },
//     { name: 'Resume Reviewer', icon: <Gem className="w-5 h-5" /> }
//   ];

//   const adminItems = [
//     { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
//     { name: 'Profile', icon: <User className="w-5 h-5" /> },
//     { name: 'Security', icon: <Lock className="w-5 h-5" /> },
//     { name: 'Infrastructure', icon: <Server className="w-5 h-5" /> }
//   ];

//   return (
//     <motion.div 
//       className={`relative h-screen flex flex-col bg-gray-900 border-r border-gray-800/50 ${isExpanded ? 'w-64' : 'w-20'}`}
//       initial={{ width: 256 }}
//       animate={{ width: isExpanded ? 256 : 80 }}
//       transition={{ type: 'spring', damping: 20 }}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="flex items-center gap-2"
//             >
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
//                 <Zap className="w-4 h-4 text-gray-950" />
//               </div>
//               <span className="text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
//                 GenAxis
//               </span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <button 
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/80 border border-gray-700/50 text-gray-400 hover:text-amber-400 transition-colors"
//         >
//           {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//         </button>
//       </div>

//       {/* Navigation Items */}
//       <div className="flex-1 overflow-y-auto py-4">
//         <div className="space-y-1 px-2">
//           <AnimatePresence>
//             {isExpanded && (
//               <motion.p 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
//               >
//                 Navigation
//               </motion.p>
//             )}
//           </AnimatePresence>
//           {navItems.map((item) => (
//             <motion.button
//               key={item.name}
//               whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
//               whileTap={{ scale: 0.98 }}
//               className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeItem === item.name ? 'text-amber-400 bg-amber-500/10' : 'text-gray-400 hover:text-gray-200'}`}
//               onClick={() => setActiveItem(item.name)}
//             >
//               <span className={`${activeItem === item.name ? 'text-amber-400' : 'text-gray-500'}`}>
//                 {item.icon}
//               </span>
//               <AnimatePresence>
//                 {isExpanded && (
//                   <motion.span
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -10 }}
//                   >
//                     {item.name}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           ))}
//         </div>

//         <div className="border-t border-gray-800/50 my-4"></div>

//         {/* AI Tools Section */}
//         <div className="space-y-1 px-2">
//           <AnimatePresence>
//             {isExpanded && (
//               <motion.p 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
//               >
//                 AI Tools
//               </motion.p>
//             )}
//           </AnimatePresence>
//           {toolsItems.map((item) => (
//             <motion.button
//               key={item.name}
//               whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
//               whileTap={{ scale: 0.98 }}
//               className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeItem === item.name ? 'text-amber-400 bg-amber-500/10' : 'text-gray-400 hover:text-gray-200'}`}
//               onClick={() => setActiveItem(item.name)}
//             >
//               <span className={`${activeItem === item.name ? 'text-amber-400' : 'text-gray-500'}`}>
//                 {item.icon}
//               </span>
//               <AnimatePresence>
//                 {isExpanded && (
//                   <motion.span
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -10 }}
//                   >
//                     {item.name}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           ))}
//         </div>

//         <div className="border-t border-gray-800/50 my-4"></div>

//         {/* Admin Section */}
//         <div className="space-y-1 px-2">
//           <AnimatePresence>
//             {isExpanded && (
//               <motion.p 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
//               >
//                 Administration
//               </motion.p>
//             )}
//           </AnimatePresence>
//           {adminItems.map((item) => (
//             <motion.button
//               key={item.name}
//               whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
//               whileTap={{ scale: 0.98 }}
//               className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeItem === item.name ? 'text-amber-400 bg-amber-500/10' : 'text-gray-400 hover:text-gray-200'}`}
//               onClick={() => setActiveItem(item.name)}
//             >
//               <span className={`${activeItem === item.name ? 'text-amber-400' : 'text-gray-500'}`}>
//                 {item.icon}
//               </span>
//               <AnimatePresence>
//                 {isExpanded && (
//                   <motion.span
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -10 }}
//                   >
//                     {item.name}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       {/* User Profile & Logout */}
//       <div className="p-4 border-t border-gray-800/50">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
//             <User className="w-5 h-5 text-gray-950" />
//           </div>
//           <AnimatePresence>
//             {isExpanded && (
//               <motion.div
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -10 }}
//                 className="flex-1 overflow-hidden"
//               >
//                 <p className="text-sm font-medium text-gray-200 truncate">John Doe</p>
//                 <p className="text-xs text-gray-500 truncate">admin@genaxis.com</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <button className="p-1.5 rounded-lg text-gray-500 hover:text-amber-400 hover:bg-gray-800/50 transition-colors">
//             <LogOut className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Sidebar;