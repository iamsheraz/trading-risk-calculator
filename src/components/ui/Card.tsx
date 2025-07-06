import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface MetricCardProps {
  title: string;
  subtitle?: string;
  value: string;
  percentage?: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  textColor: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}) => {
  const variants = {
    default: 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/20 shadow-2xl',
    gradient: 'bg-gradient-to-r backdrop-blur-lg shadow-2xl',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  return (
    <div className={`rounded-3xl ${variants[variant]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  value,
  percentage,
  icon: Icon,
  gradient,
  borderColor,
  textColor,
  hover = true,
}) => {
  return (
    <Card
      variant="gradient"
      className={`${gradient} border ${borderColor} ${
        hover ? 'transform hover:scale-105 transition-all duration-300' : ''
      }`}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient.replace('/20', '').replace('/30', '')} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {subtitle && <p className={`${textColor} text-sm`}>{subtitle}</p>}
        </div>
      </div>
      <p className={`text-4xl font-bold ${textColor} mb-2`}>{value}</p>
      {percentage && <p className={`${textColor} text-sm font-medium`}>({percentage})</p>}
    </Card>
  );
};