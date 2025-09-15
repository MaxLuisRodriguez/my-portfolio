import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import CartDropdown from './CartDropdown';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { isDark } = useTheme();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900/95 border-slate-700/50 backdrop-blur-xl' 
        : 'bg-white/95 border-gray-200/50 backdrop-blur-xl'
    }`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Logo />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center">
            <NavLink to="/" className={({ isActive }) => `text-sm font-bold uppercase transition-all duration-200 hover:text-green-400 hover:scale-105 ${isActive ? 'text-green-400' : isDark ? 'text-white' : 'text-gray-900'}`} style={{ marginRight: '50px' }}>
              HOME
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-sm font-bold uppercase transition-all duration-200 hover:text-green-400 hover:scale-105 ${isActive ? 'text-green-400' : isDark ? 'text-white' : 'text-gray-900'}`} style={{ marginRight: '50px' }}>
              ABOUT
            </NavLink>
            <NavLink to="/buy" className={({ isActive }) => `text-sm font-bold uppercase transition-all duration-200 hover:text-green-400 hover:scale-105 ${isActive ? 'text-green-400' : isDark ? 'text-gray-900' : 'text-white'}`}>
              BUY
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block w-48">
              <SearchBar placeholder="Search products..." />
            </div>
            
            {/* Shopping Cart */}
            <div className="relative">
              <button
                onClick={openCart}
                className={`relative p-2 transition-colors text-2xl ${
                  isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                }`}
                aria-label="Shopping cart"
              >
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
              <CartDropdown />
            </div>
            
            <Hamburger isOpen={open} onToggle={handleToggle} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


