import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SwiperCube from '../components/SwiperCube';
import { brand } from '../config/brand';
import { useTheme } from '../contexts/ThemeContext';
// TODO: Import actual product images when available
import wawCanImage from '../assets/images/products/aChatGPT Image Sep 8, 2025, 12_21_34 AM.png';
import wawTriangleLogo from '../assets/images/logos/Screenshot 2025-09-16 162132.png'

const Home: React.FC = () => {
  const { isDark } = useTheme();
  // TODO: Replace with actual product images when available
  const imageModules = import.meta.glob('../assets/images/products/*', { eager: true });
  const energyDrinkImages = Object.values(imageModules).map((module: any) => module.default);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic Hero Section - TODO: Update hero imagery and copy */}
      <section className="relative pt-32 pb-20">
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Futuristic Announcement Badge - TODO: Update with current promotions */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-4 rounded-2xl mb-8 shadow-2xl backdrop-blur-xl transform transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                  border: '2px solid #f59e0b',
                  padding: '16px 32px',
                  boxShadow: '0 0 30px rgba(245, 158, 11, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }} />
                <span 
                  className="font-black uppercase tracking-widest animate-pulse" 
                  style={{ 
                    fontSize: '16px',
                    background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                  }}
                >
                  NOW AVAILABLE
                </span>
                <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }} />
              </motion.div>
              
              {/* Hero Headline with Golden Triangle Logo */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mb-6"
              >
                {/* Golden Triangle WAW Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="flex justify-center mb-8"
                >
                  <div className="relative">
                    <img 
                      src={wawTriangleLogo} 
                      alt="WAW Energy Golden Logo" 
                      className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
                      style={{
                        width: '440px',
                        height: '440px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '0.675rem',
                        // filter: isDark 
                        //   ? 'drop-shadow(0 0 20px rgba(255,215,0,0.6)) drop-shadow(0 8px 16px rgba(0,0,0,0.8))'
                        //   : 'drop-shadow(0 0 20px rgba(184,134,11,0.6)) drop-shadow(0 8px 16px rgba(255,255,255,0.8))'
                      }}
                    />
                  </div>
                </motion.div>
                
                {/* Natural Energy - Metallic and Beveled */}
                {/* <h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-4 leading-tight"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)'
                      : 'linear-gradient(145deg, #b8860b 0%, #8b4513 25%, #b8860b 50%, #8b4513 75%, #b8860b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: isDark 
                      ? '4px 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(255,215,0,0.4), 2px 2px 4px rgba(255,215,0,0.2)'
                      : '4px 4px 8px rgba(255,255,255,0.9), 0 0 20px rgba(184,134,11,0.5), 2px 2px 4px rgba(184,134,11,0.3)',
                    filter: isDark 
                      ? 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(255,215,0,0.3))'
                      : 'drop-shadow(3px 3px 6px rgba(255,255,255,0.9)) drop-shadow(0 0 10px rgba(184,134,11,0.4))'
                  }}
                >
                  Natural Energy
                </h1> */}
              </motion.div>
              
              {/* Hero Subheading - TODO: Update with brand messaging */}
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ 
                color: isDark ? '#daa520' : '#b8860b',
                textShadow: isDark 
                  ? '1px 1px 2px rgba(0,0,0,0.3)'
                  : '1px 1px 2px rgba(255,255,255,0.5)'
              }}>
                {brand.mission}. Experience pure energy with only 5 natural ingredients.
              </p>
              
              {/* Value Propositions - TODO: Update with key selling points */}
              <div className="flex flex-wrap justify-center mb-12" style={{ gap: '24px' }}>
                {brand.values.slice(0, 3).map((value, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-black-800/50 border border-gold-500/40 rounded-full text-sm backdrop-blur-sm"
                    style={{ 
                      color: '#daa520',
                      padding: '16px 32px',
                      margin: '8px'
                    }}
                  >
                    ✓ {value}
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Buttons - TODO: Update button actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/buy">
                  <button 
                    className="font-black py-4 px-8 rounded-xl transition-all duration-300 transform shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                      border: '2px solid #f59e0b',
                      boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span style={{
                      background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                      textDecoration: 'none'
                    }}>
                      Try {brand.currentProduct.name} Now
                    </span>
                  </button>
                </Link>
                <Link to="/about">
                  <button 
                    className="font-black py-4 px-8 rounded-xl transition-all duration-300 transform"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                      border: '2px solid #22c55e',
                      boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span style={{
                      background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                      textDecoration: 'none'
                    }}>
                      Learn More
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Product Image - WAW Energy Can Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-12"
            >
              <img 
                src={wawCanImage} 
                alt="WAW Energy Iced Rose Can" 
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl shadow-primary-500/25"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Features Section - TODO: Update with actual product benefits */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Product Image - TODO: Replace with actual nutrition label image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {energyDrinkImages[1] ? (
                <img 
                  src={energyDrinkImages[1]} 
                  alt="WAW Energy Nutrition Facts" 
                  className="w-full rounded-2xl shadow-2xl shadow-primary-500/10"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-primary-500/10 to-gold-500/10 rounded-2xl border border-primary-500/20 flex items-center justify-center">
                  <div className="text-center text-primary-300">
                    <div className="text-6xl mb-4">🏷️</div>
                    <p>Nutrition label image will display here</p>
                  </div>
                </div>
              )}
              
              {/* Floating Elements - keep inside image bounds and avoid overlap */}
              <div className="hidden md:block absolute top-4 right-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black-950 px-4 py-2 rounded-full font-bold text-sm shadow-lg pointer-events-none z-10">
                Only 5 Ingredients!
              </div>
            </motion.div>
            
            {/* Features Content - TODO: Update with actual product features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: '#b8860b' }}>
                  Pure. Natural. Powerful.
                </h2>
                <p className="text-xl leading-relaxed mb-8" style={{ color: '#daa520' }}>
                  Unlike other energy drinks packed with artificial ingredients, WAW Energy uses only 5 natural components to deliver sustained energy without the crash.
                </p>
              </div>
              
              {/* Feature List - TODO: Update with actual product benefits */}
              <div className="space-y-6">
                {[
                  { title: "100% Natural Ingredients", desc: "No artificial flavors, colors, or preservatives" },
                  { title: "150mg Natural Caffeine", desc: "From organic guarana for sustained energy" },
                  { title: "Rose Petal Infusion", desc: "Unique floral notes with antioxidant benefits" },
                  { title: "Only 55 Calories", desc: "Clean energy without excess sugar" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-2 w-2 h-2 rounded-full bg-emerald-400" />
                    <div>
                      <h3 className="text-xl font-bold text-gold-400 mb-1">{feature.title}</h3>
                      <p className="text-primary-300">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button - TODO: Connect to product page */}
              <Link to="/buy">
                <button 
                  className="font-black py-4 px-8 rounded-xl transition-all duration-300 transform shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                    border: '2px solid #22c55e',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span style={{
                    background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                    textDecoration: 'none'
                  }}>
                    Try It Today
                  </span>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section - TODO: Replace with actual product lineup */}
      <section className="py-20 bg-gradient-to-b from-black-800/30 to-black-900/50 w-full">
        <div className="w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6" style={{ color: '#b8860b' }}>
              Coming Soon
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#daa520' }}>
              More premium flavors are in development. Experience the future of natural energy.
            </p>
          </motion.div>

          {/* Product Preview Cubes - TODO: Update with actual upcoming products */}
          <div className="grid grid-flow-col auto-cols-max justify-center gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <SwiperCube 
                images={energyDrinkImages} 
                delay={2000}
                size="xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SwiperCube 
                images={energyDrinkImages} 
                delay={3000}
                size="xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <SwiperCube 
                images={energyDrinkImages} 
                delay={2500}
                size="xl"
              />
            </motion.div>
          </div>
          
          {/* Newsletter Signup - TODO: Connect to email service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-black-800/60 to-black-900/80 rounded-2xl p-8 max-w-2xl mx-auto border border-primary-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-display font-bold mb-4" style={{ color: '#b8860b' }}>
                Be the First to Know
              </h3>
              <p className="mb-6" style={{ color: '#daa520' }}>
                Get notified when new flavors launch and receive exclusive offers.
              </p>
              <button 
                className="font-black py-3 px-6 rounded-xl transition-all duration-300 transform shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                  border: '2px solid #f59e0b',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                  textDecoration: 'none'
                }}>
                  Join the List
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
