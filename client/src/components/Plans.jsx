import React from 'react';
import { PricingTable } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Plans = () => {
  return (
    <div className="max-w-7xl mx-auto z-20 my-30 px-4">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          OUR PLANS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Custimished your plan accourdingly
        </motion.p>
      </div>

      <div className="mt-14 max-sm:mx-8">
           <div className='mt-14 max-sm:mx-8'>
        <PricingTable/>
      </div>
      </div>
    </div>
  );
};

export default Plans;

