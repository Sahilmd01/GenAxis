import React from 'react';
import { PricingTable } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Plans = () => {
  return (
    <div className="max-w-7xl mx-auto z-20 my-30 px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600">
            CUSTOMISE YOUR PLAN ACCOURDINGLY
          </span>
        </motion.div>

        <h2 className="text-[42px] font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation need.
        </p>
      </div>

      <div className="mt-14 max-sm:mx-8">
        <div className="clerk-pricing-wrapper sm:flex sm:justify-center sm:gap-6">
          <PricingTable
            appearance={{
              variables: {
                colorPrimary: 'linear-gradient(to right, #10B981, #7C3AED)',
                colorTextOnPrimaryBackground: '#fff',
                colorTextSecondary: '#6B7280',
                colorBackground: '#fff',
                colorInputBackground: '#fff',
                colorShimmer:
                  'linear-gradient(90deg, transparent, rgba(16,185,129,0.1), transparent)'
              },
              elements: {
                card: {
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E5E7EB'
                },
                badge: {
                  backgroundColor: '#ECFDF5',
                  color: '#065F46'
                },
                button: {
                  background: 'linear-gradient(to right, #10B981, #7C3AED)',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #0EA371, #6D28D9)'
                  }
                },
                footer: {
                  '& + div': {
                    borderTop: '1px solid #E5E7EB'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Plans;
