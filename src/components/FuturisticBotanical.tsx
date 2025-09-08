import React from 'react';
import { motion } from 'framer-motion';

interface FuturisticBotanicalProps {
  variant?: 'floating' | 'corner' | 'background' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  animate?: boolean;
}

// TODO: Replace with actual botanical SVG designs or images when available
const FuturisticBotanical: React.FC<FuturisticBotanicalProps> = ({
  variant = 'floating',
  size = 'md',
  position = 'center',
  animate = true
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'floating':
        return 'absolute z-10 opacity-20 pointer-events-none';
      case 'corner':
        return 'absolute z-0 opacity-10 pointer-events-none';
      case 'background':
        return 'absolute inset-0 z-0 opacity-5 pointer-events-none';
      case 'accent':
        return 'relative z-10 opacity-80';
      default:
        return 'absolute z-10 opacity-20 pointer-events-none';
    }
  };

  // TODO: Replace these with actual botanical SVG paths or images
  const botanicalElements = {
    rose: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="roseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#16a34a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.3" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">
          <circle cx="50" cy="50" r="25" fill="url(#roseGradient)" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.8" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
          <path d="M50,35 Q60,45 50,55 Q40,45 50,35 Z" fill="#16a34a" opacity="0.7" />
          <path d="M35,50 Q45,40 55,50 Q45,60 35,50 Z" fill="#15803d" opacity="0.6" />
          <path d="M50,65 Q60,55 50,45 Q40,55 50,65 Z" fill="#22c55e" opacity="0.5" />
          <path d="M65,50 Q55,60 45,50 Q55,40 65,50 Z" fill="#16a34a" opacity="0.4" />
        </g>
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#16a34a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.5" />
          </linearGradient>
          <filter id="leafGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#leafGlow)">
          <path d="M20,80 Q50,20 80,80 Q50,60 20,80 Z" fill="url(#leafGradient)" />
          <path d="M20,80 Q50,40 80,80" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M30,70 Q50,50 70,70" stroke="#22c55e" strokeWidth="0.5" fill="none" opacity="0.8" />
          <path d="M35,65 Q50,55 65,65" stroke="#f59e0b" strokeWidth="0.3" fill="none" opacity="0.5" />
        </g>
      </svg>
    ),
    circuit: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none">
          <path d="M10,50 L30,50 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70" />
          <path d="M50,10 L50,30 M50,50 L50,90" opacity="0.6" />
          <path d="M10,30 L30,30 M70,30 L90,30" opacity="0.4" />
          <circle cx="30" cy="30" r="3" fill="#22c55e" opacity="0.8" />
          <circle cx="50" cy="50" r="3" fill="#f59e0b" opacity="0.8" />
          <circle cx="70" cy="70" r="3" fill="#22c55e" opacity="0.8" />
          <rect x="25" y="25" width="10" height="10" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.6" />
          <rect x="45" y="45" width="10" height="10" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.6" />
        </g>
      </svg>
    )
  };

  const randomElement = () => {
    const elements = Object.values(botanicalElements);
    return elements[Math.floor(Math.random() * elements.length)];
  };

  return (
    <motion.div
      className={`${getVariantStyles()} ${sizeClasses[size]} ${positionClasses[position]}`}
      initial={animate ? { opacity: 0, scale: 0, rotate: -180 } : {}}
      animate={animate ? { 
        opacity: variant === 'accent' ? 0.8 : 0.3, 
        scale: 1, 
        rotate: 0 
      } : {}}
      transition={{ 
        duration: 2, 
        ease: "easeOut",
        delay: Math.random() * 2
      }}
    >
      <div className={animate ? "animate-botanical-sway" : ""}>
        {/* TODO: Replace with your preferred botanical element */}
        {randomElement()}
      </div>
      
      {/* Cyber scanning effect */}
      {variant === 'accent' && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-cyber-scan opacity-50"></div>
        </div>
      )}
      
      {/* Holographic overlay */}
      {animate && variant !== 'background' && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-gold-500/10 to-primary-500/10 animate-hologram rounded-full"></div>
      )}
    </motion.div>
  );
};

export default FuturisticBotanical;
