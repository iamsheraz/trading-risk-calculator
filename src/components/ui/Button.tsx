import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'toggle';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  active = false,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'font-semibold transition-all duration-300 rounded-xl';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 border border-white/20',
    toggle: active 
      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
      : 'text-gray-300 hover:text-white hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};
export type { ButtonProps };