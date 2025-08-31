import CryptoJS from 'crypto-js';

// Configuration interface
interface ShopifyOAuthConfig {
  shop: string;
  apiKey: string;
  apiSecret: string;
  scopes: string[];
  redirectUri: string;
}

// OAuth state and token storage
interface OAuthState {
  shop: string;
  timestamp: number;
  nonce: string;
}

// Encrypted token storage
interface EncryptedToken {
  encryptedToken: string;
  timestamp: number;
  shop: string;
}

// Production configuration
const PRODUCTION_CONFIG = {
  MAX_OAUTH_ATTEMPTS: 5,
  OAUTH_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  TOKEN_EXPIRY_MS: 24 * 60 * 60 * 1000, // 24 hours
  STATE_EXPIRY_MS: 60 * 60 * 1000, // 1 hour
  ENCRYPTION_KEY: import.meta.env.VITE_SHOPIFY_ENCRYPTION_KEY || 'waw-energy-oauth-key-2024'
};

// Rate limiting for OAuth attempts
class OAuthRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  isAllowed(shop: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(shop);

    if (!attempt) {
      this.attempts.set(shop, { count: 1, resetTime: now + PRODUCTION_CONFIG.OAUTH_WINDOW_MS });
      return true;
    }

    // Reset if window has passed
    if (now > attempt.resetTime) {
      this.attempts.set(shop, { count: 1, resetTime: now + PRODUCTION_CONFIG.OAUTH_WINDOW_MS });
      return true;
    }

    // Check if under limit
    if (attempt.count < PRODUCTION_CONFIG.MAX_OAUTH_ATTEMPTS) {
      attempt.count++;
      return true;
    }

    return false;
  }

  getRemainingAttempts(shop: string): number {
    const attempt = this.attempts.get(shop);
    if (!attempt) return PRODUCTION_CONFIG.MAX_OAUTH_ATTEMPTS;
    
    const now = Date.now();
    if (now > attempt.resetTime) return PRODUCTION_CONFIG.MAX_OAUTH_ATTEMPTS;
    
    return Math.max(0, PRODUCTION_CONFIG.MAX_OAUTH_ATTEMPTS - attempt.count);
  }

  getResetTime(shop: string): number | null {
    const attempt = this.attempts.get(shop);
    return attempt ? attempt.resetTime : null;
  }

  clearAttempts(shop: string): void {
    this.attempts.delete(shop);
  }
}

// Production-ready Shopify OAuth service
export class ShopifyOAuthService {
  private config: ShopifyOAuthConfig;
  private rateLimiter: OAuthRateLimiter;
  
  constructor(config: ShopifyOAuthConfig) {
    this.config = config;
    this.rateLimiter = new OAuthRateLimiter();
  }

  /**
   * Generate the OAuth authorization URL with production security
   */
  generateAuthUrl(): string {
    // Check rate limiting
    if (!this.rateLimiter.isAllowed(this.config.shop)) {
      const resetTime = this.rateLimiter.getResetTime(this.config.shop);
      throw new Error(`Rate limit exceeded. Try again after ${new Date(resetTime!).toLocaleTimeString()}`);
    }

    // Create a secure state parameter
    const state = this.generateSecureState();
    
    // Build the authorization URL
    const authUrl = new URL(`https://${this.config.shop}/admin/oauth/authorize`);
    
    // Required OAuth parameters
    authUrl.searchParams.append('client_id', this.config.apiKey);
    authUrl.searchParams.append('scope', this.config.scopes.join(','));
    authUrl.searchParams.append('redirect_uri', this.config.redirectUri);
    authUrl.searchParams.append('state', state);
    
    // Store the state securely
    this.storeOAuthState(state);
    
    // Log OAuth initiation for production monitoring
    this.logOAuthEvent('initiated', this.config.shop, true);
    
    return authUrl.toString();
  }

  /**
   * Generate a cryptographically secure state parameter
   */
  private generateSecureState(): string {
    const timestamp = Date.now();
    const nonce = CryptoJS.lib.WordArray.random(16).toString();
    
          const _state: OAuthState = {
        shop: this.config.shop,
        timestamp,
        nonce
      };
    
    return CryptoJS.lib.WordArray.random(32).toString();
  }

