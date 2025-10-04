/// <reference types="vite/client" />
<<<<<<< HEAD

// Shopify Buy Button SDK types
declare global {
  interface Window {
    ShopifyBuy: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => any;
      UI: {
        onReady: (client: any) => Promise<any>;
      };
    };
  }
}

export {}; 
=======
>>>>>>> 1906dec040657e9bf2a9b66b1a97b1364518b50e
