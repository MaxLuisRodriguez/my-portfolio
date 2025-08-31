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
      className={`group relative inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-green-500 bg-green-500 bg-opacity-30 hover:bg-opacity-60 hover:border-green-400 hover:scale-105 focus:outline-none transition-all duration-200 cursor-pointer ${className}`}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span className="text-white text-xl font-bold leading-none group-hover:text-green-300 transition-colors duration-200">≡</span>
    </button>
  );
};

export default Hamburger;


