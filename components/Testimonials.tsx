import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, CheckCircle } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 border-y border-slate-100 bg-slate-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-slate-900">Histórias de Sucesso</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Junte-se a milhares de clientes que recuperaram o poder de compra e a tranquilidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <article 
              key={index}
              className="flex flex-col h-full p-8 rounded-2xl border border-slate-200 bg-white hover:border-brand/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              
              <p className="text-slate-700 italic mb-6 leading-relaxed flex-grow text-sm md:text-base relative">
                 <span className="text-4xl text-slate-200 absolute -top-4 -left-2 font-serif">"</span>
                 {testimonial.text}
              </p>
              
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <strong className="text-slate-900 text-sm font-bold">{testimonial.author}</strong>
                    <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold flex items-center gap-0.5">
                      <CheckCircle size={8} /> Cliente
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs">{testimonial.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;