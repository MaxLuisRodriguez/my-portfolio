import React from 'react';

// get logo to spin
import '../App.css';

interface LogoProps {
  className?: string;
  src?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', src }) => {
  const logoSrc = src || '/logo.png';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
        
        {/* added logo for spin effect */}
        <div className="logo-spin absolute inset-0">
          <img 
            src={logoSrc} 
            alt="Company logo" 
            className="logo h-full w-full object-cover" 
            style={{
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
          />
        </div>
        
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-tight text-white">WAW Energy</span>
        <span className="text-xs font-medium uppercase tracking-wider text-white opacity-70">POWER YOUR DAY</span>
      </div>
    </div>
  );
};

export default Logo;


