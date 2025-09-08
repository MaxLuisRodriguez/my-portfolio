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
              className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold border border-emerald-500/40 px-4 py-2 rounded-lg transition-colors"
            >
              Buy Iced Rose
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