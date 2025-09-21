import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';
// import Logo from './Logo';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import CartDropdown from './CartDropdown';
import { brand } from '../config/brand';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { isDark } = useTheme();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <header 
      className="sticky top-0 z-50 border-b border-gold-500/30 transition-all duration-300"
      style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
                <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    const div = e.currentTarget.querySelector('div');
                    if (img) img.style.transform = 'scale(1.02)';
                    if (div) div.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    const div = e.currentTarget.querySelector('div');
                    if (img) img.style.transform = 'scale(1)';
                    if (div) div.style.transform = 'scale(1)';
                  }}
                >
              <div className="w-6 h-6 overflow-hidden rounded-md bg-gray-200 transform transition-transform duration-300 ease-out">
                <img 
                  src={brand.logoSrc} 
                  alt="WAW Energy Logo" 
                  className="w-6 h-6 object-cover transition-transform duration-300 ease-out transform"
                  style={{
                    width: '140px',
                    height: '140px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '0.675rem', // 6px rounded corners
                    willChange: 'transform',
                  }}
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span 
                  className="text-lg font-black tracking-tight transition-all duration-300"
                  style={isDark ? {
                    background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                    textDecoration: 'none'
                  } : {
                    color: '#1a1a1a',
                    textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(26,26,26,0.6)',
                    filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))',
                    textDecoration: 'none'
                  }}
                >
                  WAW Energy
                </span>
                <span 
                  className="text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  style={isDark ? {
                    background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5), 0 0 8px rgba(255,215,0,0.2)',
                    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.6))',
                    textDecoration: 'none'
                  } : {
                    color: '#1a1a1a',
                    textShadow: '1px 1px 2px rgba(255,255,255,0.8), 0 0 8px rgba(26,26,26,0.4)',
                    filter: 'drop-shadow(1px 1px 1px rgba(255,255,255,0.8))',
                    textDecoration: 'none'
                  }}
                >
                  POWER YOUR DAY
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation - Centered on Screen */}
          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-12">
              <NavLink 
                to="/" 
                className="font-black uppercase transition-all duration-200 transform" 
                style={isDark ? {
                  marginRight: '75px', 
                  fontSize: '36px',
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                } : {
                  marginRight: '75px', 
                  fontSize: '36px',
                  color: '#1a1a1a',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(26,26,26,0.6)',
                  filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                HOME
              </NavLink>
              <NavLink 
                to="/about" 
                className="font-black uppercase transition-all duration-200 transform" 
                style={isDark ? {
                  marginRight: '75px', 
                  fontSize: '36px',
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                } : {
                  marginRight: '75px', 
                  fontSize: '36px',
                  color: '#1a1a1a',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(26,26,26,0.6)',
                  filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                ABOUT
              </NavLink>
              <NavLink 
                to="/buy" 
                className="font-black uppercase transition-all duration-200 transform" 
                style={isDark ? {
                  fontSize: '36px',
                  marginRight: '10px', 
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                } : {
                  fontSize: '36px',
                  marginRight: '10px', 
                  color: '#1a1a1a',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(26,26,26,0.6)',
                  filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                BUY
              </NavLink>
            </div>
          </nav>

          {/* Right Side - Search, Cart, Theme Toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden lg:block w-48">
              <SearchBar placeholder="Search products..." />
            </div>
            
            {/* Note: Shopping Cart functionality now handled by Shopify Buy Button */}
            {/* Legacy cart hidden - using Shopify native cart instead */}
            <div className="relative" style={{ display: 'none' }}>
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
            <div style={{ marginLeft: '20px' }}>
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        {/* Premium Mobile Dropdown Menu */}
        {open && (
          <div className="lg:hidden border-t border-gold-500/30 overflow-hidden" style={{ backgroundColor: isDark ? '#000000' : '#ffffff', marginLeft: '18px', marginRight: '18px' }}>
            <div className="px-4 pt-6 pb-6 space-y-4 max-w-full">
              {/* Premium Mobile Navigation Links */}
              <Link 
                to="/" 
                className="block px-4 py-4 mx-2 rounded-xl font-black uppercase tracking-wider text-lg transition-all duration-300 hover:scale-101 transform origin-center"
                style={isDark ? {
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                } : {
                  color: '#1a1a1a',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(26,26,26,0.6)',
                  filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                }}
                onClick={() => setOpen(false)}
              >
                🏠 HOME
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-4 mx-2 rounded-xl font-black uppercase tracking-wider text-lg transition-all duration-300 hover:scale-101 transform origin-center"
                style={isDark ? {
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                } : {
                  color: '#1a1a1a',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(26,26,26,0.6)',
                  filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                }}
                onClick={() => setOpen(false)}
              >
                🌿 ABOUT
              </Link>
              <Link 
                to="/buy" 
                className="block px-4 py-4 mx-2 rounded-xl font-black uppercase tracking-wider text-lg transition-all duration-300 hover:scale-101 transform origin-center"
                style={isDark ? {
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                } : {
                  color: '#1a1a1a',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(26,26,26,0.6)',
                  filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                }}
                onClick={() => setOpen(false)}
              >
                ⚡ BUY
              </Link>
              
              {/* Premium Mobile Search Bar */}
              <div className="px-2 py-4 border-t border-gold-500/20 mt-6 mx-2 max-w-full overflow-hidden">
                <div className="w-full max-w-sm mx-auto">
                  <SearchBar placeholder="Search energy drinks..." />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


