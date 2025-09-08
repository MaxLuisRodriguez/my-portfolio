import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import SwiperCube from '../components/SwiperCube';

const About: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-black-950 via-black-900 to-black-950 pt-20">
      {/* Hero Section - TODO: Update hero messaging */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects - TODO: Adjust colors to match botanical brand */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-emerald-400/10 to-rose-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Brand Badge - TODO: Update badge styling */}
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-8 py-3 mb-6">
                {/* <span className="text-rose-400">Rose</span> */}
                <span className="text-emerald-300 text-sm font-medium font-display">BOTANICAL ENERGY</span>
              </div>
              
              {/* Main Heading - TODO: Update headline */}
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Pure Energy,
                <span className="block bg-gradient-to-r from-rose-400 via-emerald-300 to-rose-400 bg-clip-text text-transparent">
                  Naturally Crafted
                </span>
              </h1>
              
              {/* Mission Statement - TODO: Update with actual mission */}
              <p className="text-xl md:text-2xl text-primary-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                {brand.mission}. We believe energy drinks shouldn't compromise your health with artificial ingredients.
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-400/30 bg-black/40 p-4">
                  <div className="text-emerald-300 font-semibold">Mint Cool</div>
                  <div className="text-primary-300 text-sm">Calming finish with crisp clarity</div>
                </div>
                <div className="rounded-xl border border-rose-400/30 bg-black/40 p-4">
                  <div className="text-rose-300 font-semibold">Rose Bright</div>
                  <div className="text-primary-300 text-sm">Elegant floral lift without perfumey notes</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {/* TODO: Replace with product lifestyle/ingredient image */}
              <div className="relative rounded-2xl overflow-hidden border border-primary-500/20 shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-rose-500/20 via-black/40 to-emerald-500/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    {/* TODO: Replace with image (rose & mint product/lifestyle) */}
                    <p className="text-primary-200">Image placeholder — add rose & mint product photo here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Natural Promise Section - TODO: Update with brand promises */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gold-500 mb-6">
              Our Natural Promise
            </h2>
            <p className="text-xl text-primary-200 leading-relaxed">
              Every ingredient in WAW Energy serves a purpose. No artificial flavors, no artificial colors, 
              no artificial sweeteners, and no preservatives. Just pure, natural energy.
            </p>
          </motion.div>

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
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gold-500 mb-6">
              Just 5 Ingredients
            </h2>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
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
              <div className="text-4xl mb-4">🤫</div>
              <h3 className="text-2xl font-display font-bold text-gold-400 mb-4">
                The 5th Ingredient?
              </h3>
              <p className="text-primary-200 mb-6">
                Our secret natural ingredient that makes WAW Energy truly special. 
                Can you guess what it is?
              </p>
              <Link to="/buy">
                <button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-black-950 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
                  Discover It Now
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
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gold-500 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
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
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold-500/30 flex items-center gap-3">
                  <span>🛍️</span>
                  Try WAW Energy
                </button>
              </Link>
              <button className="bg-transparent border-2 border-primary-500 hover:bg-primary-500 text-primary-400 hover:text-black-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                <span>📧</span>
                Get Updates
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;