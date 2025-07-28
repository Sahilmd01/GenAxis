import React, { useState } from 'react';
import { Edit, Sparkles, ChevronRight, Zap, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short', description: '500-800 words', icon: '✍️' },
    { length: 1200, text: 'Medium', description: '800-1200 words', icon: '📝' },
    { length: 1600, text: 'Long', description: '1200+ words', icon: '📚' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error('Please enter an article topic');
      return;
    }

    try {
      setLoading(true);
      const prompt = `Write a ${selectedLength.text.toLowerCase()} article about ${input}`;
      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      
      if (data.success) {
        setContent(data.content);
        toast.success('Article generated successfully!');
      } else {
        toast.error(data.message || 'Failed to generate article');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50/20 to-violet-50/20 p-4 sm:p-6">
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
            className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-violet-100 border border-emerald-50 shadow-inner"
                animate={{ rotate: 5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Sparkles className="w-7 h-7 text-emerald-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                Article Creator
              </h1>
            </div>

            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">Article Topic</label>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  className="w-full p-4 text-base rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm"
                  placeholder="The future of AI in healthcare..."
                  required
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-violet-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-3">Article Length</label>
              <div className="grid grid-cols-3 gap-4">
                {articleLength.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedLength(item)}
                    className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex flex-col items-center ${
                      selectedLength.text === item.text
                        ? 'bg-gradient-to-br from-emerald-100/80 to-violet-100/80 border-emerald-300 shadow-md'
                        : 'bg-white border-emerald-100 hover:border-emerald-200'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="text-2xl mb-2">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-800">{item.text}</span>
                    <span className="text-xs text-gray-500 mt-1">{item.description}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-emerald-600 to-violet-600 text-white px-8 py-4 rounded-xl font-medium relative overflow-hidden group shadow-lg"
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
                  <Zap className="w-6 h-6" />
                  <span className="text-lg">Generate Article</span>
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </>
              )}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </motion.form>

          <motion.div 
            className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <Sparkles className="w-5 h-5" />
              </span>
              Pro Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Start with a clear, specific topic for best results",
                "Include key terms you want emphasized in the article",
                "For complex topics, consider generating multiple sections",
                "Use the long format for comprehensive coverage"
              ].map((tip, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <span className="text-emerald-500 mt-0.5">•</span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Generated Article Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 h-full"
        >
          <div className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-violet-100 border border-emerald-50 shadow-inner"
                animate={{ rotate: -5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Edit className="w-7 h-7 text-emerald-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
                Your Article
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
                    className="mb-8"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }}
                  >
                    <img 
                      src="/robot.png" 
                      alt="AI Assistant"
                      className="w-48 h-48 object-contain"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">Ready to Create</h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    Your AI-generated article will appear here. Start by entering a topic above.
                  </p>
                  <motion.div 
                    className="w-24 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-violet-400 overflow-hidden"
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
                    className="mt-8 pt-6 border-t border-emerald-100 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      Generated by GenAIxis AI Platform
                    </div>
                    <button 
                      className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                      onClick={() => navigator.clipboard.writeText(content)}
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
              className="absolute rounded-full bg-gradient-to-r from-emerald-200/20 to-violet-200/20"
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

export default WriteArticle;
