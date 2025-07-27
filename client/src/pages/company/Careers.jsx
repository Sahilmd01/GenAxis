import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, Sparkles, Briefcase, Users, Award, Clock, MapPin, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const jobOpenings = [
  {
    title: 'AI Research Scientist',
    department: 'Research & Development',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140,000 - $180,000',
    icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: 'Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    icon: <Users className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: 'ML Operations Engineer',
    department: 'Operations',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    icon: <Award className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Contract',
    salary: '$90 - $120/hr',
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
  },
];

const perks = [
  { name: 'Competitive Salary', icon: <DollarSign className="w-6 h-6 text-emerald-600" /> },
  { name: 'Flexible Hours', icon: <Clock className="w-6 h-6 text-emerald-600" /> },
  { name: 'Remote Options', icon: <MapPin className="w-6 h-6 text-emerald-600" /> },
  { name: 'Career Growth', icon: <Award className="w-6 h-6 text-emerald-600" /> },
];

const Careers = () => {
  const navigate = useNavigate();
  const [activeJob, setActiveJob] = useState(0);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-violet-50/30 backdrop-blur-[10px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
            JOIN OUR INNOVATIVE TEAM
          </span>
        </motion.div>

        {/* Heading */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-violet-600 to-purple-600">Build the Future</span>
            <br />
            <span className="text-gray-900">With GenAI Technologies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            We're looking for passionate individuals to join our mission of advancing AI technology while fostering a culture of innovation and growth.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Job Openings */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-emerald-600" />
              <span>Current Openings</span>
            </h2>
            
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/90 border border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setActiveJob(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                      {job.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <span>Position Details</span>
            </h2>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJob}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 border border-emerald-100 rounded-xl p-8 shadow-sm h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-100 to-violet-100 border border-emerald-50">
                    {jobOpenings[activeJob].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{jobOpenings[activeJob].title}</h3>
                    <p className="text-emerald-600 font-medium">{jobOpenings[activeJob].department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{jobOpenings[activeJob].location}</p>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{jobOpenings[activeJob].type}</p>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-medium">{jobOpenings[activeJob].salary}</p>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">3+ years</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">About the Role</h4>
                  <p className="text-gray-600 mb-4">
                    As a {jobOpenings[activeJob].title}, you'll work with our talented team to push the boundaries of AI technology. You'll have the opportunity to contribute to cutting-edge projects that make a real impact.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Design and implement innovative AI solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Collaborate with cross-functional teams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Mentor junior team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Participate in research and development</span>
                    </li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-violet-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 group"
                  onClick={() => navigate('/apply')}
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Perks Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Our Perks & Benefits</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We take care of our team with comprehensive benefits and perks that support your work and life.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/90 border border-emerald-100 rounded-xl p-6 text-center backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-emerald-100 to-violet-100">
                    {perk.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{perk.name}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  {perk.name === 'Competitive Salary' && 'Industry-leading compensation packages'}
                  {perk.name === 'Flexible Hours' && 'Work when you\'re most productive'}
                  {perk.name === 'Remote Options' && 'Work from anywhere in the world'}
                  {perk.name === 'Career Growth' && 'Regular promotions and skill development'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 10 + 5;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-emerald-200/30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: size,
                height: size,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                transition: {
                  duration: Math.random() * 10 + 10,
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

export default Careers;