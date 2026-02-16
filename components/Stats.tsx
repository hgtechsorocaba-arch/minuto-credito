import React from 'react';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section className="bg-brand-dark text-white py-10 relative overflow-hidden">
       {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-2">
              <span className="text-3xl md:text-4xl font-extrabold text-brand-light mb-1">{stat.value}</span>
              <span className="text-sm md:text-base font-medium text-emerald-100 uppercase tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;