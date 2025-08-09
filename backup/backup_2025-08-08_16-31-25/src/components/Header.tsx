import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 4);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleToggle = () => {
    console.log('Hamburger clicked! Current state:', open);
    setOpen(prev => !prev);
  };

  return (
    <header
      className={
        `sticky top-0 left-0 right-0 z-50 w-full border-b border-secondary-700/50 shadow-lg transition-all duration-300 ` +
        (isScrolled ? 'bg-black/80' : 'bg-black/60')
      }
      style={{
        backdropFilter: isScrolled ? 'blur(18px)' : 'blur(10px)',
        WebkitBackdropFilter: isScrolled ? 'blur(18px)' : 'blur(10px)'
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Go to home">
          <div className="flex items-center gap-3">
            <img src="/src/assets/images/logos/placeholder-logo.svg" alt="WAW Energy Logo" className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">WAW Energy</span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-white/50">POWER YOUR DAY</span>
            </div>
          </div>
        </Link>

        <nav className="flex items-center">
          <NavLink to="/" className={({ isActive }) => `text-sm font-bold uppercase transition-all duration-200 hover:text-green-400 hover:scale-105 ${isActive ? 'text-green-400' : 'text-white'}`} style={{ marginRight: '50px' }}>
            HOME
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-sm font-bold uppercase transition-all duration-200 hover:text-green-400 hover:scale-105 ${isActive ? 'text-green-400' : 'text-white'}`} style={{ marginRight: '50px' }}>
            ABOUT
          </NavLink>
          <NavLink to="/buy" className={({ isActive }) => `text-sm font-bold uppercase transition-all duration-200 hover:text-green-400 hover:scale-105 ${isActive ? 'text-green-400' : 'text-white'}`}>
            BUY
          </NavLink>
        </nav>

        <div className="flex items-center">
          <div className="hidden w-[250px] lg:block"><SearchBar placeholder="Search products..." /></div>
          <div style={{ marginRight: '20px' }}>
            <Hamburger isOpen={open} onToggle={handleToggle} />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 border-t border-secondary-700/50 bg-surface-950 px-6 pb-6 shadow-2xl transform transition-all duration-300 ease-out">
          <div className="py-4">
            <SearchBar placeholder="Search products..." />
          </div>
          <div className="flex flex-col gap-3">
            <NavLink 
              to="/" 
              onClick={() => setOpen(false)} 
              className={({ isActive }) => `rounded-lg px-4 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] ${isActive ? 'bg-primary-500/20 text-primary-400 shadow-glow' : 'text-secondary-200 hover:bg-primary-500/10 hover:text-primary-400'}`}
            >
              🏠 Home
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setOpen(false)} 
              className={({ isActive }) => `rounded-lg px-4 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] ${isActive ? 'bg-primary-500/20 text-primary-400 shadow-glow' : 'text-secondary-200 hover:bg-primary-500/10 hover:text-primary-400'}`}
            >
              ℹ️ About
            </NavLink>
            <NavLink 
              to="/buy" 
              onClick={() => setOpen(false)} 
              className={({ isActive }) => `rounded-lg px-4 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] ${isActive ? 'bg-primary-500/20 text-primary-400 shadow-glow' : 'text-secondary-200 hover:bg-primary-500/10 hover:text-primary-400'}`}
            >
              🛒 Buy
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


