import React from 'react';

interface HamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, onToggle, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group relative inline-flex h-12 w-12 items-center justify-center focus:outline-none transition-all duration-300 cursor-pointer transform ${className}`}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      style={{ backgroundColor: 'transparent' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Three bars that transform into X */}
      <div style={{ position: 'relative', width: '28px', height: '20px' }}>
        {/* Top bar - rotates to form top-left to bottom-right diagonal of X */}
        <div 
          className="rounded-full transition-all duration-400 ease-in-out absolute"
          style={{ 
            width: '28px',
            height: '4px',
            backgroundColor: '#22c55e',
            top: isOpen ? '8px' : '0px',
            left: '0px',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            opacity: 1
          }}
        />
        {/* Middle bar - fades out */}
        <div 
          className="rounded-full transition-all duration-400 ease-in-out absolute"
          style={{ 
            width: '28px',
            height: '4px',
            backgroundColor: '#22c55e',
            top: '8px',
            left: '0px',
            transform: 'rotate(0deg)',
            opacity: isOpen ? 0 : 1
          }}
        />
        {/* Bottom bar - rotates to form top-right to bottom-left diagonal of X */}
        <div 
          className="rounded-full transition-all duration-400 ease-in-out absolute"
          style={{ 
            width: '28px',
            height: '4px',
            backgroundColor: '#22c55e',
            top: isOpen ? '8px' : '16px',
            left: '0px',
            transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
            opacity: 1
          }}
        />
      </div>
    </button>
  );
};

export default Hamburger;


