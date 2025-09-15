import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import Button from './ui/Button';

const ShopifyDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'resources' | 'testing'>('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'resources', label: 'Resources', icon: '📚' },
    { id: 'testing', label: 'Testing', icon: '🧪' }
  ];

  const setupSteps = [
    {
      step: '1',
      title: 'Create Private App',
      description: 'Go to Shopify Admin → Apps → Develop apps → Create an app',
      status: 'pending',
      details: 'Configure permissions for products, orders, customers, and webhooks'
    },
    {
      step: '2',
      title: 'Get Credentials',
      description: 'Copy your API key, secret, and access token',
      status: 'pending',
      details: 'Store these securely - you\'ll need them for your integration'
    },
    {
      step: '3',
      title: 'Configure Webhooks',
      description: 'Set up webhook endpoints for real-time updates',
      status: 'pending',
      details: 'Point webhooks to your server endpoints'
    },
    {
      step: '4',
      title: 'Test Integration',
      description: 'Verify everything is working correctly',
      status: 'pending',
      details: 'Use Shopify\'s API testing tools to validate your setup'
    }
  ];

  const resources = [
    {
      title: 'Shopify API Documentation',
      description: 'Complete API reference and guides',
      url: 'https://shopify.dev/api',
      icon: '📖'
    },
    {
      title: 'Webhook Setup Guide',
      description: 'Step-by-step webhook configuration',
      url: 'https://shopify.dev/apps/webhooks',
      icon: '🔗'
    },
    {
      title: 'App Development',
      description: 'Build custom Shopify apps',
      url: 'https://shopify.dev/apps',
      icon: '⚙️'
    },
    {
      title: 'API Testing Tools',
      description: 'Test your API calls and webhooks',
      url: 'https://shopify.dev/apps/tools',
      icon: '🧪'
    }
  ];

  const testingTools = [
    {
      name: 'Shopify CLI',
      description: 'Command-line tools for development and testing',
      command: 'npm install -g @shopify/cli',
      icon: '💻'
    },
    {
      name: 'API Testing',
      description: 'Test your API endpoints with Postman or similar',
      command: 'Use your access token in Authorization header',
      icon: '🌐'
    },
    {
      name: 'Webhook Testing',
      description: 'Use ngrok or similar for local webhook testing',
      command: 'ngrok http 8000',
      icon: '📡'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      default: return '⏳';
    }
  };

  return (
    <Card variant="default" className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Shopify Integration Status</h2>
        <p className="text-blue-200">
          Monitor your setup progress and access helpful resources for your Shopify integration.
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-800 rounded-xl p-2 border border-blue-600/30">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-blue-200 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="max-w-6xl mx-auto">
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Setup Progress */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Setup Progress</h3>
              <div className="space-y-4">
                {setupSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg border border-blue-600/30"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                        <span className={`text-lg ${getStatusColor(step.status)}`}>
                          {getStatusIcon(step.status)}
                        </span>
                      </div>
                      <p className="text-blue-200 mb-1">{step.description}</p>
                      <p className="text-sm text-gray-400">{step.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-slate-800 rounded-xl border border-blue-600/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-200">Setup Progress</p>
                    <p className="text-3xl font-bold text-white">0/4</p>
                  </div>
                  <div className="text-4xl">📈</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-slate-800 rounded-xl border border-blue-600/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-200">Next Step</p>
                    <p className="text-lg font-bold text-white">Create App</p>
                  </div>
                  <div className="text-4xl">🎯</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-slate-800 rounded-xl border border-blue-600/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-200">Estimated Time</p>
                    <p className="text-3xl font-bold text-white">15-30m</p>
                  </div>
                  <div className="text-4xl">⏱️</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeSection === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Helpful Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-slate-800 rounded-xl border border-blue-600/30 hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{resource.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {resource.title}
                      </h4>
                      <p className="text-blue-200 mt-2">{resource.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'testing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Testing Your Integration</h3>
            <div className="space-y-6">
              {testingTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-slate-800 rounded-xl border border-blue-600/30"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{tool.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{tool.name}</h4>
                      <p className="text-blue-200 mb-3">{tool.description}</p>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <code className="text-sm text-blue-400 font-mono">{tool.command}</code>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testing Checklist */}
            <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-blue-600/30">
              <h4 className="text-lg font-semibold text-white mb-4">Testing Checklist</h4>
              <div className="space-y-3">
                {[
                  '✅ Verify your access token works with Shopify API',
                  '✅ Test webhook delivery to your endpoints',
                  '✅ Validate webhook signature verification',
                  '✅ Check product/order data synchronization',
                  '✅ Monitor API rate limits and errors'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-blue-200">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default ShopifyDashboard;
