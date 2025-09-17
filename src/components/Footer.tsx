import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Removed unused variables to fix build errors

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg">WAW Energy</h3>
            <p className="text-slate-400 text-sm">Iced Rose — Natural Energy Drink</p>
          </div>
          <div>
            <Link
              to="/buy"
              className="font-black border px-6 py-3 rounded-lg transition-all duration-300 transform"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              style={{ 
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                border: '2px solid #f59e0b',
                boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)',
                textDecoration: 'none'
              }}
            >
              <span style={{
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                textDecoration: 'none'
              }}>
                Buy Iced Rose
              </span>
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-6 pt-6">
          <p className="text-slate-500 text-xs text-center">© {currentYear} WAW Energy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;