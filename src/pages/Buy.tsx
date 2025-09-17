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
    const existingNode = document.getElementById('product-component-1758007016917');
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
              node: document.getElementById('product-component-1758007016917'),
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
                      "color": "` + titleColor + `",
                      "text-shadow": "0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(184, 134, 11, 0.4)"
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
                    "description": { 
                      "color": "` + textColor + `",
                      "text-shadow": "0 0 8px rgba(255, 215, 0, 0.4), 0 0 15px rgba(184, 134, 11, 0.3)"
                    },
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
                      "color": "` + titleColor + `",
                      "text-shadow": "0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(184, 134, 11, 0.4)"
                    },
                    "price": {
                      "font-family": "Helvetica Neue, sans-serif",
                      "font-weight": "normal",
                      "font-size": "18px",
                      "color": "` + priceColor + `"
                    },
                    "description": { 
                      "color": "` + textColor + `",
                      "text-shadow": "0 0 8px rgba(255, 215, 0, 0.4), 0 0 15px rgba(184, 134, 11, 0.3)"
                    },
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
    <div className="min-h-screen pt-20">
      {/* Minimal Hero Section */}
      <section className="relative py-16">
        
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-20">
            {/* Premium product heading */}
            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-tight" style={isDark ? {
              background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '4px 4px 8px rgba(0,0,0,0.6), 0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,215,0,0.2), 2px 2px 4px rgba(255,215,0,0.15), -1px -1px 2px rgba(255,255,255,0.1)',
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.3)) drop-shadow(1px 1px 2px rgba(255,255,255,0.2))'
            } : {
              background: 'linear-gradient(145deg, #b8860b 0%, #8b4513 25%, #b8860b 50%, #8b4513 75%, #b8860b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '4px 4px 8px rgba(255,255,255,0.9), 0 0 15px rgba(184,134,11,0.6), 0 0 30px rgba(184,134,11,0.4), 2px 2px 4px rgba(184,134,11,0.2), -1px -1px 2px rgba(255,255,255,0.8)',
              filter: 'drop-shadow(3px 3px 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(184,134,11,0.4)) drop-shadow(1px 1px 2px rgba(255,255,255,0.9))'
            }}>
              {brand.currentProduct.name}
            </h1>
            <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium" style={{ 
              color: isDark ? '#daa520' : '#4a2c17',
              textShadow: isDark 
                ? '1px 1px 2px rgba(0,0,0,0.3)'
                : '1px 1px 2px rgba(255,255,255,0.8)'
            }}>
              {brand.currentProduct.description}
            </p>
          </div>
        </div>
      </section>

      {/* Premium Nutrition Facts */}
      <section className="py-12">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {brand.currentProduct.nutritionHighlights.map((item, index) => (
              <div
                key={item}
                className="text-center bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-2xl p-8 border border-green-500/40 backdrop-blur-sm shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-102"
                style={{
                  backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
                  borderColor: isDark ? 'rgba(34, 197, 94, 0.4)' : 'rgba(34, 197, 94, 0.3)'
                }}
              >
                <div className="text-2xl font-black mb-3" style={{ 
                  color: isDark ? '#b8860b' : '#2c1810',
                  textShadow: isDark 
                    ? '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(245,158,11,0.2)'
                    : '2px 2px 4px rgba(255,255,255,0.9), 0 0 10px rgba(44,24,16,0.6)',
                  filter: isDark 
                    ? 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                    : 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                }}>
                  {item.split(' ')[0]}
                </div>
                <div className="text-sm font-medium leading-tight" style={{ 
                  color: isDark ? '#daa520' : '#4a2c17'
                }}>
                  {item.split(' ').slice(1).join(' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopify Purchase Section - Clean & Professional */}
      <section className="pb-20" style={{ paddingTop: '60px' }}>
        <div className="container mx-auto max-w-6xl px-6">
          {/* <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6" style={{ 
              color: isDark ? '#b8860b' : '#2c1810',
              textShadow: isDark 
                ? '2px 2px 4px rgba(0,0,0,0.5), 0 0 12px rgba(245,158,11,0.3)'
                : '2px 2px 4px rgba(255,255,255,0.9), 0 0 12px rgba(44,24,16,0.6)',
              filter: isDark 
                ? 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                : 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
            }}>
              Get Your {brand.currentProduct.name}
            </h2>
          </div> */}
          
          {/* Shopify Buy Component - Horizontal Layout (Images Left, Content Right) */}
          <div id='product-component-1758007016917'></div>
          
          {/* Minimal CSS for vertical centering and gold glow */}
          <style dangerouslySetInnerHTML={{
            __html: `
              #product-component-1758007016917 .shopify-buy__product {
                align-items: center !important;
              }
            `
          }} />
        </div>
      </section>
    </div>
  );
};

export default Buy;
