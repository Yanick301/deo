import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 transition-all duration-300 font-serif uppercase tracking-widest text-sm disabled:opacity-50";
  
  const variants = {
    primary: "bg-brand-black text-white hover:bg-brand-gold hover:text-black border border-brand-black hover:border-brand-gold",
    outline: "bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-white",
    text: "bg-transparent text-brand-black underline hover:text-brand-gold border-none px-0"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};