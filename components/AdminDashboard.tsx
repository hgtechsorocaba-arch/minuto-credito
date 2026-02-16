import React, { useState } from 'react';
import { useSiteData } from '../context/SiteContext';
import { HeroSlide, ServiceItem } from '../types';
import { Trash2, Plus, Sparkles, Layout, Image as ImageIcon, Briefcase, Settings, LogOut, Menu, X, Upload, Loader2, Check, RefreshCw } from 'lucide-react';
import { ICON_MAP } from '../utils/icons';
import { GoogleGenAI, Type } from "@google/genai";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { config, updateConfig, addSlide, removeSlide, addService, removeService } = useSiteData();
  const [activeTab, setActiveTab] = useState<'banners' | 'services' | 'settings'>('banners');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form States
  const [newSlide, setNewSlide] = useState<Partial<HeroSlide>>({ title: '', text: '', pill: '', backgroundImage: '' });
  const [newService, setNewService] = useState<Partial<ServiceItem>>({ title: '', description: '', note: '', iconName: 'ShieldCheck' });
  
  // AI States
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiTopic, setAiTopic] = useState('');

  // Preview States for Images
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'logo' | 'background' | 'slide' | null>(null);

  // Helper: Safely access API Key
  const getApiKey = () => {
    try {
      if (typeof process !== 'undefined' && process.env) {
        return process.env.API_KEY;
      }
    } catch (e) {
      console.warn("Failed to access process.env");
    }
    return undefined;
  };

  // Helper: File to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // AI Logic: Text Generation (Banners)
  const generateBannerTextAI = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      alert("API Key is missing. Please ensure process.env.API_KEY is configured.");
      return;
    }
    
    setIsGeneratingAI(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const promptTopic = aiTopic || "Credit Repair and Score Increase";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a catchy hero banner title, a short persuasive description (max 20 words), and a short 2-3 word pill/badge for a service about "${promptTopic}" for a company named "Minuto Crédito".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              text: { type: Type.STRING },
              pill: { type: Type.STRING }
            }
          }
        }
      });

      let jsonString = response.text || '{}';
      if (jsonString.includes('```json')) {
        jsonString = jsonString.replace(/```json\n?/, '').replace(/```/, '');
      } else if (jsonString.includes('```')) {
         jsonString = jsonString.replace(/```\n?/, '').replace(/```/, '');
      }

      const data = JSON.parse(jsonString);
      if (data.title) {
        setNewSlide(prev => ({
          ...prev,
          title: data.title,
          text: data.text,
          pill: data.pill
        }));
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // AI Logic: Image Generation (Logo/Background/Slide)
  const generateImageAI = async (type: 'logo' | 'background' | 'slide') => {
    const apiKey = getApiKey();
    if (!apiKey) {
      alert("API Key is missing.");
      return;
    }

    setIsGeneratingAI(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      let prompt = "";
      
      if (type === 'logo') {
        prompt = "A modern, minimalist vector logo for 'Minuto Crédito', a financial services company. Green and dark blue color scheme. White background. High resolution, centered, minimal padding.";
      } else if (type === 'background') {
        prompt = "A professional, high-quality blurred office background for a financial website hero section. Bright, clean, corporate atmosphere.";
      } else if (type === 'slide') {
        // Use the current slide title/topic for context if available
        const context = newSlide.title || aiTopic || "financial success";
        prompt = `A professional, abstract, high-quality background image representing '${context}' for a corporate website. Subtle colors, suitable for overlaying text.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
      });

      // Extract image from response
      let imageUrl = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        // Instead of updating immediately, set preview
        setPreviewImage(imageUrl);
        setPreviewType(type);
      } else {
        alert("No image generated.");
      }

    } catch (error) {
      console.error("AI Image Generation Error:", error);
      alert("Failed to generate image.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const confirmPreview = () => {
    if (previewImage && previewType) {
      if (previewType === 'logo') {
        updateConfig({ ...config, logoImage: previewImage });
      } else if (previewType === 'background') {
        updateConfig({ ...config, heroBackgroundImage: previewImage });
      } else if (previewType === 'slide') {
        setNewSlide({ ...newSlide, backgroundImage: previewImage });
      }
      // Close preview
      setPreviewImage(null);
      setPreviewType(null);
    }
  };

  const discardPreview = () => {
    setPreviewImage(null);
    setPreviewType(null);
  };

  const regeneratePreview = () => {
    if (previewType) {
      // Keep modal open but show loading state
      generateImageAI(previewType);
    }
  };

  const handleAddSlide = () => {
    if (newSlide.title && newSlide.text) {
      addSlide({
        id: Date.now().toString(),
        title: newSlide.title || '',
        text: newSlide.text || '',
        pill: newSlide.pill || 'Novo',
        backgroundImage: newSlide.backgroundImage
      });
      setNewSlide({ title: '', text: '', pill: '', backgroundImage: '' });
      setAiTopic('');
    }
  };

  const handleAddService = () => {
    if (newService.title) {
      addService({
        id: Date.now().toString(),
        title: newService.title || '',
        description: newService.description || '',
        note: newService.note || '',
        iconName: newService.iconName || 'ShieldCheck'
      });
      setNewService({ title: '', description: '', note: '', iconName: 'ShieldCheck' });
    }
  };

  const NavItem = ({ id, icon: Icon, label }: any) => (
    <button
      onClick={() => { setActiveTab(id); setMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === id ? 'bg-brand text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
      
      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Sparkles size={18} className="text-purple-600" />
                Vista prévia (IA) - {previewType === 'logo' ? 'Logo' : previewType === 'background' ? 'Banner Geral' : 'Slide Banner'}
              </h3>
              <button onClick={discardPreview} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-slate-100 flex items-center justify-center flex-1 overflow-auto min-h-[300px]">
              {isGeneratingAI ? (
                 <div className="flex flex-col items-center gap-3 text-slate-500">
                    <Loader2 className="animate-spin text-purple-600" size={32} />
                    <span className="text-sm font-medium">Gerando nova versão...</span>
                 </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md bg-white w-full">
                   {/* Checkerboard background for transparency */}
                   <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                   <img 
                      src={previewImage} 
                      alt="Generated Preview" 
                      className={`relative z-10 w-full object-contain ${previewType === 'logo' ? 'h-48' : 'h-64 object-cover'}`} 
                   />
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-2 gap-3">
               <button 
                onClick={regeneratePreview}
                disabled={isGeneratingAI}
                className="col-span-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
               >
                 {isGeneratingAI ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                 Gerar Nova
               </button>
               
               <button 
                onClick={confirmPreview}
                disabled={isGeneratingAI}
                className="col-span-1 py-3 px-4 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
               >
                 <Check size={18} />
                 {previewType === 'slide' ? 'Usar Imagem' : 'Publicar'}
               </button>
               
               <button 
                 onClick={discardPreview}
                 className="col-span-2 text-xs text-slate-500 font-medium hover:text-red-500 py-2"
               >
                 Descartar e Cancelar
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="font-bold text-slate-900">Painel Admin</div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-extrabold text-slate-900">MC Admin</h2>
          <p className="text-xs text-slate-500">Gerenciamento do Site</p>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem id="banners" icon={Layout} label="Banners (Hero)" />
          <NavItem id="services" icon={Briefcase} label="Produtos/Serviços" />
          <NavItem id="settings" icon={Settings} label="Configurações (Logo)" />
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200">
          <button onClick={onLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm px-4 py-2">
            <LogOut size={18} /> Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          <h1 className="text-2xl font-bold text-slate-900 mb-8 capitalize">
            Gerenciar {activeTab}
          </h1>

          {/* BANNERS TAB */}
          {activeTab === 'banners' && (
            <div className="space-y-8">
              {/* Creator */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h3 className="text-lg font-bold text-slate-800">Criar Novo Banner</h3>
                  
                  {/* AI Text Generator Controls */}
                  <div className="flex gap-2 w-full md:w-auto">
                    <input 
                      type="text" 
                      placeholder="Tópico (ex: Limpa Nome)" 
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm w-full md:w-48"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                    />
                    <button 
                      onClick={generateBannerTextAI}
                      disabled={isGeneratingAI}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold hover:bg-purple-200 transition-colors whitespace-nowrap disabled:opacity-50"
                    >
                      {isGeneratingAI ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                      {isGeneratingAI ? 'Criando...' : 'Texto IA'}
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <input 
                    type="text" 
                    placeholder="Título Principal" 
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                    value={newSlide.title}
                    onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
                  />
                  <textarea 
                    placeholder="Texto descritivo" 
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                    rows={3}
                    value={newSlide.text}
                    onChange={(e) => setNewSlide({...newSlide, text: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Texto da Etiqueta (ex: 'Novo', 'Garantido')" 
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                    value={newSlide.pill}
                    onChange={(e) => setNewSlide({...newSlide, pill: e.target.value})}
                  />

                  {/* Banner Image Section */}
                  <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                     <label className="block text-sm font-semibold text-slate-700 mb-3">Imagem de Fundo (Opcional)</label>
                     <div className="flex flex-col gap-3">
                        {newSlide.backgroundImage && (
                          <div className="h-32 w-full rounded-lg bg-slate-200 overflow-hidden relative border border-slate-300">
                             <img src={newSlide.backgroundImage} className="w-full h-full object-cover" alt="Preview" />
                             <button 
                               onClick={() => setNewSlide({...newSlide, backgroundImage: ''})}
                               className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                             >
                               <X size={14} />
                             </button>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                           <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium">
                              <Upload size={16} />
                              <span>Upload</span>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setNewSlide({...newSlide, backgroundImage: url}))} />
                           </label>
                           <button 
                             onClick={() => generateImageAI('slide')}
                             disabled={isGeneratingAI}
                             className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-200 text-sm font-medium"
                           >
                             <Sparkles size={16} />
                             <span>Gerar Imagem</span>
                           </button>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={handleAddSlide}
                    className="w-full py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark transition-colors flex justify-center items-center gap-2 mt-2"
                  >
                    <Plus size={20} /> Adicionar Banner
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800">Banners Ativos</h3>
                {config.slides.map((slide, idx) => (
                  <div key={slide.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center group relative overflow-hidden">
                    {/* Tiny background preview strip */}
                    {slide.backgroundImage && (
                       <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cover bg-center" style={{backgroundImage: `url(${slide.backgroundImage})`}}></div>
                    )}
                    <div className="pl-3">
                      <span className="text-xs font-bold text-brand uppercase">{slide.pill}</span>
                      <h4 className="font-bold text-slate-900">{slide.title}</h4>
                      <p className="text-sm text-slate-500 truncate max-w-md">{slide.text}</p>
                    </div>
                    <button 
                      onClick={() => removeSlide(slide.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              {/* Creator */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Serviço</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Nome do Serviço" 
                      className="col-span-1 p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                      value={newService.title}
                      onChange={(e) => setNewService({...newService, title: e.target.value})}
                    />
                    <select 
                      className="col-span-1 p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                      value={newService.iconName}
                      onChange={(e) => setNewService({...newService, iconName: e.target.value})}
                    >
                      {Object.keys(ICON_MAP).map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <textarea 
                    placeholder="Descrição completa" 
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                    rows={2}
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Nota de rodapé (ex: 'Base legal sólida')" 
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                    value={newService.note}
                    onChange={(e) => setNewService({...newService, note: e.target.value})}
                  />
                  <button 
                    onClick={handleAddService}
                    className="w-full py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark transition-colors flex justify-center items-center gap-2"
                  >
                    <Plus size={20} /> Salvar Serviço
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-slate-800">Serviços Listados</h3>
                {config.services.map((svc) => (
                  <div key={svc.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                         {/* Icon Preview */}
                         {React.createElement(ICON_MAP[svc.iconName] || ICON_MAP['ShieldCheck'], { size: 20 })}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{svc.title}</h4>
                        <p className="text-sm text-slate-500 max-w-md">{svc.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeService(svc.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Identidade Visual</h3>
                
                <div className="space-y-8">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nome da Empresa (Logo Texto)</label>
                    <input 
                      type="text" 
                      className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                      value={config.logoText}
                      onChange={(e) => updateConfig({...config, logoText: e.target.value})}
                    />
                  </div>
                  
                  {/* Logo Image */}
                  <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">Imagem do Logo</label>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-auto h-40 min-w-[160px] rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm shrink-0 p-2">
                        {config.logoImage ? (
                          <img src={config.logoImage} alt="Logo Preview" className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="text-slate-300" size={32} />
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-4">
                         <div className="flex gap-2">
                           {/* File Upload Button */}
                           <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
                              <Upload size={16} />
                              <span>Enviar Arquivo</span>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => updateConfig({...config, logoImage: url}))} />
                           </label>
                           
                           {/* AI Generation Button */}
                           <button 
                             onClick={() => generateImageAI('logo')}
                             disabled={isGeneratingAI}
                             className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-200 transition-colors"
                           >
                             {isGeneratingAI ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                             <span>Criar com IA</span>
                           </button>
                         </div>
                         <input 
                            type="text" 
                            placeholder="Ou cole a URL da imagem..."
                            className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                            value={config.logoImage || ''}
                            onChange={(e) => updateConfig({...config, logoImage: e.target.value})}
                          />
                      </div>
                    </div>
                  </div>

                  {/* Hero Background Image */}
                  <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">Banner Padrão (Fallback)</label>
                    <p className="text-xs text-slate-500 mb-3">Esta imagem será usada se o slide individual não tiver imagem definida.</p>
                    
                    <div className="flex flex-col gap-4">
                      <div className="w-full h-40 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner">
                        <img src={config.heroBackgroundImage} alt="Hero BG Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-3">
                         {/* File Upload Button */}
                         <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium shadow-sm">
                            <Upload size={18} />
                            <span>Enviar Banner Pronto</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => updateConfig({...config, heroBackgroundImage: url}))} />
                         </label>
                         
                         {/* AI Generation Button */}
                         <button 
                           onClick={() => generateImageAI('background')}
                           disabled={isGeneratingAI}
                           className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white border border-transparent rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm shadow-purple-200"
                         >
                           {isGeneratingAI ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                           <span>Gerar Banner com IA</span>
                         </button>
                      </div>
                      
                      <input 
                        type="text" 
                        placeholder="Ou cole a URL da imagem..."
                        className="w-full p-3 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                        value={config.heroBackgroundImage}
                        onChange={(e) => updateConfig({...config, heroBackgroundImage: e.target.value})}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;