import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SiteConfig, HeroSlide, ServiceItem } from '../types';
import { HERO_SLIDES, SERVICES, DEFAULT_HERO_BG } from '../constants';

// Initial State from Constants, converted to CMS format
const INITIAL_STATE: SiteConfig = {
  brandName: "Minuto Crédito",
  logoText: "Minuto Crédito",
  logoImage: null,
  heroBackgroundImage: DEFAULT_HERO_BG,
  whatsappNumber: "5515988136215",
  slides: HERO_SLIDES.map((s, i) => ({ ...s, id: `slide-${i}` })),
  services: SERVICES,
};

interface SiteContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  updateLogo: (text: string, image: string | null) => void;
  addSlide: (slide: HeroSlide) => void;
  removeSlide: (id: string) => void;
  addService: (service: ServiceItem) => void;
  removeService: (id: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_STATE);

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
  };

  const updateLogo = (text: string, image: string | null) => {
    setConfig(prev => ({ ...prev, logoText: text, logoImage: image }));
  };

  const addSlide = (slide: HeroSlide) => {
    setConfig(prev => ({ ...prev, slides: [...prev.slides, slide] }));
  };

  const removeSlide = (id: string) => {
    setConfig(prev => ({ ...prev, slides: prev.slides.filter(s => s.id !== id) }));
  };

  const addService = (service: ServiceItem) => {
    setConfig(prev => ({ ...prev, services: [...prev.services, service] }));
  };

  const removeService = (id: string) => {
    setConfig(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  return (
    <SiteContext.Provider value={{ 
      config, 
      updateConfig, 
      updateLogo,
      addSlide,
      removeSlide,
      addService,
      removeService
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
};