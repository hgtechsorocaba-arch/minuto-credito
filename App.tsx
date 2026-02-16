import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { SiteProvider } from './context/SiteContext';

// Simple Router/Auth Component
const MainContent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check URL for admin access shortcut for demo
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowLogin(true);
    }
    
    // Check local storage for session
    if (localStorage.getItem('admin_session') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Exposed via window for easy access if needed, or via Footer link
  (window as any).openAdmin = () => setShowLogin(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      localStorage.setItem('admin_session', 'true');
    } else {
      alert('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_session');
    // Reset URL
    window.history.pushState({}, '', '/');
  };

  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (showLogin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Acesso Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
              <input 
                type="password" 
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button className="w-full py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark transition-colors">
              Entrar
            </button>
            <button 
              type="button" 
              onClick={() => setShowLogin(false)} 
              className="w-full py-3 text-slate-500 font-medium hover:text-slate-800"
            >
              Voltar ao site
            </button>
          </form>
          <div className="mt-4 text-center text-xs text-slate-400">
            Senha demo: admin123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Stats />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer onAdminClick={() => setShowLogin(true)} />
    </div>
  );
};

function App() {
  return (
    <SiteProvider>
      <MainContent />
    </SiteProvider>
  );
}

export default App;