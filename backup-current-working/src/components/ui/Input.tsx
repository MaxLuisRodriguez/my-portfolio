import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outlined' | 'filled' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  state?: 'default' | 'success' | 'error' | 'warning';
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'md',
  state = 'default',
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = 'lg',
  className,
  id,
  ...props
}, ref) => {
  const baseClasses = 'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-slate-800 border border-blue-600 text-white placeholder-blue-400 focus:border-blue-500 focus:ring-blue-500/20',
    outlined: 'bg-transparent border-2 border-blue-600 text-white placeholder-blue-400 focus:border-blue-500 focus:ring-blue-500/20',
    filled: 'bg-slate-700 border border-transparent text-white placeholder-slate-400 focus:bg-slate-800 focus:border-blue-500 focus:ring-blue-500/20',
    glass: 'bg-slate-800/50 backdrop-blur-sm border border-white/10 text-white placeholder-slate-400 focus:bg-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
  };

  const states = {
    default: '',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
    warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-4 text-base',
    xl: 'px-6 py-5 text-lg'
  };

  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const inputClasses = cn(
    baseClasses,
    variants[variant],
    states[state],
    sizes[size],
    roundedClasses[rounded],
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    fullWidth && 'w-full',
    className
  );

  const containerClasses = cn(
    'relative',
    fullWidth && 'w-full'
  );

  const labelClasses = cn(
    'block text-sm font-medium text-blue-200 mb-2',
    state === 'error' && 'text-red-400',
    state === 'success' && 'text-green-400',
    state === 'warning' && 'text-yellow-400'
  );

  const helperClasses = cn(
    'mt-1 text-xs',
    state === 'error' ? 'text-red-400' : 'text-slate-400'
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-slate-400">{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-400">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <p className={helperClasses}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
