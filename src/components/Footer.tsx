import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  // Removed unused variables to fix build errors

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-black text-xl uppercase tracking-wider" style={{
              background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
              fontWeight: '900'
            }}>WAW Energy</h3>
            <p className="font-black text-sm uppercase tracking-wider" style={{
              background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,215,0,0.4), 0 0 20px rgba(255,215,0,0.2)',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.9)) drop-shadow(0 0 6px rgba(255,215,0,0.3))',
              fontWeight: '900'
            }}>Iced Rose — Natural Energy Drink</p>
          </div>
          <div>
            <Link
              to="/buy"
              className="font-black transition-all duration-300 transform shadow-2xl relative overflow-hidden"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              style={{ 
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)',
                border: '3px solid #ffd700',
                borderRadius: '30px',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.1)',
                fontWeight: '900',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '24px',
                paddingRight: '24px',
                textDecoration: 'none'
              }}
            >
              <span className="uppercase tracking-wider font-black" style={{
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
                fontWeight: '900',
                fontSize: '1.2rem',
                textDecoration: 'none'
              }}>
                Buy Iced Rose
              </span>
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-6 pt-6">
          <p className="text-xs text-center" style={{
            color: isDark ? '#9ca3af' : '#374151',
            textShadow: isDark 
              ? '1px 1px 2px rgba(0,0,0,0.3)'
              : '1px 1px 2px rgba(255,255,255,0.5)'
          }}>© {currentYear} WAW Energy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;