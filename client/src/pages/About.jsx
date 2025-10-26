import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { ChevronRight, Users, Target, Zap, Globe } from 'lucide-react';
import Navbar from '../components/Navbar'; // Adjust the import path as needed

const About = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.8
      }
    }
  };

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '15+', label: 'AI Tools' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support' }
  ];

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing the boundaries of AI technology to deliver cutting-edge solutions.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality tools and user experience.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a global community of creators, innovators, and visionaries.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making advanced AI tools accessible to everyone, everywhere.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-[60px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-20 xl:px-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ABOUT US
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the way people interact with artificial intelligence, 
              making advanced tools accessible and intuitive for everyone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-20 xl:px-32 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Our <span className="text-purple-400">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                To democratize artificial intelligence by creating tools that are powerful yet 
                simple to use. We believe everyone should have access to cutting-edge AI 
                technology, regardless of their technical background.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our platform brings together the latest advancements in machine learning, 
                natural language processing, and computer vision to solve real-world problems 
                and enhance creativity.
              </p>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden border border-gray-800"
              >
                <img 
                  src="/images/faqs.png" 
                  alt="AI Innovation"
                  className="w-full h-full object-cover aspect-video"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-20 xl:px-32 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors duration-300 border border-purple-500/30">
                  <value.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;