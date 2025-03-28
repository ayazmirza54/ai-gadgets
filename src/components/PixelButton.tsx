import React from 'react';

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function PixelButton({ children, onClick, variant = 'primary', className = '' }: PixelButtonProps) {
  const baseStyles = "relative px-6 py-2 font-bold transition-transform hover:translate-y-[2px] active:translate-y-[4px]";
  const variantStyles = {
    primary: "bg-[#B427FF] text-white border-b-4 border-r-4 border-[#8a1dc7] hover:border-b-2 hover:border-r-2 active:border-b-0",
    secondary: "bg-[#4DEEEA] text-[#0A0A0A] border-b-4 border-r-4 border-[#3ab9b6] hover:border-b-2 hover:border-r-2 active:border-b-0"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {children}
    </button>
  );
}