import React from 'react';
import { getWhatsAppLink } from '../constants';
import { WhatsAppIcon } from './WhatsAppIcon';

const CTA: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-[1120px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-brand p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-brand/20">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/20 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Pronto para começar?</h2>
            <p className="text-white/90">Chame no WhatsApp e receba avaliação inicial do seu caso.</p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto">
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-4 rounded-xl font-bold text-brand-dark bg-white shadow-lg transition-transform hover:-translate-y-1"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;