import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SwiperCube from '../components/SwiperCube';
import { useTheme } from '../contexts/ThemeContext';
import roseTestImage from '../assets/images/backgrounds/imagerosetest.png';
import fillerCanImage from '../assets/images/products/filler_can.png';

// test email change

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
                className="inline-flex items-center space-x-3 rounded-2xl mb-6 shadow-2xl backdrop-blur-xl transform transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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

          {/* Three Slideshows Side by Side - Full Width */}
          <div className="grid grid-flow-col auto-cols-max justify-center gap-8 w-full overflow-x-auto">
            <SwiperCube images={energyDrinkImages as string[]} delay={2200} size="xl" />
            <SwiperCube images={energyDrinkImages as string[]} delay={2800} size="xl" />
            <SwiperCube images={energyDrinkImages as string[]} delay={2500} size="xl" />
          </div>
        </div>
      </section>

      {/* Pure Natural Powerful Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/40 to-black/60 rounded-3xl p-12 border border-gold-500/20 shadow-2xl backdrop-blur-sm"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-8" style={isDark ? {
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
                  Pure. Natural. Powerful.
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12" style={{ 
                  color: isDark ? '#daa520' : '#8b4513',
                  textShadow: isDark 
                    ? '1px 1px 2px rgba(0,0,0,0.3)'
                    : '1px 1px 2px rgba(255,255,255,0.5)'
                }}>
                  Unlike other energy drinks packed with artificial ingredients, WAW Energy uses only 5 natural components to deliver sustained energy without the crash.
                </p>
              </div>
              
              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 gap-8">
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
                    className="bg-gradient-to-br from-black/60 to-black/40 rounded-2xl p-6 border border-gold-500/30 shadow-xl backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-3 h-3 rounded-full bg-emerald-400 shadow-lg" />
                      <div>
                        <h3 className="text-xl font-bold mb-2" style={{ 
                          color: isDark ? '#ffd700' : '#8b4513',
                          textShadow: isDark 
                            ? '1px 1px 2px rgba(0,0,0,0.3)'
                            : '1px 1px 2px rgba(255,255,255,0.5)'
                        }}>{feature.title}</h3>
                        <p className="text-lg leading-relaxed" style={{ 
                          color: isDark ? '#daa520' : '#8b4513',
                          textShadow: isDark 
                            ? '1px 1px 2px rgba(0,0,0,0.3)'
                            : '1px 1px 2px rgba(255,255,255,0.5)'
                        }}>{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-8 text-center" style={isDark ? {
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
              The WAW Story
            </h2>
            
            {/* Text with image float */}
            <div className="relative">
              {/* Filler Can Image - Float Right */}
              <img
                src={fillerCanImage}
                alt="WAW Energy Can"
                className="float-right ml-8 mb-6"
                style={{
                  width: '280px',
                  height: '280px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '16px',
                  filter: isDark 
                    ? 'drop-shadow(0 8px 32px rgba(255,215,0,0.3)) drop-shadow(0 4px 16px rgba(0,0,0,0.6))' 
                    : 'drop-shadow(0 8px 32px rgba(0,0,0,0.3)) drop-shadow(0 4px 16px rgba(0,0,0,0.2))',
                  shapeOutside: 'margin-box'
                }}
              />
              
              {/* Story Text */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ 
                  color: isDark ? '#daa520' : '#8b4513',
                  textShadow: isDark 
                    ? '1px 1px 2px rgba(0,0,0,0.3)'
                    : '1px 1px 2px rgba(255,255,255,0.5)'
                }}>
                  It began with a twelve-year-old kid sneaking energy drinks into movie theaters, captivated by the magic of that first commercial. By college, he knew more about energy drinks than perhaps himself—hundreds of cans stacked in refrigerators, displayed on desks and shelves.
                </p>
                <p className="text-lg leading-relaxed" style={{ 
                  color: isDark ? '#daa520' : '#8b4513',
                  textShadow: isDark 
                    ? '1px 1px 2px rgba(0,0,0,0.3)'
                    : '1px 1px 2px rgba(255,255,255,0.5)'
                }}>
                  But as his health declined, anxiety grew, and his body became detached from his mind, he stood before his vast sea of bright cans and asked: <em>"Why not build something better?"</em>
                </p>
                <p className="text-lg leading-relaxed" style={{ 
                  color: isDark ? '#daa520' : '#8b4513',
                  textShadow: isDark 
                    ? '1px 1px 2px rgba(0,0,0,0.3)'
                    : '1px 1px 2px rgba(255,255,255,0.5)'
                }}>
                  In his home kitchen, he spent months extracting and searching for the perfect formulation. With a team of top students from leading universities, he created an energy drink that could capture the world's taste buds while steering away from harmful sugars, chemicals, and preservatives.
                </p>
                <p className="text-lg leading-relaxed font-medium" style={{ 
                  color: isDark ? '#b8860b' : '#8b4513',
                  textShadow: isDark 
                    ? '1px 1px 2px rgba(0,0,0,0.3)'
                    : '1px 1px 2px rgba(255,255,255,0.5)'
                }}>
                  That's when a dream was born—a natural, healthy alternative that gives you the boost to accomplish anything in life. The belief that within this world, anything is possible. The WAW Life.
                </p>
              </div>
              
              {/* Clear float */}
              <div className="clear-both"></div>
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
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-8" style={isDark ? {
                background: 'linear-gradient(145deg, #22c55e 0%, #16a34a 25%, #22c55e 50%, #16a34a 75%, #22c55e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(34,197,94,0.5), 0 0 40px rgba(34,197,94,0.3)',
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(34,197,94,0.4))',
                fontWeight: '900'
              } : {
                color: '#16a34a',
                textShadow: '3px 3px 6px rgba(255,255,255,0.9), 0 0 15px rgba(22,163,74,0.6), 0 0 30px rgba(22,163,74,0.4)',
                filter: 'drop-shadow(2px 2px 4px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(22,163,74,0.5))',
                fontWeight: '900'
              }}>
                Botanical Craft: Rose & Mint
              </h2>
              <p className="text-lg leading-relaxed" style={{ 
                color: isDark ? '#22c55e' : '#16a34a',
                textShadow: isDark 
                  ? '2px 2px 4px rgba(0,0,0,0.5), 0 0 12px rgba(34,197,94,0.4)'
                  : '2px 2px 4px rgba(255,255,255,0.8), 0 0 12px rgba(22,163,74,0.5)',
                filter: isDark 
                  ? 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                  : 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
              }}>
                A delicate infusion of rose petals and cooling peppermint leaves delivers a clean, refreshing profile. Powered by organic guarana and balanced with a hint of citrus, it's energy that feels as good as it tastes.
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

      {/* Key Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-8" style={isDark ? {
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
              Why Choose WAW Energy?
            </h2>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "100% Natural",
                description: "No artificial flavors, colors, or preservatives. Only pure, natural ingredients that your body recognizes and processes efficiently."
              },
              {
                title: "Sustained Energy",
                description: "150mg of natural caffeine from organic guarana provides clean, sustained energy without the crash or jitters."
              },
              {
                title: "Premium Quality",
                description: "Crafted with rose petal infusion and carefully selected botanicals for a unique, refreshing taste experience."
              },
              {
                title: "Low Calorie",
                description: "Only 55 calories per can with no added sugars, making it perfect for health-conscious energy seekers."
              },
              {
                title: "No Crash",
                description: "Natural ingredients work with your body's systems to provide smooth energy that lasts without the dreaded energy crash."
              },
              {
                title: "Clean Ingredients",
                description: "Transparent ingredient list with no hidden chemicals, artificial sweeteners, or mystery additives."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-black/60 to-black/40 rounded-2xl p-8 border border-gold-500/30 shadow-xl backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-4" style={{ 
                  color: isDark ? '#ffd700' : '#8b4513',
                  textShadow: isDark 
                    ? '1px 1px 2px rgba(0,0,0,0.3)'
                    : '1px 1px 2px rgba(255,255,255,0.5)'
                }}>{benefit.title}</h3>
                <p className="text-lg leading-relaxed" style={{ 
                  color: isDark ? '#daa520' : '#8b4513',
                  textShadow: isDark 
                    ? '1px 1px 2px rgba(0,0,0,0.3)'
                    : '1px 1px 2px rgba(255,255,255,0.5)'
                }}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-8" style={isDark ? {
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
              Experience Pure Natural Energy
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed mb-12" style={{ 
              color: isDark ? '#daa520' : '#8b4513',
              textShadow: isDark 
                ? '1px 1px 2px rgba(0,0,0,0.3)'
                : '1px 1px 2px rgba(255,255,255,0.5)'
            }}>
              Join thousands who have made the switch to natural energy. No artificial ingredients, no crash, just pure power to fuel your day.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/buy" style={{ textDecoration: 'none' }}>
                <button
                  className="font-black transition-all duration-300 transform shadow-2xl relative overflow-hidden flex items-center gap-3"
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                    Try WAW Energy
                  </span>
                </button>
              </Link>
              
              <button
                className="font-black transition-all duration-300 transform shadow-2xl relative overflow-hidden flex items-center gap-3"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                  Get Updates
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