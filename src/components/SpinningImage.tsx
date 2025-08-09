import React from 'react';
import '../App.css';

interface SpinningImageProps {
  src: string;
  alt: string;
  size?: string;
  speed?: string;
  className?: string;
}

const SpinningImage: React.FC<SpinningImageProps> = ({ 
  src, 
  alt, 
  size = "h-24 w-24", 
  speed = "20s",
  className = "" 
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`${size} relative`}
        style={{
          animation: `logo-spin infinite ${speed} linear`,
          transformOrigin: 'center'
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default SpinningImage;
