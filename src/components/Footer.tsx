import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-300">
            © 2025 Max Rodriguez. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a 
              href="https://github.com/MaxLuisRodriguez" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/max-rodriguez-b05542249/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://www.youtube.com/channel/UCHihab0hHAclV74ndEwBvCQ" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;