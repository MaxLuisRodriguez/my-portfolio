import React, { useEffect } from 'react';
import { brand } from '../config/brand';
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
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-8 leading-tight" style={isDark ? {
              background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3), 0 0 60px rgba(255,215,0,0.2), 2px 2px 4px rgba(255,215,0,0.15), -1px -1px 2px rgba(255,255,255,0.1)',
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(255,215,0,0.4)) drop-shadow(0 0 25px rgba(255,215,0,0.3)) drop-shadow(1px 1px 2px rgba(255,255,255,0.2))',
              fontWeight: '900'
            } : {
              color: '#8b4513',
              textShadow: '4px 4px 8px rgba(255,255,255,0.9), 0 0 20px rgba(139,69,19,0.6), 0 0 40px rgba(139,69,19,0.4), 0 0 60px rgba(139,69,19,0.3), 2px 2px 4px rgba(139,69,19,0.2), -1px -1px 2px rgba(255,255,255,0.8)',
              filter: 'drop-shadow(3px 3px 6px rgba(255,255,255,0.9)) drop-shadow(0 0 15px rgba(139,69,19,0.5)) drop-shadow(0 0 25px rgba(139,69,19,0.4)) drop-shadow(1px 1px 2px rgba(255,255,255,0.9))',
              fontWeight: '900'
            }}>
              {brand.currentProduct.name}
            </h1>
            <p className="text-4xl md:text-6xl mb-12 max-w-5xl mx-auto leading-relaxed italic" style={{ 
              fontFamily: '"Dancing Script", "Brush Script MT", cursive',
              color: isDark ? '#daa520' : '#8b4513',
              textShadow: isDark 
                ? '2px 2px 4px rgba(0,0,0,0.5), 0 0 12px rgba(218,165,32,0.4), 0 0 24px rgba(218,165,32,0.3)'
                : '2px 2px 4px rgba(255,255,255,0.8), 0 0 12px rgba(139,69,19,0.5), 0 0 24px rgba(139,69,19,0.4)',
              filter: isDark 
                ? 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8)) drop-shadow(0 0 8px rgba(218,165,32,0.3))'
                : 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8)) drop-shadow(0 0 8px rgba(139,69,19,0.4))',
              fontWeight: '400'
            }}>
              Premium energy drink with natural rose flavor and sustained focus formula
            </p>
          </div>
        </div>
      </section>

      {/* Premium Nutrition Facts */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-6" style={isDark ? {
              background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.4))',
              fontWeight: '900'
            } : {
              color: '#8b4513',
              textShadow: '3px 3px 6px rgba(255,255,255,0.9), 0 0 15px rgba(139,69,19,0.6), 0 0 30px rgba(139,69,19,0.4)',
              filter: 'drop-shadow(2px 2px 4px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(139,69,19,0.5))',
              fontWeight: '900'
            }}>
              Premium Nutrition Facts
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {brand.currentProduct.nutritionHighlights.map((item) => (
              <div
                key={item}
                className="text-center bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-3xl p-8 border border-green-500/40 backdrop-blur-sm shadow-xl hover:shadow-green-500/50 transition-all duration-300 transform"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = isDark 
                    ? '0 0 40px rgba(34, 197, 94, 0.6), 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(34, 197, 94, 0.2)'
                    : '0 0 40px rgba(34, 197, 94, 0.4), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(34, 197, 94, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}
                style={{
                  backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
                  borderColor: isDark ? 'rgba(34, 197, 94, 0.4)' : 'rgba(34, 197, 94, 0.3)',
                  boxShadow: isDark 
                    ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.3), inset 0 0 15px rgba(34, 197, 94, 0.1)'
                    : '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(34, 197, 94, 0.2), inset 0 0 15px rgba(34, 197, 94, 0.05)'
                }}
              >
                <div className="text-3xl font-black mb-4" style={{ 
                  color: isDark ? '#ffd700' : '#8b4513',
                  textShadow: isDark 
                    ? '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)'
                    : '3px 3px 6px rgba(255,255,255,0.9), 0 0 15px rgba(139,69,19,0.6), 0 0 30px rgba(139,69,19,0.4)',
                  filter: isDark 
                    ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))'
                    : 'drop-shadow(2px 2px 4px rgba(255,255,255,0.8)) drop-shadow(0 0 8px rgba(139,69,19,0.5))',
                  fontWeight: '900'
                }}>
                  {item.split(' ')[0]}
                </div>
                <div className="text-lg font-bold leading-tight uppercase tracking-wide" style={{ 
                  color: isDark ? '#daa520' : '#8b4513',
                  textShadow: isDark 
                    ? '2px 2px 4px rgba(0,0,0,0.5), 0 0 12px rgba(218,165,32,0.4)'
                    : '2px 2px 4px rgba(255,255,255,0.8), 0 0 12px rgba(139,69,19,0.5)',
                  filter: isDark 
                    ? 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                    : 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
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
        <div className="container mx-auto max-w-7xl px-6">
          
          {/* Shopify Buy Component - Horizontal Layout (Images Left, Content Right) */}
          <div 
            id='product-component-1758007016917'
            className="bg-gradient-to-br from-black/20 to-black/40 rounded-3xl p-8 border border-gold-500/20 shadow-2xl backdrop-blur-sm"
            style={{
              boxShadow: isDark 
                ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.05)'
                : '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 30px rgba(255, 215, 0, 0.15), inset 0 0 20px rgba(255, 215, 0, 0.03)'
            }}
          ></div>
          
          {/* Enhanced CSS for vertical centering and gold glow */}
          <style dangerouslySetInnerHTML={{
            __html: `
              #product-component-1758007016917 .shopify-buy__product {
                align-items: center !important;
                padding: 20px !important;
              }
              #product-component-1758007016917 .shopify-buy__product-title {
                text-shadow: 0 0 15px rgba(255, 215, 0, 0.6), 0 0 25px rgba(184, 134, 11, 0.4) !important;
                filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.4)) !important;
              }
              #product-component-1758007016917 .shopify-buy__product-description {
                text-shadow: 0 0 12px rgba(255, 215, 0, 0.4), 0 0 20px rgba(184, 134, 11, 0.3) !important;
                filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 6px rgba(255, 215, 0, 0.3)) !important;
              }
            `
          }} />
        </div>
      </section>
    </div>
  );
};

export default Buy;
