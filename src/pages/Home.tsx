import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SwiperCube from '../components/SwiperCube';
import { brand } from '../config/brand';
import { useTheme } from '../contexts/ThemeContext';
import NewsBand from '../components/NewsBand';
// TODO: Import actual product images when available
import wawCanImage from '../assets/images/products/aChatGPT Image Sep 8, 2025, 12_21_34 AM.png';
import wawTriangleLogo from '../assets/images/logos/waw landing page logo.png'

const Home: React.FC = () => {
  const { isDark } = useTheme();
  // TODO: Replace with actual product images when available
  const imageModules = import.meta.glob('../assets/images/products/*', { eager: true });
  const energyDrinkImages = Object.values(imageModules).map((module: any) => module.default);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic Hero Section - TODO: Update hero imagery and copy */}
      <section className="relative pt-16 pb-20">
        
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
                className="inline-flex items-center space-x-4 rounded-2xl mb-2 shadow-2xl backdrop-blur-xl transform transition-all duration-300"
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
                      className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                      style={{
                        width: '600px',
                        height: '600px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '0.675rem',
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
              <p className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed font-black uppercase tracking-wider" style={{ 
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.4))',
                fontWeight: '900'
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
                    className="border border-gold-500 rounded-full backdrop-blur-sm font-black uppercase tracking-wider"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)',
                      border: '3px solid #ffd700',
                      borderRadius: '25px',
                      boxShadow: '0 0 25px rgba(255, 215, 0, 0.6), 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 215, 0, 0.1)',
                      padding: '16px 32px',
                      margin: '8px',
                      color: '#ffd700',
                      textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
                      fontWeight: '900'
                    }}
                  >
                    ✓ {value}
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Buttons - TODO: Update button actions */}
              <div className="flex flex-row gap-6 justify-center items-center">
                <Link to="/buy">
                  <button 
                    className="font-black transition-all duration-300 transform shadow-2xl relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)',
                      border: '3px solid #ffd700',
                      borderRadius: '30px',
                      boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.1)',
                      fontWeight: '900',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                      paddingLeft: '40px',
                      paddingRight: '40px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span className="uppercase tracking-wider font-black" style={{
                      background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
                      fontWeight: '900',
                      fontSize: '1.2rem',
                      textDecoration: 'none'
                    }}>
                    Try {brand.currentProduct.name} Now
                    </span>
                  </button>
                </Link>
                <Link to="/about">
                  <button 
                    className="font-black transition-all duration-300 transform shadow-2xl relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)',
                      border: '3px solid #22c55e',
                      borderRadius: '30px',
                      boxShadow: '0 0 30px rgba(34, 197, 94, 0.6), 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(34, 197, 94, 0.1)',
                      fontWeight: '900',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                      paddingLeft: '40px',
                      paddingRight: '40px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span className="uppercase tracking-wider font-black" style={{
                      background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
                      fontWeight: '900',
                      fontSize: '1.2rem',
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
      {/* News Band Section */}
      <NewsBand />
            
      {/* Enhanced CTA Section */}
      <section className="pt-48 pb-20 bg-gradient-to-b from-black/40 via-black/60 to-black/40">
        <div className="container mx-auto max-w-5xl px-6 text-center">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
            {/* Enhanced Try It Today Button */}
            <Link to="/buy">
              <motion.button 
                className="font-black transition-all duration-300 transform shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)',
                  border: '4px solid #ffd700',
                  borderRadius: '50px',
                  boxShadow: '0 0 50px rgba(255, 215, 0, 0.7), 0 12px 40px rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(255, 215, 0, 0.15)',
                  fontWeight: '900',
                  paddingTop: '60px',
                  paddingBottom: '60px',
                  paddingLeft: '120px',
                  paddingRight: '120px',
                  marginTop: '80px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 70px rgba(255, 215, 0, 0.9), 0 16px 56px rgba(0, 0, 0, 0.7), inset 0 0 35px rgba(255, 215, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.7), 0 12px 40px rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(255, 215, 0, 0.15)';
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span 
                  className="relative z-10 uppercase tracking-widest font-black"
                  style={{
                    background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.4)',
                    filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.5))',
                    fontWeight: '900',
                    fontSize: '4rem'
                  }}
                >
                  Try It Today
                </span>
                
                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
                    boxShadow: '0 0 40px rgba(255,215,0,0.4)',
                    borderRadius: '50px'
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
              </Link>
            
            </motion.div>
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
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-widest mb-6" style={{
              background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.4))',
              fontWeight: '900'
            }}>
              Coming Soon
            </h2>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-widest max-w-4xl mx-auto" style={{
              background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.4))',
              fontWeight: '900'
            }}>
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
              <h3 className="text-2xl font-black uppercase tracking-wider mb-4" style={{
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
                fontWeight: '900'
              }}>
                Be the First to Know
              </h3>
              <p className="mb-6 font-black uppercase tracking-wider" style={{
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,215,0,0.4), 0 0 20px rgba(255,215,0,0.2)',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.9)) drop-shadow(0 0 6px rgba(255,215,0,0.3))',
                fontWeight: '900'
              }}>
                Get notified when new flavors launch and receive exclusive offers.
              </p>
              <button 
                className="font-black transition-all duration-300 transform shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)',
                  border: '3px solid #f59e0b',
                  borderRadius: '30px',
                  boxShadow: '0 0 30px rgba(245, 158, 11, 0.6), 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(245, 158, 11, 0.1)',
                  fontWeight: '900',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  paddingLeft: '40px',
                  paddingRight: '40px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span className="uppercase tracking-wider font-black" style={{
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
                  fontWeight: '900',
                  fontSize: '1.2rem',
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
