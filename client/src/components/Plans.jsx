import React from 'react';
import { PricingTable } from '@clerk/clerk-react';

const Plans = () => {
  return (
    <div className="max-w-7xl mx-auto z-20 my-30 px-4">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation need.
        </p>
      </div>

      <div className="mt-14 max-sm:mx-8">
        <div className="clerk-pricing-wrapper sm:flex sm:justify-center sm:gap-6">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};

export default Plans;
