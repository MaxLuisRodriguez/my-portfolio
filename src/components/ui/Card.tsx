import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDragStart'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  hover?: 'none' | 'lift' | 'glow' | 'scale' | 'border';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: 'none' | 'light' | 'medium' | 'strong';
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = 'lift',
  padding = 'lg',
  rounded = 'xl',
  shadow = 'lg',
  border = 'light',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300';
  
  const variants = {
    default: 'bg-slate-800',
    elevated: 'bg-slate-900 shadow-2xl',
    outlined: 'bg-slate-800 border border-blue-700/50',
    glass: 'bg-slate-800/80 backdrop-blur-xl border border-white/10',
    gradient: 'bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900'
  };

  const hoverEffects = {
    none: '',
    lift: 'hover:shadow-2xl hover:-translate-y-1',
    glow: 'hover:shadow-blue-500/20 hover:shadow-2xl',
    scale: 'hover:scale-105',
    border: 'hover:border-blue-500/50 hover:shadow-blue-500/10'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const roundedClasses = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    '2xl': 'rounded-3xl'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const borderClasses = {
    none: '',
    light: 'border border-blue-700/30',
    medium: 'border border-blue-600/50',
    strong: 'border-2 border-blue-500/70'
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    hoverEffects[hover],
    paddingClasses[padding],
    roundedClasses[rounded],
    shadowClasses[shadow],
    borderClasses[border],
    className
  );

  return (
    <motion.div
      className={classes}
      whileHover={hover !== 'none' ? { y: hover === 'lift' ? -4 : 0 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
