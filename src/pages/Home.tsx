import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SwiperCube from '../components/SwiperCube';
import FuturisticBotanical from '../components/FuturisticBotanical';
import { brand } from '../config/brand';
// TODO: Import actual product images when available
import wawCanImage from '../assets/images/products/aChatGPT Image Sep 8, 2025, 12_21_34 AM.png';

const Home: React.FC = () => {
  // TODO: Replace with actual product images when available
  const imageModules = import.meta.glob('../assets/images/products/*', { eager: true });
  const energyDrinkImages = Object.values(imageModules).map((module: any) => module.default);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black-950 via-black-900 to-black-950 relative overflow-hidden">
      {/* TODO: Add more futuristic botanical elements throughout the page */}
      <FuturisticBotanical variant="floating" size="xl" position="top-right" />
      <FuturisticBotanical variant="floating" size="lg" position="bottom-left" />
      <FuturisticBotanical variant="corner" size="md" position="top-left" />
      {/* Futuristic Hero Section - TODO: Update hero imagery and copy */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Enhanced Background Effects - TODO: Adjust colors to match brand */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-gold-500/5 to-primary-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse-gold" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full animate-float" />
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        
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
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-gold-500/20 via-primary-500/20 to-gold-500/20 border border-gold-500/50 rounded-full px-8 py-4 mb-8 shadow-neon-gold backdrop-blur-sm"
              >
                <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse-glow" />
                <span className="text-gold-300 text-sm font-medium font-display tracking-wider animate-neon-flicker">🌹 NOW AVAILABLE 🌹</span>
                <div className="w-3 h-3 bg-gold-400 rounded-full animate-pulse-gold" />
              </motion.div>
              
              {/* Futuristic Main Hero Headline - TODO: Update with final brand messaging */}
              <motion.h1 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-8 leading-tight relative"
              >
                <span className="relative inline-block animate-glow-pulse">
                  Natural Energy
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-transparent blur-xl animate-hologram" />
                </span>
                <span className="block bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent animate-neon-flicker relative">
                  Redefined
                  <div className="absolute inset-0 shadow-neon-gold animate-pulse-gold" />
                </span>
              </motion.h1>
              
              {/* Hero Subheading - TODO: Update with brand messaging */}
              <p className="text-xl md:text-2xl text-primary-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                {brand.mission}. Experience pure energy with only 5 natural ingredients.
              </p>
              
              {/* Value Propositions - TODO: Update with key selling points */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {brand.values.slice(0, 3).map((value, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-black-800/50 border border-primary-500/20 rounded-full px-6 py-3 text-sm text-primary-300 backdrop-blur-sm"
                  >
                    ✓ {value}
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Buttons - TODO: Update button actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/buy">
                  <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold-500/30">
                    Try {brand.currentProduct.name} Now
                  </button>
                </Link>
                <Link to="/about">
                  <button className="bg-transparent border-2 border-primary-500 hover:bg-primary-500 text-primary-400 hover:text-black-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Learn More
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
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-500 mb-6">
                  Pure. Natural. Powerful.
                </h2>
                <p className="text-xl text-primary-200 leading-relaxed mb-8">
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
                <button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-black-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
                  Try It Today
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
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gold-500 mb-6">
              Coming Soon
            </h2>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
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
              <h3 className="text-2xl font-display font-bold text-gold-400 mb-4">
                Be the First to Know
              </h3>
              <p className="text-primary-200 mb-6">
                Get notified when new flavors launch and receive exclusive offers.
              </p>
              <button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-black-950 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
                Join the List
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
