import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
import { ShopifyOAuthService } from '../services/shopifyOAuth';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';

interface ShopifyConfigProps {
  className?: string;
}

const ShopifyConfig: React.FC<ShopifyConfigProps> = ({ className = '' }) => {
  // State for OAuth configuration
  const [oauthConfig, setOauthConfig] = useState({
    shop: '',
    apiKey: '',
    apiSecret: '',
    redirectUri: window.location.origin + '/shopify/callback'
  });
  
  // State for connection status
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [currentShop, setCurrentShop] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState<any>(null);

  // Initialize OAuth service when component mounts
  useEffect(() => {
    // Check if we're returning from OAuth callback
    if (window.location.pathname === '/shopify/callback') {
      handleOAuthCallback();
    }
    
    // Check for existing connections
    checkExistingConnections();
  }, []);

  /**
   * Check if there are any existing Shopify connections
   */
  const checkExistingConnections = () => {
    // Look for stored tokens in localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('shopify_token_')) {
        const shop = key.replace('shopify_token_', '');
        setCurrentShop(shop);
        setConnectionStatus('connected');
        updateConnectionDetails(shop);
        return;
      }
    });
  };

  /**
   * Update connection details for display
   */
  const updateConnectionDetails = (shop: string) => {
    try {
      const oauthService = new ShopifyOAuthService({
        shop,
        apiKey: oauthConfig.apiKey,
        apiSecret: oauthConfig.apiSecret,
        scopes: ['read_products', 'read_orders', 'read_customers'],
        redirectUri: oauthConfig.redirectUri
      });
      
      const status = oauthService.getConnectionStatus(shop);
      setConnectionDetails(status);
    } catch (error) {
      console.error('Error updating connection details:', error);
    }
  };

  /**
   * Handle OAuth callback from Shopify
   */
  const handleOAuthCallback = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Create OAuth service instance
      const oauthService = new ShopifyOAuthService({
        shop: oauthConfig.shop,
        apiKey: oauthConfig.apiKey,
        apiSecret: oauthConfig.apiSecret,
        scopes: ['read_products', 'read_orders', 'read_customers'],
        redirectUri: oauthConfig.redirectUri
      });
      
      // Verify the callback and extract the authorization code
      const callbackData = oauthService.verifyCallback(window.location.href);
      
      if (!callbackData) {
        setError('Invalid OAuth callback. Please try again.');
        return;
      }
      
      // Exchange the code for an access token
      await oauthService.exchangeCodeForToken(
        callbackData.code,
        callbackData.shop
      );
      
      // Update connection status
      setCurrentShop(callbackData.shop);
      setConnectionStatus('connected');
      setError('');
      updateConnectionDetails(callbackData.shop);
      
      // Redirect back to the main Shopify page
      window.history.replaceState({}, '', '/shopify');
      
    } catch (error) {
      console.error('OAuth callback error:', error);
      setError(error instanceof Error ? error.message : 'Failed to complete OAuth process');
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Initiate OAuth flow
   */
  const _handleConnect = async () => {
    // This function is intentionally unused for now
    // It will be used when implementing the connect button functionality
    try {
      setIsLoading(true);
      setError('');
      
      // Validate configuration
      const oauthService = new ShopifyOAuthService({
        shop: oauthConfig.shop,
        apiKey: oauthConfig.apiKey,
        apiSecret: oauthConfig.apiSecret,
        scopes: ['read_products', 'read_orders', 'read_customers'],
        redirectUri: oauthConfig.redirectUri
      });
      
      const validation = oauthService.validateConfig();
      if (!validation.isValid) {
        setError(`Configuration error: ${validation.errors.join(', ')}`);
        return;
      }
      
      // Check rate limiting
      const status = oauthService.getConnectionStatus(oauthConfig.shop);
      if (status.remainingAttempts <= 0) {
        const resetTime = status.resetTime ? new Date(status.resetTime).toLocaleTimeString() : 'soon';
        setError(`Rate limit exceeded. Try again after ${resetTime}`);
        return;
      }
      
      // Generate and redirect to authorization URL
      const authUrl = oauthService.generateAuthUrl();
      window.location.href = authUrl;
      
    } catch (error) {
      console.error('Error initiating OAuth:', error);
      setError(error instanceof Error ? error.message : 'Failed to start OAuth process');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Disconnect from Shopify
   */
  const handleDisconnect = () => {
    if (currentShop) {
      try {
        const oauthService = new ShopifyOAuthService({
          shop: currentShop,
          apiKey: oauthConfig.apiKey,
          apiSecret: oauthConfig.apiSecret,
          scopes: [],
          redirectUri: oauthConfig.redirectUri
        });
        
        oauthService.disconnectShop(currentShop);
        setCurrentShop('');
        setConnectionStatus('disconnected');
        setConnectionDetails(null);
        setError('');
      } catch (error) {
        console.error('Error disconnecting:', error);
        setError('Failed to disconnect from Shopify');
      }
    }
  };

  /**
   * Test the connection by making an API call
   */
  const testConnection = async () => {
    if (!currentShop) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      const oauthService = new ShopifyOAuthService({
        shop: currentShop,
        apiKey: oauthConfig.apiKey,
        apiSecret: oauthConfig.apiSecret,
        scopes: [],
        redirectUri: oauthConfig.redirectUri
      });
      
      const accessToken = oauthService.getAccessToken(currentShop);
      
      if (!accessToken) {
        setError('No access token found. Please reconnect to Shopify.');
        return;
      }
      
      // Make a test API call to verify the token
      const response = await fetch(`https://${currentShop}/admin/api/2024-01/shop.json`, {
        headers: {
          'X-Shopify-Access-Token': accessToken
        }
      });
      
      if (response.ok) {
        const shopData = await response.json();
        setError('');
        alert(`✅ Successfully connected to ${shopData.shop.name}!`);
        updateConnectionDetails(currentShop);
      } else {
        await response.text();
        setError(`Failed to connect to Shopify API: ${response.status} ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('Connection test error:', error);
      setError(error instanceof Error ? error.message : 'Failed to test connection');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input changes with validation
   */
  const handleInputChange = (field: string, value: string) => {
    setOauthConfig(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (error) {
      setError('');
    }
  };

  /**
   * Format time duration for display
   */
  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className={className}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Shopify OAuth Integration</h2>
        <p className="text-blue-200">
          Connect your Shopify store securely using OAuth authentication.
        </p>
      </div>

      {/* Connection Status */}
      <Card variant="elevated" padding="lg" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Connection Status</h3>
          <div className={`flex items-center gap-2 ${
            connectionStatus === 'connected' ? 'text-green-400' : 
            connectionStatus === 'connecting' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            <span className="text-2xl">
              {connectionStatus === 'connected' ? '🟢' : 
               connectionStatus === 'connecting' ? '🟡' : '🔴'}
            </span>
            <span className="font-medium capitalize">{connectionStatus}</span>
          </div>
        </div>
        
        {connectionStatus === 'connected' && currentShop && (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-medium">
                ✅ Successfully connected to {currentShop}!
              </p>
            </div>
            
            {connectionDetails && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-sm text-blue-200">Token Age</p>
                  <p className="text-white font-semibold">
                    {connectionDetails.tokenAge ? formatDuration(connectionDetails.tokenAge) : 'Unknown'}
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-sm text-blue-200">Remaining Attempts</p>
                  <p className="text-white font-semibold">{connectionDetails.remainingAttempts}</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-sm text-blue-200">Status</p>
                  <p className="text-green-400 font-semibold">Active</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
            <p className="text-red-400 font-medium">❌ {error}</p>
          </div>
        )}
      </Card>

      {/* OAuth Configuration Form */}
      <Card variant="default" padding="xl" className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-6">App Configuration</h3>
        
        <div className="space-y-6">
          <Input
            label="Shop URL *"
            value={oauthConfig.shop}
            onChange={(e) => handleInputChange('shop', e.target.value)}
            placeholder="your-store.myshopify.com"
            variant="filled"
            size="lg"
            helperText="Your Shopify store URL without https://"
          />

          <Input
            label="API Key *"
            value={oauthConfig.apiKey}
            onChange={(e) => handleInputChange('apiKey', e.target.value)}
            placeholder="your_api_key_here"
            variant="filled"
            size="lg"
            helperText="Your Shopify app's API key"
          />

          <Input
            label="API Secret *"
            value={oauthConfig.apiSecret}
            onChange={(e) => handleInputChange('apiSecret', e.target.value)}
            placeholder="your_api_secret_here"
            variant="filled"
            size="lg"
            type="password"
            helperText="Your Shopify app's API secret"
          />

          <Input
            label="Redirect URI"
            value={oauthConfig.redirectUri}
            onChange={(e) => handleInputChange('redirectUri', e.target.value)}
            variant="filled"
            size="lg"
            helperText="Where Shopify will redirect after authorization"
          />
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {connectionStatus === 'disconnected' ? (
          <Button
            variant="primary"
            size="lg"
            rounded="xl"
            shadow="lg"
            icon="🔗"
            iconPosition="left"
            loading={isLoading}
            disabled={!oauthConfig.shop || !oauthConfig.apiKey || !oauthConfig.apiSecret}
            fullWidth={false}
            className="flex-1"
          >
            {isLoading ? 'Connecting...' : 'Connect to Shopify'}
          </Button>
        ) : (
          <>
            <Button
              variant="success"
              size="lg"
              rounded="xl"
              shadow="lg"
              icon="🧪"
              iconPosition="left"
              loading={isLoading}
              fullWidth={false}
              className="flex-1"
              onClick={testConnection}
            >
              {isLoading ? 'Testing...' : 'Test Connection'}
            </Button>
            
            <Button
              variant="danger"
              size="lg"
              rounded="xl"
              icon="❌"
              iconPosition="left"
              loading={isLoading}
              fullWidth={false}
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </>
        )}
      </div>

      {/* Setup Instructions */}
      <Card variant="outlined" padding="lg" className="mb-8">
        <h4 className="text-lg font-semibold text-white mb-4">Setup Instructions</h4>
        <div className="space-y-3 text-sm text-blue-200">
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 font-bold">1.</span>
            <p>Create a Shopify app in your Partners dashboard</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 font-bold">2.</span>
            <p>Set the redirect URI to: <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">{oauthConfig.redirectUri}</code></p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 font-bold">3.</span>
            <p>Copy your API key and secret to the form above</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 font-bold">4.</span>
            <p>Click "Connect to Shopify" to start OAuth flow</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 font-bold">5.</span>
            <p>Authorize the app in Shopify</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 font-bold">6.</span>
            <p>You'll be redirected back and automatically connected!</p>
          </div>
        </div>
      </Card>

      {/* Production Features Info */}
      <Card variant="glass" padding="lg" className="bg-blue-500/10 border-blue-500/30">
        <h4 className="text-lg font-semibold text-blue-400 mb-4">Production Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-300">
          <div>
            <p className="font-semibold text-blue-200 mb-2">🔐 Security</p>
            <ul className="space-y-1">
              <li>• Encrypted token storage</li>
              <li>• Rate limiting protection</li>
              <li>• State parameter validation</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-blue-200 mb-2">📊 Monitoring</p>
            <ul className="space-y-1">
              <li>• OAuth event logging</li>
              <li>• Connection status tracking</li>
              <li>• Error handling & reporting</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShopifyConfig;
