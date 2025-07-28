import { useState } from 'react';
import { Eraser, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error('Please upload an image');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', input);

      const { data } = await axios.post(
        '/api/ai/remove-image-background',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success('Background removed successfully!');
      } else {
        toast.error(data.message || 'Failed to remove background');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-orange-50/20 to-red-50/20 p-4 sm:p-6">
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
            className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 border border-orange-50 shadow-inner"
                animate={{ rotate: 5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Eraser className="w-7 h-7 text-orange-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Background Remover
              </h1>
            </div>

            <motion.div 
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">Upload Image</label>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative"
              >
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-orange-200 border-dashed rounded-xl cursor-pointer bg-orange-50/50 hover:bg-orange-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 mb-3 text-orange-500" />
                    <p className="text-sm text-gray-500">
                      {preview ? 'Image selected' : 'Click to upload'}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </label>
                {preview && (
                  <motion.div 
                    className="mt-3 rounded-lg overflow-hidden border border-orange-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-40 object-contain bg-gray-100"
                    />
                  </motion.div>
                )}
              </motion.div>
              <p className="mt-2 text-xs text-gray-500">
                Supports JPG, PNG, and other image formats
              </p>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-medium relative overflow-hidden group shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-lg">Processing...</span>
                </>
              ) : (
                <>
                  <Eraser className="w-6 h-6" />
                  <span className="text-lg">Remove Background</span>
                </>
              )}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </motion.form>

          <motion.div 
            className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="p-2 rounded-lg bg-orange-100 text-orange-600">
                <Sparkles className="w-5 h-5" />
              </span>
              Pro Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Upload high-quality images for best results",
                "Images with clear subject-background separation work best",
                "For complex images, try cropping first",
                "The AI works best with well-lit, high-contrast images"
              ].map((tip, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <span className="text-orange-500 mt-0.5">•</span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Processed Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 h-full"
        >
          <div className="p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 border border-orange-50 shadow-inner"
                animate={{ rotate: -5 }}
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: 'spring' }}
              >
                <Eraser className="w-7 h-7 text-orange-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Result
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
                      src="/eraser.png" 
                      alt="Background Removal"
                      className="w-48 h-48 object-contain opacity-70"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">Ready to Process</h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    Your transparent-background image will appear here after processing.
                  </p>
                  <motion.div 
                    className="w-24 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400 overflow-hidden"
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
                  className="flex-1 flex flex-col"
                >
                  <div className="flex-1 relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                    <img 
                      src={content} 
                      alt="Processed content" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <motion.div 
                    className="mt-6 pt-6 border-t border-orange-100 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      Processed by AI Magic
                    </div>
                    <button 
                      className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(content);
                        toast.success('Image URL copied!');
                      }}
                    >
                      Copy URL
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
              className="absolute rounded-full bg-gradient-to-r from-orange-200/20 to-red-200/20"
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

export default RemoveBackground;
