import React from 'react';
import { ShieldCheck, Gavel, MapPin, FileText, Lock, Clock } from 'lucide-react';

const reasons = [
  {
    icon: Gavel,
    title: "Atuação 100% Jurídica",
    description: "Nada de 'jeitinho'. Usamos a lei (CDC e Lei do Sigilo) para defender seus direitos no tribunal."
  },
  {
    icon: FileText,
    title: "Contrato Transparente",
    description: "Todas as garantias, prazos e deveres estão em contrato assinado. Segurança total para você."
  },
  {
    icon: ShieldCheck,
    title: "Garantia de Resultado",
    description: "Para serviços de Limpa Nome e Score, se não entregarmos o prometido, devolvemos seu investimento."
  },
  {
    icon: MapPin,
    title: "Escritório Físico",
    description: "Somos reais. Sede própria em Sorocaba/SP. Venha tomar um café e conhecer nossa equipe."
  },
  {
    icon: Lock,
    title: "Sigilo Absoluto",
    description: "Seus dados e sua situação financeira são protegidos. Ninguém saberá que você contratou o serviço."
  },
  {
    icon: Clock,
    title: "Agilidade Comprovada",
    description: "Graças à nossa expertise técnica, conseguimos liminares e resultados em tempo recorde (média 30 dias)."
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-brand font-bold text-sm uppercase tracking-wider">Nossos Diferenciais</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Por que escolher o Minuto Crédito?</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Fuja de promessas vazias. Entregamos solução técnica, jurídica e garantida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <div key={index} className="flex gap-4 items-start p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-white p-3 rounded-xl text-brand shadow-sm shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;