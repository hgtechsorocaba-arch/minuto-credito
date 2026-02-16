import React from 'react';
import { FAQS } from '../constants';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-brand/10 rounded-full text-brand-dark mb-4">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">Perguntas Frequentes</h2>
          <p className="text-slate-600 text-lg">
            Transparência total. Tire suas dúvidas sobre legalidade, prazos e pagamentos.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <details 
              key={index} 
              className="group border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:border-brand/40 open:bg-slate-50 open:shadow-sm open:border-brand/40"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer text-slate-800 font-bold text-lg select-none hover:text-brand-dark transition-colors">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-brand" />
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-200/50 mt-0 pt-4 text-base">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-slate-500">Ainda tem dúvidas?</p>
          <a href="https://wa.me/5515988136215" target="_blank" className="text-brand font-bold hover:underline mt-1 inline-block">Fale diretamente com um especialista no WhatsApp &rarr;</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;