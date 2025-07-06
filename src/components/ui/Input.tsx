import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'email';
  icon?: LucideIcon;
  focusColor?: 'blue' | 'red' | 'green' | 'emerald';
  step?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon,
  focusColor = 'blue',
  step,
  className = '',
}) => {
  const focusColorClasses = {
    blue: 'focus:border-blue-400 focus:ring-blue-400/20 group-focus-within:text-blue-400',
    red: 'focus:border-red-400 focus:ring-red-400/20 group-focus-within:text-red-400',
    green: 'focus:border-green-400 focus:ring-green-400/20 group-focus-within:text-green-400',
    emerald: 'focus:border-emerald-400 focus:ring-emerald-400/20 group-focus-within:text-emerald-400',
  };

  return (
    <div className={`group ${className}`}>
      <label className="block text-sm font-semibold text-gray-200 mb-3">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon className={`w-5 h-5 text-gray-400 transition-colors ${focusColorClasses[focusColor]}`} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 ${focusColorClasses[focusColor]} focus:ring-4 transition-all duration-300 text-lg font-medium`}
          placeholder={placeholder}
          step={step}
        />
      </div>
    </div>
  );
};
// At the end of Input.tsx, add:
export type { InputProps };