import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-secondary-700/50 bg-surface-950">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <div className="space-y-1 text-sm text-secondary-300">
              <p>Email: <a href="mailto:contact@wawenergy.com" className="text-primary-400 hover:text-primary-300">contact@wawenergy.com</a></p>
              <p>Phone: <a href="tel:+1-800-WAW-ENERGY" className="text-primary-400 hover:text-primary-300">1-800-WAW-ENERGY</a></p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-xs text-secondary-400">
            © {new Date().getFullYear()} WAW Energy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;