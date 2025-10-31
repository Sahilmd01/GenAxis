import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, ChevronRight, Loader2, CheckCircle, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const contactInfo = [
    { icon: Mail, title: 'Email Us', description: 'Get in touch via email', details: 'sahilmd.dev@gmail.com', link: 'mailto:sahilmd.dev@gmail.com' },
    { icon: Phone, title: 'Call Us', description: 'Mon-Fri from 9am to 6pm', details: '+91 9315145594', link: 'tel:+919315145594' },
    { icon: MapPin, title: 'Visit Us', description: 'Come say hello at our office', details: '123 AI Street, Tech City, TC 10101', link: '#' },
    { icon: Clock, title: 'Response Time', description: 'We typically reply within', details: '2-4 hours during business days', link: '#' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xwpbojaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setPopupType('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setPopupType('error');
    } finally {
      setIsSubmitting(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1/2 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/footer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent backdrop-blur-[1px]" />
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} 
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
            <div className={`rounded-2xl backdrop-blur-xl border shadow-2xl p-6 relative overflow-hidden ${
              popupType === 'success' ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30' 
              : 'bg-gradient-to-r from-red-900/40 to-orange-900/40 border-red-500/30'}`}>
              <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 p-1 rounded-lg bg-white/10 border border-white/20">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                  popupType === 'success' ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'}`}>
                  {popupType === 'success' ? <CheckCircle className="w-6 h-6 text-green-400" /> : <X className="w-6 h-6 text-red-400" />}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${popupType === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                    {popupType === 'success' ? 'Message Sent! 🎉' : 'Oops! Something Went Wrong'}
                  </h3>
                  <p className="text-gray-200 text-sm mt-1">
                    {popupType === 'success' ? "We've received your message." : "Please try again or email us directly."}
                  </p>
                </div>
              </div>
              <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 5, ease: "linear" }} 
                className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${popupType === 'success' ? 'bg-green-400' : 'bg-red-400'}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative pt-32 pb-20 px-4 sm:px-20 xl:px-32 z-10">
        <motion.div initial="hidden" animate="visible" className="max-w-6xl mx-auto"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              CONTACT US
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Get in touch and let's start a conversation.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {contactInfo.map((item, index) => (
              <motion.a key={index} href={item.link} whileHover={{ y: -8, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 block">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                <p className="text-white font-medium">{item.details}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-20 xl:px-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} 
              className="rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle className="w-5 h-5 text-purple-300" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Send us a Message</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input name="name" value={formData.name} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/50"
                      placeholder="Your Name" />
                    <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/50"
                      placeholder="Email Address" />
                  </div>
                  <input name="subject" value={formData.subject} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/50"
                    placeholder="Subject" />
                  <textarea name="message" value={formData.message} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required rows="6"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/50 resize-none"
                    placeholder="Your message..." />
                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 border border-white/20 disabled:opacity-50">
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : <><Send className="w-5 h-5" />Send Message</>}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">Let's <span className="text-purple-400">Connect</span></h2>
              <p className="text-lg text-gray-200">Our team of AI experts are ready to assist you with any questions.</p>
              
              <div className="rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Help</h3>
                <div className="space-y-3">
                  {['How do I get started?', 'What subscription plans?', 'Technical support', 'Enterprise solutions'].map((question, index) => (
                    <a key={index} href="#" className="flex items-center gap-3 text-gray-200 hover:text-purple-300 transition-colors duration-300">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                      <span>{question}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>  
    </div>
  );
};

export default Contact;