import { ServiceItem, TestimonialItem, FAQItem, StepItem } from './types';

export const WHATSAPP_NUMBER = "5515988136215";
export const DEFAULT_MSG = "Olá! Quero avaliação do meu caso (liminar, score, rating, remoção de links/reclamações).";
export const DEFAULT_HERO_BG = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000";

// Developer Contact
export const DEV_WHATSAPP_NUMBER = "5515988136215";
export const DEV_MSG = "Olá! Tenho interesse em uma landing page/site.";

export const getWhatsAppLink = (msg: string = DEFAULT_MSG, number: string = WHATSAPP_NUMBER) => {
  const text = encodeURIComponent(msg);
  return `https://wa.me/${number}?text=${text}`;
};

export const HERO_SLIDES = [
  {
    title: "Limpeza de Nome via Liminar Judicial",
    text: "Atuamos judicialmente para retirar apontamentos (SPC/Serasa/Boa Vista), permitindo que você recupere seu crédito em cerca de 30 dias enquanto a discussão jurídica ocorre.",
    pill: "Resultado em ~30 dias"
  },
  {
    title: "Aumento de Score Garantido",
    text: "Serviço exclusivo com garantia contratual. Utilizamos métodos validados (blindagem e reestruturação de perfil) para alavancar sua pontuação de forma segura.",
    pill: "Garantia em Contrato"
  },
  {
    title: "Restituição de Rating Bancário",
    text: "Seu nome está limpo mas o banco não libera crédito? Resolvemos o problema do 'histórico interno' e lista negra dos bancos.",
    pill: "Crédito Liberado"
  },
  {
    title: "Remoção de Links no Google (Jusbrasil)",
    text: "Removemos links do Jusbrasil, Escavador e sites de processos via liminar judicial. Proteja sua reputação e privacidade.",
    pill: "Sigilo Garantido"
  },
  {
    title: "Gestão de Reputação no Reclame Aqui",
    text: "Atuação estratégica para mediação e acordos que visam a remoção ou resolução de reclamações que prejudicam a imagem da sua empresa.",
    pill: "Gestão de Crise"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "service-1",
    iconName: "Scale",
    title: "Limpeza de nome (Liminar)",
    description: "Medida judicial para suspensão da publicidade da dívida. O apontamento sai dos órgãos de proteção (Serasa/SPC) permitindo crédito novo.",
    note: "Base Legal: CDC e Lei do Superendividamento."
  },
  {
    id: "service-2",
    iconName: "TrendingUp",
    title: "Aumento de Score (Blindagem)",
    description: "Técnica de reestruturação de dados cadastrais e blindagem de consultas excessivas que derrubam sua pontuação.",
    note: "Garantia de aumento estabelecida em contrato."
  },
  {
    id: "service-3",
    iconName: "Landmark",
    title: "Rating e Bacen (Registrato)",
    description: "Análise e atuação jurídica para remover apontamentos de prejuízo no SCR (Banco Central) que impedem financiamentos.",
    note: "Limpeza do histórico de prejuízo no SCR."
  },
  {
    id: "service-4",
    iconName: "Search",
    title: "Desindexação Google/Jusbrasil",
    description: "Processo para obrigar sites de busca e agregadores jurídicos a removerem links que expõem seus processos antigos.",
    note: "Proteção à imagem e privacidade."
  },
  {
    id: "service-5",
    iconName: "ShieldCheck",
    title: "Defesa do Consumidor",
    description: "Revisão de juros abusivos, defesa em ações de busca e apreensão e negociação de dívidas com deságio.",
    note: "Atuação completa em direito bancário."
  }
];

