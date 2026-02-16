import React, { useState, useEffect } from 'react';
import Button from './Button';
import { getWhatsAppLink } from '../constants';
import { Check, ShieldCheck, Scale, FileText, Lock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useSiteData } from '../context/SiteContext';

const Hero: React.FC = () => {
  const { config } = useSiteData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    if (config.slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % config.slides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [config.slides.length]);

  // Determine current background image (slide specific or global fallback)
  const currentBg = config.slides[currentSlide]?.backgroundImage || config.heroBackgroundImage;

  return (
    <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 overflow-hidden bg-white transition-all duration-500">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10 transition-all duration-1000 ease-in-out"
        key={currentSlide} // Force re-render for smooth transition effect
        style={{
          backgroundImage: `url("${currentBg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)' 
        }}
      />
      <div className="absolute inset-0 bg-white/90 z-0"></div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Banners & Content */}
        <div className="flex flex-col justify-center">
          
          {/* Trust Badge Top */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-6 w-fit">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Consultoria Jurídica e Administrativa Legalizada</span>
          </div>

          {/* HIGHLIGHTED BANNER CAROUSEL */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 shadow-2xl shadow-emerald-200/50 p-6 sm:p-10 mb-8 min-h-[340px] flex flex-col justify-center text-white transform transition-all hover:scale-[1.01] duration-300 ring-1 ring-white/20">
            {/* Background Decoration */}
            <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12 pointer-events-none">
              <Scale size={180} />
            </div>

            <div className="relative z-10">
              {config.slides.length > 0 ? config.slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`transition-all duration-700 absolute top-0 left-0 w-full h-full flex flex-col justify-center ${index === currentSlide ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute pointer-events-none'}`}
                  style={{ display: index === currentSlide ? 'flex' : 'none' }}
                >
                  <span className="inline-block px-3 py-1 rounded bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-4 border border-white/30 w-fit">
                    {slide.pill}
                  </span>
                  
                  {/* Fonte aumentada aqui */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight drop-shadow-sm">
                    {slide.title}
                  </h1>
                  
                  <p className="text-emerald-50 text-base sm:text-lg leading-relaxed max-w-xl">
                    {slide.text}
                  </p>
                </div>
              )) : (
                <div className="text-center text-white">Adicione banners no painel administrativo</div>
              )}
            </div>

            {/* Navigation Dots */}
            {config.slides.length > 1 && (
              <div className="absolute bottom-6 left-6 sm:left-10 flex gap-2 z-20">
                {config.slides.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                    aria-label={`Ir para banner ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* LEGITIMACY & TRUST SECTION */}
          <div className="bg-slate-50 border-l-4 border-emerald-600 p-5 rounded-r-xl mb-8 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-700 mt-1">
                <Lock size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                  Transparência e Legalidade
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Verificado</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Diga não a golpes!</strong> Nossa atuação é estritamente técnica e fundamentada na legislação vigente (LGPD, CDC e Marco Civil). 
                  Garantimos contrato de prestação de serviços, emissão de nota fiscal e sigilo absoluto.
                </p>
                <div className="flex gap-4 mt-3 text-xs font-semibold text-emerald-700">
                  <span className="flex items-center gap-1"><FileText size={14}/> Contrato com Garantia</span>
                  <span className="flex items-center gap-1"><Scale size={14}/> Base Legal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button href={getWhatsAppLink()} isExternal>
              <WhatsAppIcon />
              Falar no WhatsApp
            </Button>
            <Button variant="ghost" href="#servicos">
              Conheça os serviços
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col">
              <strong className="text-lg text-emerald-700">
                30 Dias
              </strong>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Prazo Médio</span>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col">
              <strong className="text-lg text-emerald-700">
                100%
              </strong>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Garantido</span>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col">
              <strong className="text-lg text-emerald-700">
                Sigilo
              </strong>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Absoluto</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Card */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-emerald-400/20 blur-[60px] rounded-full pointer-events-none -z-10 translate-y-10"></div>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl shadow-emerald-900/10 sticky top-28">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900">Análise Gratuita</h2>
            <p className="text-slate-600 mb-6 text-sm">
              Fale com um especialista real. Entenda seus direitos e as garantias contratuais do seu caso.
            </p>
            
            <ul className="space-y-3 mb-6">
              {[
                "Atendimento Presencial ou Online",
                "Contrato com Garantia de Resultado",
                "Prazo médio de 30 dias"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 text-sm">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="full" href={getWhatsAppLink()} isExternal>
              <WhatsAppIcon />
              Iniciar atendimento
            </Button>
            <small className="block text-center mt-4 text-xs text-slate-400">
              Rua Hermelino Matarazzo, 786 - Sorocaba/SP
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;