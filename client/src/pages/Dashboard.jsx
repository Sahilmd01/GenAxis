import React, { useEffect, useState } from 'react';
import { Gem, Sparkles, Loader2 } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creation, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load creations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50/20 to-indigo-50/20 p-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <motion.div 
          className="flex flex-wrap gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex-1 min-w-[280px] p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center">
              <div className="text-slate-600">
                <p className="text-sm font-medium">Total Creations</p>
                <motion.h2 
                  className="text-2xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {creation.length}
                </motion.h2>
              </div>
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex justify-center items-center shadow-md"
                animate={{ rotate: 5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 min-w-[280px] p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center">
              <div className="text-slate-600">
                <p className="text-sm font-medium">Active Plan</p>
                <motion.h2 
                  className="text-2xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Protect plan="premium" fallback="Free">
                    Premium
                  </Protect>
                </motion.h2>
              </div>
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex justify-center items-center shadow-md"
                animate={{ rotate: -5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Gem className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Creations List */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-800 mb-4"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Recent Creations
              </motion.h3>

              {creation.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {creation.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <CreationItem item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center p-12 bg-white/80 rounded-xl border border-dashed border-blue-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Sparkles className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No Creations Yet</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Your AI-generated content will appear here once you start creating.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 12 + 4;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-indigo-200/20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: size,
                height: size,
                opacity: Math.random() * 0.4 + 0.1,
              }}
              animate={{
                y: [0, Math.random() * 120 - 60],
                x: [0, Math.random() * 120 - 60],
                transition: {
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
