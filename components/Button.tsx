import React from 'react';
import { getWhatsAppLink } from '../constants';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'full';
  children: React.ReactNode;
  href?: string;
  isExternal?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  href, 
  isExternal = false, 
  className = '',
  onClick
}) => {
  // Added 'gap-2' for proper icon spacing
  const baseStyles = "inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0";
  
  const variants = {
    // Green gradient matching WhatsApp vibe
    primary: "bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/30 border border-transparent",
    // Ghost button adaptable for light backgrounds (dark text)
    ghost: "bg-transparent text-slate-700 border border-slate-300 hover:border-brand hover:text-brand hover:bg-brand/5",
    // Full width green button
    full: "w-full bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/30 border border-transparent"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        target={isExternal ? "_blank" : undefined} 
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={combinedClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;