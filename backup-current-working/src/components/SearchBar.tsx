import React, { useState } from 'react';

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
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 pr-10 text-white placeholder-white/50 shadow-sm backdrop-blur focus:border-brand.primary/60 focus:outline-none focus:ring-2 focus:ring-brand.primary/20"
          aria-label={placeholder}
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 rounded-md bg-brand.primary px-3 py-1.5 text-sm font-semibold text-brand.primary-foreground shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand.primary/30"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;


