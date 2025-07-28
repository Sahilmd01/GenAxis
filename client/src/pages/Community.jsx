import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/get-published-creations', {
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
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50/20 to-indigo-50/20 p-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
          >
            Community Creations
          </motion.h1>
          <motion.div
            className="flex items-center gap-2 bg-white/95 px-4 py-2 rounded-xl shadow-sm border border-blue-100"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              {creations.length} creations
            </span>
          </motion.div>
        </motion.div>

        {/* Creations Grid */}
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
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
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
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {creations.map((creation, index) => (
                <motion.div
                  key={creation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <img
                    src={creation.content}
                    alt={`AI creation by ${creation.userName || 'user'}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm mb-3 line-clamp-2">
                      {creation.prompt}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <span className="text-white text-sm font-medium">
                          {creation.userName || 'Anonymous'}
                        </span>
                      </div>
                      <button
                        onClick={() => imageLikeToggle(creation.id)}
                        className="flex items-center space-x-1 p-1 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <span className="text-white text-sm">
                          {creation.likes.length}
                        </span>
                        <Heart
                          className={`w-5 h-5 ${
                            creation.likes.includes(user?.id)
                              ? 'fill-red-500 text-red-600'
                              : 'text-white'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && creations.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center p-12 bg-white/80 rounded-xl border border-dashed border-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Community Creations Yet
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              When users publish their creations, they'll appear here for the community to enjoy.
            </p>
          </motion.div>
        )}
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

export default Community;
