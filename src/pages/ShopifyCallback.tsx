import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopifyOAuthService } from '../services/shopifyOAuth';

const ShopifyCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');
  const [shop, setShop] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    processCallback();
  }, []);

  const processCallback = async () => {
    try {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const shopParam = searchParams.get('shop');

      if (!code || !state || !shopParam) {
        setStatus('error');
        setError('Missing required OAuth parameters');
        return;
      }

      setShop(shopParam);

      // Create OAuth service instance with configuration
      const oauthService = new ShopifyOAuthService({
        shop: shopParam,
        apiKey: import.meta.env.VITE_SHOPIFY_API_KEY || '',
        apiSecret: import.meta.env.VITE_SHOPIFY_API_SECRET || '',
        scopes: ['read_products', 'read_orders', 'read_customers'],
        redirectUri: import.meta.env.VITE_SHOPIFY_REDIRECT_URI || `${window.location.origin}/shopify/callback`
      });

      // Verify OAuth callback using the public method
      const callbackData = oauthService.verifyCallback(window.location.href);
      if (!callbackData) {
        setStatus('error');
        setError('Invalid or expired OAuth callback');
        return;
      }

      // Exchange code for access token
      const accessToken = await oauthService.exchangeCodeForToken(code, shopParam);

      if (accessToken) {
        setStatus('success');
        setMessage('Successfully connected to Shopify! Redirecting to dashboard...');
        
        // Redirect to Shopify page after a short delay
        setTimeout(() => {
          navigate('/shopify');
        }, 2000);
      } else {
        setStatus('error');
        setError('Failed to obtain access token');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
          />
        );
      case 'success':
        return (
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'text-blue-400';
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'processing':
        return 'bg-blue-500/10';
      case 'success':
        return 'bg-green-500/10';
      case 'error':
        return 'bg-red-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800 rounded-2xl border border-blue-700/50 p-8 max-w-md w-full mx-4"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Shopify Connection</h1>
            <p className="text-blue-200">Processing your Shopify authorization...</p>
          </div>

          {/* Status Display */}
          <div className="text-center mb-8">
            {getStatusIcon()}
          </div>

          {/* Status Message */}
          <div className={`text-center p-4 rounded-lg ${getStatusBg()}`}>
            <h2 className={`text-lg font-semibold ${getStatusColor()} mb-2`}>
              {status === 'processing' && 'Processing...'}
              {status === 'success' && 'Success!'}
              {status === 'error' && 'Error'}
            </h2>
            
            {status === 'processing' && (
              <p className="text-blue-200 mb-4">
                Completing your Shopify connection. Please wait...
              </p>
            )}

            {status === 'success' && (
              <div>
                <p className="text-green-200 mb-4">{message}</p>
                <div className="bg-slate-700 rounded-lg p-3 mb-6">
                  <p className="text-sm text-blue-200">Shop</p>
                  <p className="text-white font-semibold">{shop}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div>
                <p className="text-red-200 mb-4">{error}</p>
                {shop && (
                  <div className="bg-slate-700 rounded-lg p-3 mb-6">
                    <p className="text-sm text-blue-200">Shop</p>
                    <p className="text-white font-semibold">{shop}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'success' && (
              <button
                onClick={() => navigate('/shopify')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            )}

            {status === 'error' && (
              <>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/shopify')}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Back to Setup
                </button>
              </>
            )}

            {status === 'processing' && (
              <div className="text-center">
                <p className="text-sm text-slate-400">Please wait while we complete your connection...</p>
              </div>
            )}
          </div>

          {/* Additional Info */}
          {status === 'error' && (
            <div className="mt-6 p-4 bg-slate-700 rounded-lg border border-blue-600/30">
              <h3 className="text-sm font-semibold text-white mb-2">Troubleshooting Tips:</h3>
              <div className="text-xs text-slate-300 space-y-1">
                <p>• Check your internet connection</p>
                <p>• Ensure your Shopify app is properly configured</p>
                <p>• Verify the redirect URI matches your app settings</p>
                <p>• Try refreshing the page or starting over</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ShopifyCallback;
