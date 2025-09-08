import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { brand } from '../config/brand';
import FuturisticBotanical from '../components/FuturisticBotanical';
import { useTheme } from '../contexts/ThemeContext';

const Buy: React.FC = () => {
  const { isDark } = useTheme();
  
  // Shopify Buy Button Script - Reactive to theme changes
  useEffect(() => {
    const titleColor = isDark ? '#ffffff' : '#0b0b0b';
    const textColor = isDark ? '#e5e7eb' : '#111827';
    const priceColor = '#39FF14';
    const compareColor = isDark ? '#a1a1aa' : '#6b7280';

    // Clear existing Shopify component first
    const existingNode = document.getElementById('product-component-1757309276164');
    if (existingNode) {
      existingNode.innerHTML = '';
    }

    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const script = document.createElement('script');
    script.innerHTML = 
      `(function () {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
        function loadScript() {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = ShopifyBuyInit;
        }
        function ShopifyBuyInit() {
          var client = ShopifyBuy.buildClient({
            domain: 'bmcyym-b0.myshopify.com',
            storefrontAccessToken: '1f18fbbd2c95fe5927e476fce22b228e',
          });
          ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
              id: '7635687243862',
              node: document.getElementById('product-component-1757309276164'),
              moneyFormat: '%24%7B%7Bamount%7D%7D',
              options: {
                "product": {
                  "styles": {
                    "product": {
                      "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0",
                        "margin-bottom": "50px"
                      },
                      "text-align": "left"
                    },
                    "title": {
                      "font-size": "26px",
                      "color": "` + titleColor + `"
                    },
                    "button": {
                      "background-color": "#39FF14",
                      "color": "#0b0b0b",
                      ":hover": {
                        "background-color": "#6BFF4A",
                        "color": "#0b0b0b"
                      }
                    },
                    "price": {
                      "font-size": "18px",
                      "color": "` + priceColor + `"
                    },
                    "description": { "color": "` + textColor + `" },
                    "compareAt": {
                      "font-size": "15.299999999999999px",
                      "color": "` + compareColor + `",
                      "text-decoration": "line-through"
                    },
                    "unitPrice": {
                      "font-size": "15.299999999999999px"
                    }
                  },
                  "layout": "horizontal",
                  "contents": {
                    "img": false,
                    "imgWithCarousel": true,
                    "description": true
                  },
                  "width": "100%",
                  "text": {
                    "button": "Add to cart"
                  }
                },
                "productSet": {
                  "styles": {
                    "products": {
                      "@media (min-width: 601px)": {
                        "margin-left": "-20px"
                      }
                    }
                  }
                },
                "modalProduct": {
                  "contents": {
                    "img": false,
                    "imgWithCarousel": true,
                    "button": false,
                    "buttonWithQuantity": true
                  },
                  "styles": {
                    "product": {
                      "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0px",
                        "margin-bottom": "0px"
                      }
                    },
                    "button": {
                      "background-color": "#39FF14",
                      "color": "#0b0b0b",
                      ":hover": {
                        "background-color": "#6BFF4A",
                        "color": "#0b0b0b"
                      }
                    },
                    "title": {
                      "font-family": "Helvetica Neue, sans-serif",
                      "font-weight": "bold",
                      "font-size": "26px",
                      "color": "` + titleColor + `"
                    },
                    "price": {
                      "font-family": "Helvetica Neue, sans-serif",
                      "font-weight": "normal",
                      "font-size": "18px",
                      "color": "` + priceColor + `"
                    },
                    "description": { "color": "` + textColor + `" },
                    "compareAt": {
                      "font-family": "Helvetica Neue, sans-serif",
                      "font-weight": "normal",
                      "font-size": "15.299999999999999px",
                      "color": "` + compareColor + `",
                      "text-decoration": "line-through"
                    },
                    "unitPrice": {
                      "font-family": "Helvetica Neue, sans-serif",
                      "font-weight": "normal",
                      "font-size": "15.299999999999999px",
                      "color": "` + textColor + `"
                    }
                  },
                  "text": {
                    "button": "Add to cart"
                  }
                },
                "option": {},
                "cart": {
                  "styles": {
                    "button": {
                      "background-color": "#39FF14",
                      "color": "#0b0b0b",
                      ":hover": {
                        "background-color": "#6BFF4A",
                        "color": "#0b0b0b"
                      }
                    },
                    "title": { "color": "` + titleColor + `" },
                    "header": { "color": "` + titleColor + `" },
                    "lineItems": { "color": "` + textColor + `" },
                    "subtotalText": { "color": "` + textColor + `" },
                    "subtotal": { "color": "` + priceColor + `" },
                    "notice": { "color": "` + textColor + `" }
                  },
                  "text": {
                    "total": "Subtotal",
                    "button": "Checkout"
                  }
                },
                "toggle": {
                  "styles": {
                    /* Side floating cart toggle - neon green background with white text */
                    "toggle": {
                      "background-color": "#39FF14",
                      ":hover": {
                        "background-color": "#6BFF4A"
                      }
                    },
                    /* The count bubble (number) - white text */
                    "count": {
                      "color": "#ffffff",
                      ":hover": {
                        "color": "#ffffff"
                      }
                    },
                    /* SVG icon fill - white */
                    "iconPath": {
                      "fill": "#ffffff"
                    }
                  }
                }
              },
            });
          });
        }
      })();
    `;
    
      document.body.appendChild(script);
    }, 100); // Small delay to ensure DOM readiness
    
    return () => {
      // Cleanup: remove script when component unmounts or theme changes
      const existingScripts = document.querySelectorAll('script');
      existingScripts.forEach(s => {
        if (s.innerHTML && s.innerHTML.includes('bmcyym-b0.myshopify.com')) {
          s.remove();
        }
      });
    };
  }, [isDark]); // Re-run when theme changes

  return (
    <div className="min-h-screen bg-gradient-to-b from-black-950 via-black-900 to-black-950 pt-20 relative overflow-hidden">
      {/* TODO: Add futuristic botanical elements throughout the buy page */}
      <FuturisticBotanical variant="floating" size="lg" position="top-right" />
      <FuturisticBotanical variant="floating" size="md" position="bottom-left" />
      <FuturisticBotanical variant="corner" size="sm" position="top-left" />
      {/* Hero Section - TODO: Update hero copy and imagery */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects - TODO: Adjust colors to match brand */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-gold-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Shop Badge - high-contrast emerald */}
              <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-400/40 rounded-full px-6 py-2 mb-6 text-emerald-200 shadow-glow">
                <span className="text-xs font-semibold tracking-widest">SHOP NOW</span>
              </div>
              
              {/* Main Heading - TODO: Update headline copy */}
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Experience
                <span className="block bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                  {brand.name}
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg md:text-xl text-primary-200 mb-6 max-w-3xl mx-auto leading-relaxed">
                {brand.mission}. Pure ingredients, natural energy, uncompromising quality.
              </p>

              {/* Value Props - TODO: Update with actual brand values */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {brand.values.slice(0, 3).map((value, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-black-800/50 border border-primary-500/20 rounded-full px-4 py-2 text-sm text-primary-300 backdrop-blur-sm"
                  >
                    ✓ {value}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Section - TODO: Update section styling and copy */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          
          {/* Section Header - TODO: Update product section copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-emerald-300 mb-6">
              {brand.currentProduct.name}
            </h2>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto mb-8">
              {brand.currentProduct.description}
            </p>
            
            {/* Nutrition facts — professional italicized list */}
            <div className="max-w-2xl mx-auto">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 italic text-primary-200">
                {brand.currentProduct.nutritionHighlights.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mt-1" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Shopify Buy Button - Script is now in index.html */}
          <div id='product-component-1757309276164'></div>

          {/* Future Products Note - TODO: Update coming soon messaging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-br from-black-800/40 to-black-900/60 rounded-2xl p-8 border border-gold-500/20 shadow-xl backdrop-blur-sm">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-3xl font-display font-bold text-gold-400 mb-4">
                More Flavors Coming Soon!
              </h3>
              <p className="text-primary-200 text-lg max-w-2xl mx-auto">
                We're constantly developing new natural flavors and formulas. 
                Stay tuned for exciting additions to our premium energy lineup!
              </p>
              
              {/* Newsletter Signup Placeholder - TODO: Connect to actual email service */}
              <div className="mt-8">
                <button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-black-950 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
                  Notify Me First
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Buy;
