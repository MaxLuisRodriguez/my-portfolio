import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('Theme toggle clicked! Current theme:', isDark ? 'dark' : 'light');
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative inline-flex items-center gap-2 focus:outline-none transition-all duration-300 cursor-pointer px-3 py-2 transform"
      aria-label="Toggle theme"
      style={{ backgroundColor: 'transparent' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Icon */}
      <div className="text-lg">
        {isDark ? '🌙' : '☀️'}
      </div>
      
      {/* Bold green text matching hamburger */}
      <span 
        className="font-bold uppercase tracking-wider transition-all duration-300"
        style={{ 
          color: '#22c55e', // Same green as hamburger
          fontSize: '14px'
        }}
      >
        {isDark ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
};

export default ThemeToggle;


