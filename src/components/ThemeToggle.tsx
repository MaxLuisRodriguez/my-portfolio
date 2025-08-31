import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 shadow hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
      {isDark ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeToggle;


