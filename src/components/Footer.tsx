import React from 'react';
// import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'Tropical Storm', href: '/buy' },
        { name: 'Arctic Blast', href: '/buy' },
        { name: 'Citrus Rush', href: '/buy' },
        { name: 'Berry Blast', href: '/buy' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Story', href: '/about' },
        { name: 'Careers', href: '/about' },
        { name: 'Press', href: '/about' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/about' },
        { name: 'Contact Us', href: '/about' },
        { name: 'Shipping Info', href: '/buy' },
        { name: 'Returns', href: '/buy' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/about' },
        { name: 'Terms of Service', href: '/about' },
        { name: 'Cookie Policy', href: '/about' },
        { name: 'Accessibility', href: '/about' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        {/* Main Footer Content - Professional Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Brand Section - Left Side */}
          <div className="lg:w-2/5">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">⚡</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">WAW Energy</h3>
                  <p className="text-sm text-slate-400">Unleash Your Potential</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Premium energy drinks crafted for peak performance and unstoppable focus. 
                Engineered for excellence, powered by innovation.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-md flex items-center justify-center text-sm transition-all duration-200 hover:scale-110"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Link Columns - Right Side */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-slate-400 hover:text-white transition-colors duration-200 text-sm block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-3">
              Stay Energized with WAW Energy
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Get the latest updates on new flavors, exclusive offers, and energy tips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Button
                variant="primary"
                size="sm"
                icon="📧"
                iconPosition="left"
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-slate-500 text-sm">
                © {currentYear} WAW Energy. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/about" className="text-slate-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-slate-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/about" className="text-slate-500 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;