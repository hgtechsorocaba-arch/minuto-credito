import React from 'react';
import Button from './Button';
import { getWhatsAppLink } from '../constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useSiteData } from '../context/SiteContext';

const Header: React.FC = () => {
  const { config } = useSiteData();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-[110px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-5 group" aria-label="Voltar ao topo">
          {config.logoImage ? (
             <img src={config.logoImage} alt={config.logoText} className="h-[100px] w-auto object-contain rounded-xl transition-transform group-hover:scale-105" />
          ) : (
            <div className="w-[100px] h-[100px] rounded-2xl flex items-center justify-center bg-gradient-to-br from-brand to-brand-dark text-white font-extrabold text-5xl shadow-lg shadow-brand/20 transition-transform group-hover:scale-105 overflow-hidden shrink-0">
               {config.logoText.substring(0, 2).toUpperCase()}
            </div>
          )}
          
          <div className="flex flex-col justify-center">
            <strong className="text-2xl md:text-3xl leading-none text-slate-900 tracking-tight">{config.logoText}</strong>
            <span className="text-sm md:text-base text-slate-500 hidden sm:block font-medium mt-1">Consultoria • Soluções jurídicas</span>
          </div>
        </a>
        
        <Button 
          href={getWhatsAppLink()} 
          isExternal 
          className="hidden sm:inline-flex"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Falar no WhatsApp
        </Button>
      </div>
    </header>
  );
};

export default Header;