  /**
   * Store OAuth state securely with encryption
   */
  private storeOAuthState(state: string): void {
    const stateData: OAuthState = {
      shop: this.config.shop,
      timestamp: Date.now(),
      nonce: CryptoJS.lib.WordArray.random(16).toString()
    };
    
    const encryptedState = this.encryptData(JSON.stringify(stateData));
    localStorage.setItem(`shopify_oauth_state_${state}`, encryptedState);
    
    // Set expiration cleanup
    setTimeout(() => {
      localStorage.removeItem(`shopify_oauth_state_${state}`);
    }, PRODUCTION_CONFIG.STATE_EXPIRY_MS);
  }

  /**
   * Verify the OAuth callback with production security
   */
  verifyCallback(url: string): { code: string; state: string; shop: string } | null {
    try {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const shop = urlParams.get('shop');
      
      // Validate required parameters
      if (!code || !state || !shop) {
        this.logOAuthEvent('callback_missing_params', shop || 'unknown', false);
        return null;
      }
      
      // Verify the state parameter
      if (!this.verifyOAuthState(state, shop)) {
        this.logOAuthEvent('callback_invalid_state', shop, false);
        return null;
      }
      
      // Clean up the used state
      localStorage.removeItem(`shopify_oauth_state_${state}`);
      
      // Clear rate limiting for successful OAuth
      this.rateLimiter.clearAttempts(shop);
      
      this.logOAuthEvent('callback_verified', shop, true);
      
      return { code, state, shop };
    } catch (error) {
      this.logOAuthEvent('callback_error', 'unknown', false, error);
      return null;
    }
  }

  /**
   * Verify OAuth state with encryption and security checks
   */
  private verifyOAuthState(state: string, shop: string): boolean {
    try {
      const encryptedState = localStorage.getItem(`shopify_oauth_state_${state}`);
      if (!encryptedState) return false;
      
      const decryptedState = this.decryptData(encryptedState);
      const parsedState: OAuthState = JSON.parse(decryptedState);
      
      // Check if state is expired
      const now = Date.now();
      if (now - parsedState.timestamp > PRODUCTION_CONFIG.STATE_EXPIRY_MS) {
        localStorage.removeItem(`shopify_oauth_state_${state}`);
        return false;
      }
      
      // Check if shop matches
      if (parsedState.shop !== shop) {
        return false;
      }
      
      // Validate nonce format
      if (!parsedState.nonce || typeof parsedState.nonce !== 'string') {
        return false;
      }
      
      return true;
    } catch (error) {
      // Remove invalid states
      localStorage.removeItem(`shopify_oauth_state_${state}`);
      return false;
    }
  }

  /**
   * Exchange authorization code for access token with production error handling
   */
  async exchangeCodeForToken(code: string, shop: string): Promise<string> {
    try {
      // Create the request body for token exchange
      const requestBody = {
        client_id: this.config.apiKey,
        client_secret: this.config.apiSecret,
        code: code,
        redirect_uri: this.config.redirectUri
      };
      
      // Make the token exchange request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token exchange failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (!data.access_token) {
        throw new Error('No access token received from Shopify');
      }
      
      // Store the access token securely with encryption
      this.storeAccessToken(shop, data.access_token);
      
      // Log successful token exchange
      this.logOAuthEvent('token_exchange_success', shop, true);
      
      return data.access_token;
    } catch (error) {
      // Log failed token exchange
      this.logOAuthEvent('token_exchange_failed', shop, false, error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Token exchange timed out. Please try again.');
        }
        throw error;
      }
      
