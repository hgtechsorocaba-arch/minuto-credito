import React from 'react';
import { STEPS } from '../constants';

const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3 tracking-tight text-slate-900">Como funciona</h2>
          <p className="text-slate-600 text-lg">
            Processo simples, com clareza e segurança.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 mb-4 rounded-xl bg-brand text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-brand/20">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;