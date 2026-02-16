import React from 'react';
import { getWhatsAppLink, DEV_WHATSAPP_NUMBER, DEV_MSG } from '../constants';
import { MapPin, Settings } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const { config } = useSiteData();

  return (
    <footer className="border-t border-slate-200 pt-10 pb-8 bg-white">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        
        {/* Main Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-brand/20 overflow-hidden">
                {config.logoImage ? (
                  <img src={config.logoImage} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  "MC"
                )}
              </div>
              <p className="text-slate-600 font-semibold">
                {config.logoText}
              </p>
            </div>
            
            {/* Physical Address */}
            <div className="flex items-start gap-2 text-sm text-slate-500 max-w-xs">
              <MapPin className="w-4 h-4 text-brand mt-1 flex-shrink-0" />
              <p>
                Rua Hermelino Matarazzo, 786,<br />
                Vila Santana - Sorocaba/SP
              </p>
            </div>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-brand transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-brand">Política de Privacidade</a>
            <a href="#" className="hover:text-brand transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-brand">Termos de Uso</a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <small className="block text-center text-xs text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10">
          Aviso legal: O Minuto Crédito atua com transparência e em conformidade com o Código de Defesa do Consumidor. 
          Resultados garantidos constam expressamente em contrato de prestação de serviços.
        </small>

        {/* Developer CTA Section */}
        <div className="border-t border-slate-100 pt-8 pb-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-slate-700 font-medium">
              Precisa de uma página, landing page ou site?
            </p>
            <a 
              href={getWhatsAppLink(DEV_MSG, DEV_WHATSAPP_NUMBER)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-brand hover:text-white transition-all duration-300 font-bold text-sm border border-slate-200"
            >
              Falar com o Desenvolvedor
            </a>
          </div>
        </div>

        {/* Specific Credits & Admin Access */}
        <div className="flex justify-center items-center mt-6 border-t border-slate-50 pt-4">
           <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
             <span className="opacity-80">Desenvolvido por Frank Santiago</span>
             {onAdminClick && (
               <button 
                onClick={onAdminClick}
                className="p-1 text-slate-300 hover:text-brand transition-colors opacity-60 hover:opacity-100"
                title="Acesso Administrativo"
               >
                 <Settings size={12} />
               </button>
             )}
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;