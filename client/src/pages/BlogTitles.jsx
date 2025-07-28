import { useState } from 'react';
import { Hash, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    { name: 'General', emoji: '🌐' },
    { name: 'Technology', emoji: '💻' },
    { name: 'Business', emoji: '💼' },
    { name: 'Health', emoji: '🏥' },
    { name: 'Lifestyle', emoji: '✨' },
    { name: 'Education', emoji: '🎓' },
    { name: 'Travel', emoji: '✈️' },
    { name: 'Food', emoji: '🍴' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0].name);
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error('Please enter a keyword');
      return;
    }

    try {
      setLoading(true);
      const prompt = `Generate 10 creative blog title ideas about "${input}" in the ${selectedCategory} category. Make them engaging and SEO-friendly.`;
      
      const { data } = await axios.post(
        '/api/ai/generate-blog-title',
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
        toast.success('Titles generated successfully!');
      } else {
        toast.error(data.message || 'Failed to generate titles');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-purple-50/20 to-indigo-50/20 p-4 sm:p-6">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <motion.form
            onSubmit={onSubmitHandler}
            className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-50 shadow-inner"
                animate={{ rotate: 5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Sparkles className="w-7 h-7 text-purple-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Blog Title Generator
              </h1>
            </div>

            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">Keyword or Topic</label>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  className="w-full p-4 text-base rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all shadow-sm"
                  placeholder="The future of AI in healthcare..."
                  required
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: input ? '100%' : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <div className="grid grid-cols-4 gap-3">
                {blogCategories.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(item.name)}
                    className={`p-3 rounded-xl cursor-pointer border-2 transition-all flex flex-col items-center ${
                      selectedCategory === item.name
                        ? 'bg-gradient-to-br from-purple-100/80 to-indigo-100/80 border-purple-300 shadow-md'
                        : 'bg-white border-purple-100 hover:border-purple-200'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="text-xl mb-1">{item.emoji}</span>
                    <span className="text-xs font-medium text-gray-800">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-medium relative overflow-hidden group shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-lg">Generating...</span>
                </>
              ) : (
                <>
                  <Hash className="w-6 h-6" />
                  <span className="text-lg">Generate Titles</span>
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </>
              )}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </motion.form>

          <motion.div 
            className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <Sparkles className="w-5 h-5" />
              </span>
              Pro Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Use specific keywords for more targeted titles",
                "Combine multiple related keywords for variety",
                "The Technology category works best for AI/tech topics",
                "Generated titles are SEO-optimized by default"
              ].map((tip, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <span className="text-purple-500 mt-0.5">•</span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Generated Titles Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 h-full"
        >
          <div className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-50 shadow-inner"
                animate={{ rotate: -5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Hash className="w-7 h-7 text-purple-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Your Titles
              </h1>
            </div>

            <AnimatePresence mode="wait">
              {!content ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-6"
                >
                  <motion.div 
                    className="w-28 h-28 rounded-2xl bg-purple-100/50 border-2 border-dashed border-purple-300 flex items-center justify-center mb-8"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }}
                  >
                    <Hash className="w-12 h-12 text-purple-500" />
                  </motion.div>
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">Ready to Create</h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    Your AI-generated blog titles will appear here. Start by entering a keyword above.
                  </p>
                  <motion.div 
                    className="w-24 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="h-full bg-white/80"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 overflow-y-auto prose prose-sm max-w-none p-2"
                >
                  <Markdown>{content}</Markdown>
                  <motion.div 
                    className="mt-8 pt-6 border-t border-purple-100 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      Generated by AI Content Studio
                    </div>
                    <button 
                      className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(content);
                        toast.success('Titles copied!');
                      }}
                    >
                      Copy
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 12 + 4;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-200/20 to-indigo-200/20"
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

export default BlogTitles;