      throw new Error('Unknown error during token exchange');
    }
  }

  /**
   * Store access token with encryption and expiration
   */
  private storeAccessToken(shop: string, accessToken: string): void {
    const tokenData: EncryptedToken = {
      encryptedToken: this.encryptData(accessToken),
      timestamp: Date.now(),
      shop
    };
    
    localStorage.setItem(`shopify_token_${shop}`, JSON.stringify(tokenData));
    
    // Set expiration cleanup
    setTimeout(() => {
      this.cleanupExpiredTokens();
    }, PRODUCTION_CONFIG.TOKEN_EXPIRY_MS);
  }

  /**
   * Clean up expired access tokens
   */
  private cleanupExpiredTokens(): void {
    const now = Date.now();
    const expiryTime = now - PRODUCTION_CONFIG.TOKEN_EXPIRY_MS;
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('shopify_token_')) {
        try {
          const tokenData = localStorage.getItem(key);
          if (tokenData) {
            const parsed: EncryptedToken = JSON.parse(tokenData);
            if (parsed.timestamp < expiryTime) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });
  }

  /**
   * Get stored access token with decryption and validation
   */
  getAccessToken(shop: string): string | null {
    try {
      const tokenData = localStorage.getItem(`shopify_token_${shop}`);
      if (!tokenData) return null;
      
      const parsed: EncryptedToken = JSON.parse(tokenData);
      
      // Check if token is expired
      const now = Date.now();
      if (now - parsed.timestamp > PRODUCTION_CONFIG.TOKEN_EXPIRY_MS) {
        localStorage.removeItem(`shopify_token_${shop}`);
        return null;
      }
      
      // Decrypt and return the token
      return this.decryptData(parsed.encryptedToken);
    } catch (error) {
      // Remove invalid tokens
      localStorage.removeItem(`shopify_token_${shop}`);
      return null;
    }
  }

  /**
   * Check if a shop is connected with validation
   */
  isShopConnected(shop: string): boolean {
    const token = this.getAccessToken(shop);
    return token !== null;
  }

  /**
   * Disconnect a shop and clean up all related data
   */
  disconnectShop(shop: string): void {
    // Remove access token
    localStorage.removeItem(`shopify_token_${shop}`);
    
    // Remove any pending OAuth states for this shop
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('shopify_oauth_state_')) {
        try {
          const encryptedState = localStorage.getItem(key);
          if (encryptedState) {
            const decryptedState = this.decryptData(encryptedState);
            const state: OAuthState = JSON.parse(decryptedState);
            if (state.shop === shop) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          // Remove invalid states
          localStorage.removeItem(key);
        }
      }
    });
    
    // Clear rate limiting
    this.rateLimiter.clearAttempts(shop);
    
    // Log disconnection
    this.logOAuthEvent('disconnected', shop, true);
  }

  /**
   * Get connection status with detailed information
   */
  getConnectionStatus(shop: string): {
    isConnected: boolean;
    tokenAge: number | null;
    remainingAttempts: number;
    resetTime: number | null;
  } {
    const token = this.getAccessToken(shop);
    const tokenData = localStorage.getItem(`shopify_token_${shop}`);
    
    let tokenAge: number | null = null;
    if (tokenData) {
      try {
        const parsed: EncryptedToken = JSON.parse(tokenData);
        tokenAge = Date.now() - parsed.timestamp;
      } catch (error) {
        // Ignore parsing errors
      }
    }
    
    return {
      isConnected: token !== null,
      tokenAge,
      remainingAttempts: this.rateLimiter.getRemainingAttempts(shop),
      resetTime: this.rateLimiter.getResetTime(shop)
    };
  }

  /**
   * Production logging for monitoring and debugging
   */
  private logOAuthEvent(event: string, shop: string, success: boolean, error?: any): void {
    const logData: {
      event: string;
      shop: string;
      success: boolean;
      timestamp: string;
      userAgent: string;
      url: string;
      error?: any;
    } = {
      event,
      shop,
      success,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    if (error) {
      logData.error = error instanceof Error ? error.message : String(error);
    }
    
    // Console logging for development
    if (import.meta.env.DEV) {
      console.log(`[Shopify OAuth] ${event}:`, logData);
    }
    
    // Production logging (you can integrate with your analytics service)
    if (import.meta.env.PROD) {
      // Send to your analytics service (Google Analytics, Mixpanel, etc.)
      // Example: gtag('event', 'shopify_oauth', logData);
      
      // Or send to your logging service
      // Example: logToService(logData);
    }
  }

  /**
   * Validate OAuth configuration for production use
   */
  validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!this.config.shop) {
      errors.push('Shop URL is required');
    } else if (!this.config.shop.includes('.myshopify.com')) {
      errors.push('Invalid Shopify shop URL format');
    }
    
    if (!this.config.apiKey) {
      errors.push('API key is required');
    }
    
    if (!this.config.apiSecret) {
      errors.push('API secret is required');
    }
    
    if (!this.config.scopes || this.config.scopes.length === 0) {
      errors.push('At least one scope is required');
    }
    
    if (!this.config.redirectUri) {
      errors.push('Redirect URI is required');
    } else if (!this.config.redirectUri.startsWith('http')) {
      errors.push('Redirect URI must be a valid URL');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Encrypt data using AES-256
   */
  private encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, PRODUCTION_CONFIG.ENCRYPTION_KEY).toString();
  }

  /**
   * Decrypt data using AES-256
   */
  private decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, PRODUCTION_CONFIG.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}