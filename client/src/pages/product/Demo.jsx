import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronRight, Sparkles, Code } from 'lucide-react';
import Navbar from '../../components/Navbar';

const demos = [
  {
    id: 'image-gen',
    title: "Image Generation",
    description: "See how our AI creates stunning visuals from text prompts",
    icon: "/images/image-generation.png",
    video: "/videos/image-generation-demo.mp4",
    poster: "/images/image-gen-poster.png",
    howItWorks: "Our AI analyzes text descriptions and generates high-quality images using advanced diffusion models and neural networks.",
    useCases: "Perfect for designers, marketers, and content creators needing visual assets quickly."
  },
  {
    id: 'blog-gen',
    title: "Blog Generator",
    description: "Watch how we generate complete blogs from just a title",
    icon: "/images/blog-generation.png",
    video: "/videos/blog-generation-demo.mp4",
    poster: "/images/blog-gen-poster.png",
    howItWorks: "AI analyzes your title, researches relevant content, and generates well-structured, SEO-optimized blog posts automatically.",
    useCases: "Ideal for bloggers, content writers, and businesses scaling their content production."
  },
  {
    id: 'resume-rv',
    title: "Resume Reviewer",
    description: "Get AI-powered feedback to improve your resume",
    icon: "/images/resume-review.png",
    video: "/videos/resume-review-demo.mp4",
    poster: "/images/resume-review-poster.png",
    howItWorks: "Our AI scans your resume for formatting, keywords, ATS compatibility, and provides actionable improvement suggestions.",
    useCases: "Essential for job seekers, career changers, and professionals optimizing their applications."
  },
  {
    id: 'bg-removal',
    title: "Background Removal",
    description: "Remove backgrounds from images instantly with AI",
    icon: "/images/background-removal.png",
    video: "/videos/background-removal-demo.mp4",
    poster: "/images/bg-removal-poster.png",
    howItWorks: "AI automatically detects and separates subjects from backgrounds using advanced computer vision and segmentation algorithms.",
    useCases: "Ideal for e-commerce, photography, graphic design, and social media content creation."
  },
  {
    id: 'object-removal',
    title: "Object Removal",
    description: "Remove unwanted objects from photos seamlessly",
    icon: "/images/object-removal.png",
    video: "/videos/object-removal-demo.mp4",
    poster: "/images/object-removal-poster.png",
    howItWorks: "AI identifies and removes unwanted objects while intelligently filling the space with context-aware background reconstruction.",
    useCases: "Perfect for photo restoration, real estate photography, and cleaning up images."
  },
  {
    id: 'ai-article',
    title: "AI Article Writer",
    description: "Generate comprehensive articles on any topic",
    icon: "/images/article-writer.png",
    video: "/videos/article-writer-demo.mp4",
    poster: "/images/article-writer-poster.png",
    howItWorks: "AI researches topics and generates well-structured, original articles with proper formatting, citations, and SEO optimization.",
    useCases: "Excellent for content marketers, journalists, bloggers, and businesses scaling content production."
  }
  
];

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState(demos[0].id);
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef({});

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

  const togglePlayPause = (demoId) => {
    const video = videoRefs.current[demoId];
    if (video) {
      if (isPlaying[demoId]) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(prev => ({
        ...prev,
        [demoId]: !prev[demoId]
      }));
    }
  };

  const handleDemoChange = (demoId) => {
    // Pause current video if playing
    Object.keys(videoRefs.current).forEach(id => {
      if (videoRefs.current[id] && isPlaying[id]) {
        videoRefs.current[id].pause();
        setIsPlaying(prev => ({
          ...prev,
          [id]: false
        }));
      }
    });
    
    setActiveDemo(demoId);
  };

  const currentDemo = demos.find(d => d.id === activeDemo);

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:py-28">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            INTERACTIVE DEMOS
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience our AI capabilities firsthand with these interactive demonstrations.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Demo Selector */}
          <div className="lg:w-1/3">
            <div className="space-y-4">
              {demos.map((demo) => (
                <motion.div
                  key={demo.id}
                  variants={itemVariants}
                  whileHover={{ x: 5, scale: 1.02 }}
                  onClick={() => handleDemoChange(demo.id)}
                  className={`p-5 rounded-xl cursor-pointer transition-all border backdrop-blur-sm ${
                    activeDemo === demo.id
                      ? 'bg-gray-900/80 border-purple-500/50 ring-2 ring-purple-500/20'
                      : 'bg-gray-900/50 border-gray-800 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg border ${
                      activeDemo === demo.id
                        ? 'bg-purple-600/20 border-purple-500/30'
                        : 'bg-gray-800/50 border-gray-700'
                    }`}>
                      <img 
                        src={demo.icon} 
                        alt={demo.title}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        activeDemo === demo.id ? 'text-purple-200' : 'text-white'
                      }`}>
                        {demo.title}
                      </h3>
                      <p className="text-sm text-gray-400">{demo.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Demo Display */}
          <div className="lg:w-2/3">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 backdrop-blur-sm"
            >
              {/* Window Header */}
              <div className="bg-gray-800/80 p-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-300 font-mono">
                  {currentDemo?.title} Demo
                </div>
                <div className="w-8"></div>
              </div>
              
              {/* Demo Content */}
              <div className="p-8">
                <div className="relative bg-gray-800/30 rounded-lg aspect-video mb-6 border border-gray-700 overflow-hidden">
                  <video 
                    ref={el => videoRefs.current[activeDemo] = el}
                    className="w-full h-full object-cover"
                    poster={currentDemo?.poster}
                    onPlay={() => setIsPlaying(prev => ({...prev, [activeDemo]: true}))}
                    onPause={() => setIsPlaying(prev => ({...prev, [activeDemo]: false}))}
                  >
                    <source src={currentDemo?.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                    <motion.button
                      onClick={() => togglePlayPause(activeDemo)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center group hover:bg-black/80 transition-all duration-300"
                    >
                      <div className="relative">
                        {isPlaying[activeDemo] ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                        {/* Purple shine effect */}
                        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md group-hover:bg-purple-500/30 transition-all duration-300 scale-0 group-hover:scale-100" />
                      </div>
                    </motion.button>
                  </div>

                  {/* Video Status Indicator */}
                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      isPlaying[activeDemo] 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                      {isPlaying[activeDemo] ? 'Playing' : 'Paused'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-500/20">
                    <h4 className="font-medium text-purple-300 mb-2">How it works</h4>
                    <p className="text-sm text-gray-300">
                      {currentDemo?.howItWorks}
                    </p>
                  </div>
                  <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-500/20">
                    <h4 className="font-medium text-blue-300 mb-2">Use Cases</h4>
                    <p className="text-sm text-gray-300">
                      {currentDemo?.useCases}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;

///videos/image-generation-demo.mp4

// /videos/blog-generation-demo.mp4

// /videos/resume-review-demo.mp4

// /images/image-gen-poster.png

// /images/blog-gen-poster.png

// /images/resume-review-poster.png

// /images/blog-generation.png

// /images/resume-review.png