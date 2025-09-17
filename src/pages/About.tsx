import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SwiperCube from '../components/SwiperCube';
import { useTheme } from '../contexts/ThemeContext';
import roseTestImage from '../assets/images/backgrounds/imagerosetest.png';

const About: React.FC = () => {
  const { isDark } = useTheme();
  // TODO: Replace with actual product images when available
  const imageModules = import.meta.glob('../assets/images/products/*', { eager: true });
  const energyDrinkImages = Object.values(imageModules).map((module: any) => (module as any).default);

  // TODO: Update with actual company values and messaging
  const naturalValues = [
    {
      title: 'Natural Ingredients',
      description: 'Only 5 pure, natural ingredients. No artificial flavors, colors, or preservatives.'
    },
    {
      title: 'Clean Energy',
      description: 'Sustained energy from organic guarana without the crash or jitters.'
    },
    {
      title: 'Unique Flavors',
      description: 'Botanical infusions like rose petals create distinctive, sophisticated taste profiles.'
    },
    {
      title: 'Health-First',
      description: 'Every ingredient serves a purpose. No unnecessary additives or fillers.'
    }
  ];

  // TODO: Update timeline with actual company milestones
  const milestones = [
    {
      year: '2025',
      title: 'Natural Vision',
      description: 'Founded with a mission to create the purest energy drink using only natural ingredients.'
    },
    {
      year: '2025',
      title: 'Iced Rose Launch',
      description: 'Launched our flagship Iced Rose flavor with just 5 natural ingredients.'
    },
    {
      year: 'Future',
      title: 'Expanding Naturally',
      description: 'Developing new botanical flavors while maintaining our commitment to purity.'
    }
  ];

  // TODO: Update with actual team members and photos
  const ingredients = [
    {
      name: 'Brewed Herbal Infusion',
      source: 'Water, Organic Peppermint Leaves, Rose Buds',
      benefit: 'Natural hydration with antioxidant properties'
    },
    {
      name: 'Cane Sugar',
      source: 'Pure, unrefined cane sugar',
      benefit: 'Clean sweetness without artificial alternatives'
    },
    {
      name: 'Organic Guarana Powder',
      source: 'Sustainably sourced Amazon guarana',
      benefit: '150mg natural caffeine for sustained energy'
    },
    {
      name: 'Lemon Juice',
      source: 'Fresh, natural citrus',
      benefit: 'Vitamin C and natural flavor enhancement'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - TODO: Update hero messaging */}
      <section className="relative py-20">
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Brand Badge - TODO: Update badge styling */}
              <div 
                className="inline-flex items-center space-x-3 rounded-2xl mb-6 shadow-2xl backdrop-blur-xl transform hover:scale-102 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                  border: '2px solid #22c55e',
                  padding: '16px 32px',
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span 
                  className="font-black uppercase tracking-widest" 
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
                  BOTANICAL ENERGY
                </span>
              </div>
              
              {/* Main Heading - TODO: Update headline */}
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight" style={isDark ? {
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '4px 4px 8px rgba(0,0,0,0.6), 0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,215,0,0.2), 2px 2px 4px rgba(255,215,0,0.15), -1px -1px 2px rgba(255,255,255,0.1)',
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.3)) drop-shadow(1px 1px 2px rgba(255,255,255,0.2))'
              } : {
                color: '#1a1a1a',
                textShadow: '4px 4px 8px rgba(255,255,255,0.9), 0 0 15px rgba(26,26,26,0.6), 0 0 30px rgba(26,26,26,0.4), 2px 2px 4px rgba(26,26,26,0.2), -1px -1px 2px rgba(255,255,255,0.8)',
                filter: 'drop-shadow(3px 3px 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(26,26,26,0.4)) drop-shadow(1px 1px 2px rgba(255,255,255,0.9))'
              }}>
                Pure Energy,
                <span className="block" style={isDark ? {
                  background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.6), 0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,215,0,0.2), 2px 2px 4px rgba(255,215,0,0.15), -1px -1px 2px rgba(255,255,255,0.1)',
                  filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.3)) drop-shadow(1px 1px 2px rgba(255,255,255,0.2))'
                } : {
                  color: '#1a1a1a',
                  textShadow: '4px 4px 8px rgba(255,255,255,0.9), 0 0 15px rgba(26,26,26,0.6), 0 0 30px rgba(26,26,26,0.4), 2px 2px 4px rgba(26,26,26,0.2), -1px -1px 2px rgba(255,255,255,0.8)',
                  filter: 'drop-shadow(3px 3px 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(26,26,26,0.4)) drop-shadow(1px 1px 2px rgba(255,255,255,0.9))'
                }}>
                  Naturally Crafted
                </span>
              </h1>
              
              {/* WAW Story Introduction */}
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed" style={{ color: '#daa520' }}>
                Starting from a basic home kitchen, WAW is the story of a dream. A journey from energy drink obsession to creating something better for the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Preview - Sleek Triple Cube Carousel */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            {/* TODO: Update section copy */}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-500 mb-2">Experience the Lineup</h2>
            <p className="text-primary-300 max-w-3xl mx-auto">A sleek preview of our premium, natural energy variants.</p>
          </motion.div>

          {/* Three Slideshows Side by Side - Full Width */}
          <div className="grid grid-flow-col auto-cols-max justify-center gap-8 w-full overflow-x-auto">
            <SwiperCube images={energyDrinkImages as string[]} delay={2200} size="xl" />
            <SwiperCube images={energyDrinkImages as string[]} delay={2800} size="xl" />
            <SwiperCube images={energyDrinkImages as string[]} delay={2500} size="xl" />
          </div>
        </div>
      </section>

      {/* The WAW Story Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8" style={{ 
              color: '#b8860b',
              textShadow: '3px 3px 6px rgba(0,0,0,0.6), 0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.2)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 0 12px rgba(245,158,11,0.3))'
            }}>
              The WAW Story
            </h2>
            <div className="text-left max-w-4xl mx-auto space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: '#daa520' }}>
                It began with a twelve-year-old kid sneaking energy drinks into movie theaters, captivated by the magic of that first commercial. By college, he knew more about energy drinks than perhaps himself—hundreds of cans stacked in refrigerators, displayed on desks and shelves.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#daa520' }}>
                But as his health declined, anxiety grew, and his body became detached from his mind, he stood before his vast sea of bright cans and asked: <em>"Why not build something better?"</em>
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#daa520' }}>
                In his home kitchen, he spent months extracting and searching for the perfect formulation. With a team of top students from leading universities, he created an energy drink that could capture the world's taste buds while steering away from harmful sugars, chemicals, and preservatives.
              </p>
              <p className="text-lg leading-relaxed font-medium" style={{ color: '#b8860b' }}>
                That's when a dream was born—a natural, healthy alternative that gives you the boost to accomplish anything in life. The belief that within this world, anything is possible. The WAW Life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Botanical Craft Section - Rose & Mint */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* TODO: Update section title copy */}
              <h2 className="text-4xl md:text-5xl font-display font-bold text-rose-300">
                Botanical Craft: Rose & Mint
              </h2>
              {/* TODO: Replace the paragraph below with your brand voice */}
              <p className="text-primary-200 text-lg leading-relaxed">
                A delicate infusion of rose petals and cooling peppermint leaves delivers a clean, refreshing profile. Powered by organic guarana and balanced with a hint of citrus, it’s energy that feels as good as it tastes.
              </p>
              {/* <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-400/30 bg-black/40 p-4">
                  <div className="text-emerald-300 font-semibold">Mint Cool</div>
                  <div className="text-primary-300 text-sm">Calming finish with crisp clarity</div>
                </div>
                <div className="rounded-xl border border-rose-400/30 bg-black/40 p-4">
                  <div className="text-rose-300 font-semibold">Rose Bright</div>
                  <div className="text-primary-300 text-sm">Elegant floral lift without perfumey notes</div>
                </div>
              </div> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={roseTestImage} 
                alt="WAW Energy Rose & Mint Botanical Craft" 
                className="w-full rounded-2xl shadow-2xl shadow-primary-500/25"
                style={{
                  filter: isDark 
                    ? 'drop-shadow(0 0 20px rgba(255,215,0,0.3)) drop-shadow(0 8px 16px rgba(0,0,0,0.6))'
                    : 'drop-shadow(0 0 20px rgba(184,134,11,0.3)) drop-shadow(0 8px 16px rgba(255,255,255,0.6))'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Values Grid - TODO: Update with actual brand values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {naturalValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gradient-to-br from-black-800/50 to-black-900/80 rounded-2xl p-8 border border-primary-500/20 shadow-xl backdrop-blur-sm"
              >
                <h3 className="text-xl font-display font-bold text-gold-400 mb-2">{value.title}</h3>
                <p className="text-primary-200 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Spotlight - TODO: Update with actual ingredient details */}
      <section className="py-20 bg-gradient-to-b from-black-800/30 to-black-900/50">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6" style={{ color: '#b8860b' }}>
              Just 5 Ingredients
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#daa520' }}>
              Each ingredient is carefully selected for its natural properties and health benefits.
            </p>
          </motion.div>

          {/* Ingredients Grid - TODO: Update with actual ingredient information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-black-800/60 to-black-900/80 rounded-2xl p-8 border border-primary-500/20 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 mt-2" />
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-gold-400 mb-2">
                      {ingredient.name}
                    </h3>
                    <p className="text-primary-300 mb-3 italic">
                      {ingredient.source}
                    </p>
                    <p className="text-primary-200">
                      {ingredient.benefit}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 5th Ingredient Reveal - TODO: Add suspense for 5th ingredient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-br from-gold-500/10 to-gold-600/10 rounded-2xl p-8 max-w-2xl mx-auto border border-gold-500/20 shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-display font-bold text-gold-400 mb-4">
                The 5th Ingredient?
              </h3>
              <p className="text-primary-200 mb-6">
                Our secret natural ingredient that makes WAW Energy truly special. 
                Can you guess what it is?
              </p>
              <Link to="/buy">
                <button 
                  className="font-black py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-102 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                    border: '2px solid #22c55e',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
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
                    Discover It Now
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline - TODO: Update with actual company timeline */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6" style={{ color: '#b8860b' }}>
              Our Journey
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#daa520' }}>
              From concept to your can - the story of natural energy.
            </p>
          </motion.div>

          {/* Timeline - TODO: Update with actual milestones */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-gradient-to-b from-primary-500 to-gold-500 hidden lg:block" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold-500 rounded-full border-4 border-black-950 hidden lg:block" />
                
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}>
                  <div className="bg-gradient-to-br from-black-800/60 to-black-900/80 rounded-2xl p-6 border border-primary-500/20 shadow-xl backdrop-blur-sm">
                    <span className="text-2xl font-bold text-gold-400">{milestone.year}</span>
                    <h3 className="text-xl font-display font-bold text-white mt-2 mb-2">{milestone.title}</h3>
                    <p className="text-primary-200">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - TODO: Update call-to-action */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 to-gold-500/10">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gold-500 mb-6">
              Ready for Pure Energy?
            </h2>
            <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
              Experience the difference that natural ingredients make. No artificial anything, just pure energy.
            </p>
            
            {/* CTA Buttons - TODO: Connect to actual pages */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/buy">
                <button 
                  className="font-black py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-102 shadow-lg flex items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                    border: '2px solid #f59e0b',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                  }}
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
                    🛍️ Try WAW Energy
                  </span>
                </button>
              </Link>
              <button 
                className="font-black py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-102 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.9) 100%)',
                  border: '2px solid #22c55e',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                }}
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
                  📧 Get Updates
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;