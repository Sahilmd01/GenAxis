import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageSquare, Star, Send, Heart, Loader2, Mail, Phone } from "lucide-react";
import Navbar from "../components/Navbar";

const FeedbackPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', message: '', category: 'general'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      alert("Please fill all fields and provide a rating");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xwpbojaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating, type: 'feedback' }),
      });
      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '', category: 'general' });
        setRating(0);
      }
    } catch (error) {
      alert("Failed to send. Email sahilmd.dev@gmail.com");
    }
    setIsSubmitting(false);
  };

  const getRatingEmoji = (rating) => {
    const emojis = ["", "😠", "☹️", "😐", "😊", "😄"];
    return <span className="text-2xl">{emojis[rating]}</span>;
  };

  const getRatingText = (rating) => {
    const texts = ["Select Rating", "Awful", "Poor", "Average", "Good", "Excellent"];
    return texts[rating];
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col relative">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/footer.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="max-w-6xl w-full">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-xs mb-3">
              <MessageSquare className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400 font-medium">CUSTOMER FEEDBACK</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Share Your Feedback
            </h1>
            <p className="text-sm text-gray-300">Your thoughts help us improve</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Column - Contact & Stats */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">Contact</h2>
                    <p className="text-xs text-gray-400">Get in touch</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href="mailto:sahilmd.dev@gmail.com" className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-yellow-500/30 transition-all">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-xs font-medium text-white">sahilmd.dev@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+919315135594" className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-yellow-500/30 transition-all">
                    <Phone className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-xs font-medium text-white">+91 9315135594</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-5"
              >
                <h2 className="text-sm font-semibold text-white mb-3">Stats</h2>
                <div className="space-y-2">
                  {[
                    { label: "Satisfaction", value: "98%", color: "text-green-400" },
                    { label: "Rating", value: "4.8/5", color: "text-yellow-400" },
                    { label: "Response", value: "24h", color: "text-blue-400" }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded border border-gray-700/30">
                      <div className="text-xs text-gray-400">{stat.label}</div>
                      <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Feedback Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Rating Section */}
                  <div className="text-center bg-gray-800/50 p-5 rounded-xl border border-gray-700/30">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Rate your experience
                    </label>
                    
                    <div className="flex justify-center mb-3">
                      {getRatingEmoji(rating)}
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star className={`w-7 h-7 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`} />
                        </button>
                      ))}
                    </div>
                    
                    <div className="text-sm font-medium text-white">
                      {getRatingText(rating)}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500/50 text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email"
                      className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500/50 text-sm"
                    />
                  </div>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-500/50 text-sm"
                  >
                    {["General Feedback", "UI/UX Feedback", "Responsiveness Issue", "Website Experience", "Website Issue", "Report an Issue", "Other"].map((category) => (
                      <option key={category} value={category.toLowerCase().replace(' ', '_')}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Share your thoughts..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500/50 resize-none text-sm"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold transition-all text-sm ${
                      isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSubmitting ? "Sending..." : "Submit Feedback"}
                  </button>
                </form>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-4"
              >
                <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                  GenAxis <Heart className="w-3 h-3 text-pink-400" /> by Sahil
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900/90 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Thank You! 💫</h3>
              <p className="text-gray-300 text-sm mb-6">Feedback received successfully!</p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-2 px-4 rounded-lg text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackPage;