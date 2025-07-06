import React from 'react';
import { BarChart3, Calculator, Zap, Github, Share2 } from 'lucide-react';

interface HeaderProps {
  onShare?: () => void;
  showGithub?: boolean;
  githubUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onShare, 
  showGithub = true, 
  githubUrl = "https://github.com/yourusername/trading-risk-calculator" 
}) => {
  return (
    <header className="text-center mb-12">
      {/* Logo/Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <BarChart3 className="w-8 h-8 text-white" />
      </div>
      
      {/* Main Title */}
      <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
        Trading Risk-Reward Calculator
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
        Calculate your potential loss and 2:1 reward targets with precision and confidence
      </p>
      
      {/* Features */}
      <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-400 mb-8">
        <div className="flex items-center hover:text-yellow-400 transition-colors">
          <Zap className="w-4 h-4 mr-2" />
          Real-time calculations
        </div>
        <div className="flex items-center hover:text-cyan-400 transition-colors">
          <Calculator className="w-4 h-4 mr-2" />
          Professional formulas
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4">
        {onShare && (
          <button
            onClick={onShare}
            className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        )}
        
        {showGithub && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <Github className="w-4 h-4 mr-2" />
            View Source
          </a>
        )}
      </div>
    </header>
  );
};