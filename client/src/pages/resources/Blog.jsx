import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise Applications',
    excerpt: 'Exploring how AI is transforming business operations and creating new opportunities.',
    date: 'May 15, 2023',
    author: 'Dr. Sarah Chen',
    category: 'AI Trends',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Building Scalable AI Infrastructure',
    excerpt: 'Best practices for deploying AI models at scale with maximum efficiency.',
    date: 'June 2, 2023',
    author: 'Mark Johnson',
    category: 'Engineering',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Ethical Considerations in Generative AI',
    excerpt: 'Navigating the complex landscape of AI ethics and responsible innovation.',
    date: 'June 18, 2023',
    author: 'Priya Patel',
    category: 'Ethics',
    readTime: '6 min read'
  }
];

const Blog = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 to-violet-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">Updates</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest news, research, and perspectives on AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-emerald-100"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" /> {post.author}
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 font-medium">
                    Read more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-md transition-all flex items-center gap-2 mx-auto">
            View all articles <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;