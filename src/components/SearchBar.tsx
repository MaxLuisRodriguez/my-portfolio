import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  defaultValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  defaultValue = '',
}) => {
  const [query, setQuery] = useState<string>(defaultValue);
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1 min-w-[220px]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="w-full rounded-xl px-4 py-2 pr-12 font-medium transition-all duration-300 focus:outline-none transform"
          style={{
            backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
            border: `2px solid ${isDark ? '#f59e0b' : '#b8860b'}`,
            color: isDark ? '#daa520' : '#2c1810',
            boxShadow: isDark 
              ? '0 0 15px rgba(245,158,11,0.3), 0 4px 8px rgba(0,0,0,0.3)'
              : '0 0 15px rgba(184,134,11,0.3), 0 4px 8px rgba(255,255,255,0.5)'
          }}
          aria-label={placeholder}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg px-3 py-1 font-bold text-xs uppercase tracking-wide transition-all duration-300 transform"
          style={{
            backgroundColor: isDark ? '#22c55e' : '#b8860b',
            color: isDark ? '#000000' : '#ffffff',
            boxShadow: isDark 
              ? '0 0 10px rgba(34,197,94,0.4)'
              : '0 0 10px rgba(184,134,11,0.4)'
          }}
          aria-label="Search"
        >
          GO
        </button>
      </div>
    </form>
  );
};

export default SearchBar;


