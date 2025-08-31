import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ShopifyConfig from '../components/ShopifyConfig';
import ShopifyDashboard from '../components/ShopifyDashboard';
import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';

const ShopifyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'config' | 'dashboard'>('config');

  const tabs = [
    { id: 'config', label: 'Configuration', icon: '⚙️' },
    { id: 'dashboard', label: 'Setup Guide', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-black uppercase tracking-tight text-white mb-4">
              Shopify Integration
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Set up and configure your Shopify store integration with our step-by-step guide and configuration tools.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-slate-800 rounded-xl p-2 border border-blue-600/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'config' | 'dashboard')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-blue-200 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {activeTab === 'config' ? (
              <ShopifyConfig />
            ) : (
              <ShopifyDashboard />
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Why Use Our Integration Guide?</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Streamline your Shopify setup process with our comprehensive tools and guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📝',
                title: 'Step-by-Step Setup',
                description: 'Follow our detailed guide to create and configure your Shopify app correctly.'
              },
              {
                icon: '🔐',
                title: 'Secure Configuration',
                description: 'Safely store and manage your Shopify credentials with our configuration tools.'
              },
              {
                icon: '📚',
                title: 'Comprehensive Resources',
                description: 'Access all the documentation and tools you need in one place.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Overview Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">What You'll Accomplish</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Create Your Shopify App',
                  description: 'Set up a private app with the right permissions for your integration needs.'
                },
                {
                  step: '2',
                  title: 'Configure Credentials',
                  description: 'Securely store your API keys, access tokens, and webhook secrets.'
                },
                {
                  step: '3',
                  title: 'Set Up Webhooks',
                  description: 'Configure real-time data synchronization between Shopify and your platform.'
                },
                {
                  step: '4',
                  title: 'Test & Validate',
                  description: 'Ensure everything is working correctly before going live.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-slate-800 rounded-xl border border-blue-600/30"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-blue-200">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600/10 to-blue-500/10">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-200 mb-8">
              Begin your Shopify integration journey with our comprehensive setup guide and configuration tools.
            </p>
            <Button
              onClick={() => setActiveTab('config')}
              variant="primary"
              size="lg"
              className="shadow-lg shadow-blue-500/25"
            >
              Start Configuration
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShopifyPage;
