import React from 'react';
import placeholderLogo from '../assets/images/logos/placeholder-logo.svg';

interface LogoProps {
  className?: string;
  src?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', src }) => {
  const logoSrc = src ?? placeholderLogo;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
        <img src={logoSrc} alt="Company logo" className="absolute inset-0 h-full w-full object-contain p-1.5" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-tight text-white">WAW Energy</span>
        <span className="text-xs font-medium uppercase tracking-wider text-white opacity-70">POWER YOUR DAY</span>
      </div>
    </div>
  );
};

export default Logo;


