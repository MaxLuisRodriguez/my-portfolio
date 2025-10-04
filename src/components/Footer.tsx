import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-300">
            © 2024 Your Name. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://github.com/yourusername" className="text-gray-300 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" className="text-gray-300 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;