import React from 'react';
import { useSiteData } from '../context/SiteContext';
import { getIconComponent } from '../utils/icons';

const Services: React.FC = () => {
  const { config } = useSiteData();

  return (
    <section id="servicos" className="py-20 border-y border-slate-100 bg-slate-50">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3 tracking-tight text-slate-900">Nossos serviços</h2>
          <p className="text-slate-600 text-lg max-w-2xl">
            Soluções combinadas para limpar seu nome, elevar score e proteger sua reputação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((service) => {
            const Icon = getIconComponent(service.iconName);
            return (
              <article 
                key={service.id}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-lg bg-brand/10 text-brand-dark flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <small className="block text-xs text-slate-500 border-t border-slate-100 pt-3">
                  {service.note}
                </small>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;