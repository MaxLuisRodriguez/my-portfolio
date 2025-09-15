import React from 'react';

interface LogoProps {
  className?: string;
  src?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', src }) => {
  const logoSrc = src || '/logo.png';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-2 h-2 overflow-hidden rounded-lg">
        <img 
          src={logoSrc} 
          alt="WAW Energy Logo" 
          // w-full h-full object-cover
          className=""
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-tight text-white">WAW Energy</span>
        <span className="text-xs font-medium uppercase tracking-wider text-white opacity-70">POWER YOUR DAY</span>
      </div>
    </div>
  );
};

export default Logo;