export const STEPS: StepItem[] = [
  {
    number: "1",
    title: "Análise Gratuita",
    description: "Entre em contato via WhatsApp. Nosso time fará uma triagem completa do seu CPF/CNPJ para identificar apontamentos, score e restrições internas."
  },
  {
    number: "2",
    title: "Contrato e Garantia",
    description: "Apresentamos a proposta formal. Todo serviço é pautado em contrato de prestação de serviços jurídicos, com cláusulas claras de garantia e prazos."
  },
  {
    number: "3",
    title: "Execução e Resultado",
    description: "Protocolamos as medidas (judiciais ou administrativas). O prazo médio para baixa de apontamentos e atualização de score é de 20 a 30 dias."
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    text: "Eu tinha uma dívida antiga que caducou mas continuava sujando meu nome no banco. Fiz o procedimento de Rating e em 40 dias consegui financiar meu carro.",
    author: "Carlos Eduardo",
    location: "São Paulo/SP"
  },
  {
    text: "Empresa séria. Fui até o escritório em Sorocaba com receio, mas me explicaram tudo. O contrato é muito claro. Meu score foi de 280 para 750.",
    author: "Fernanda M.",
    location: "Sorocaba/SP"
  },
  {
    text: "Sou empresário e processos trabalhistas antigos apareciam no Google quando clientes pesquisavam meu nome. Eles removeram tudo do Jusbrasil.",
    author: "Roberto A.",
    location: "Curitiba/PR"
  },
  {
    text: "Já tinha caído em golpe de 'limpa nome' antes. Aqui é diferente porque tem advogado e nota fiscal. A liminar saiu em 15 dias.",
    author: "Juliana Paiva",
    location: "Online"
  },
  {
    text: "Excelente atendimento. Resolveram meu problema no Registrato do Banco Central que eu nem sabia que existia.",
    author: "Marcos V.",
    location: "Campinas/SP"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Isso é legal? Existe lei para limpar nome?",
    answer: "Sim, é 100% legal. Não apagamos a dívida do sistema do credor (banco), isso seria crime. O que fazemos é uma atuação jurídica baseada no Código de Defesa do Consumidor e na Lei do Sigilo Bancário para suspender a 'publicidade' negativa (SPC/Serasa) enquanto a dívida é discutida ou prescreve. É um direito do consumidor questionar apontamentos."
  },
  {
    question: "Vocês garantem o resultado? E se não funcionar?",
    answer: "Trabalhamos com GARANTIA CONTRATUAL. Para serviços de Score e Limpeza de Nome via liminar, se o objetivo não for atingido dentro do prazo estipulado em contrato, devolvemos 100% do valor pago. Nosso compromisso é com a sua satisfação e resolução do problema."
  },
  {
    question: "Qual a diferença entre vocês e os golpes de internet?",
    answer: "A diferença é a transparência e a legalidade. 1) Temos escritório físico e CNPJ ativo. 2) Emitimos Nota Fiscal. 3) Temos contrato assinado por advogados. 4) Não prometemos milagres (ex: 'limpar nome em 2 horas'). Nosso prazo é técnico (média de 30 dias) pois dependemos do judiciário e dos birôs."
  },
  {
    question: "O Score aumenta mesmo? Quanto?",
    answer: "Sim. A pontuação de score é baseada em algoritmos. Ao removermos os apontamentos negativos e realizarmos a 'blindagem' de consultas (footprint), o algoritmo recalcula sua nota para cima. A média de aumento varia de cliente para cliente, mas garantimos uma faixa de pontuação saudável (geralmente acima de 700-800) em contrato."
  },
  {
    question: "Como funciona o pagamento?",
    answer: "O pagamento pode ser facilitado via cartão de crédito, PIX ou boleto. Como envolve custos processuais e taxas judiciais, é necessário uma entrada para protocolar as ações. Tudo é discriminado em contrato."
  },
  {
    question: "Serve para CNPJ (Empresas) também?",
    answer: "Com certeza. Atendemos muitas empresas que precisam limpar o CNPJ para participar de licitações, obter capital de giro ou financiar frotas. As regras para Reabilitação de Crédito de PJ são nossa especialidade."
  },
  {
    question: "Vocês atendem apenas em Sorocaba?",
    answer: "Não. Nossa sede fica em Sorocaba/SP, onde recebemos clientes presencialmente, mas nosso jurídico atua em nível nacional (processos eletrônicos). Temos clientes em todos os estados do Brasil com o mesmo nível de sucesso."
  }
];

export const STATS = [
  { label: "Clientes Atendidos", value: "+3.500" },
  { label: "Dívidas Renegociadas", value: "R$ 12mi+" },
  { label: "Taxa de Sucesso", value: "98%" },
  { label: "Avaliação Google", value: "4.9/5" }
];