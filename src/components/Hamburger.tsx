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
      {/* Three bars that compress into one */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '16px', justifyContent: 'center' }}>
        <div 
          className="rounded-full transition-all duration-400 ease-in-out"
          style={{ 
            width: '28px',
            height: '4px',
            backgroundColor: '#22c55e',
            marginBottom: isOpen ? '0px' : '3px',
            transform: isOpen ? 'translateY(2px)' : 'translateY(0px)',
            opacity: 1
          }}
        />
        <div 
          className="rounded-full transition-all duration-400 ease-in-out"
          style={{ 
            width: '28px',
            height: '4px',
            backgroundColor: '#22c55e',
            marginBottom: isOpen ? '0px' : '3px',
            transform: isOpen ? 'scaleY(0)' : 'scaleY(1)',
            opacity: isOpen ? 0 : 1
          }}
        />
        <div 
          className="rounded-full transition-all duration-400 ease-in-out"
          style={{ 
            width: '28px',
            height: '4px',
            backgroundColor: '#22c55e',
            transform: isOpen ? 'translateY(-2px)' : 'translateY(0px)',
            opacity: 1
          }}
        />
      </div>
    </button>
  );
};

export default Hamburger;


