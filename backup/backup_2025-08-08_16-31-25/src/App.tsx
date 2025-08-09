import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import SwiperCube from './components/SwiperCube';
import Header from './components/Header';
import Footer from './components/Footer';
import StatBars from './components/StatBars';
import HeroShader from './components/HeroShader';
import { motion } from 'framer-motion';

function Home(): React.JSX.Element {
  const imageModules = import.meta.glob('./assets/images/products/*', { eager: true });
  const energyDrinkImages = Object.values(imageModules).map((module: any) => module.default);
  
  console.log('Home page - imageModules:', imageModules);
  console.log('Home page - energyDrinkImages:', energyDrinkImages);

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary-950 via-surface-900 to-secondary-950 py-20">
        <HeroShader />
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="font-display text-6xl font-black uppercase tracking-tight text-white md:text-8xl lg:text-9xl"
            >
              Unleash Your Energy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-xl text-secondary-200 md:text-2xl font-medium"
            >
              Premium energy drinks crafted for peak performance and unstoppable focus
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6"
            >
              <a 
                href="#products" 
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 px-8 py-4 text-lg font-black uppercase tracking-wider text-white shadow-glow transition-all hover:scale-105 hover:shadow-glow-lg"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a 
                href="#learn" 
                className="rounded-xl border-2 border-secondary-300 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-primary-400 hover:bg-primary-500/10"
              >
                Learn More
              </a>
            </motion.div>
            
            {/* Product Cubes */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 flex items-center justify-center gap-8"
            >
              <SwiperCube images={energyDrinkImages} delay={2000} size="sm" />
              <SwiperCube images={energyDrinkImages} delay={2500} size="sm" />
              <SwiperCube images={energyDrinkImages} delay={3000} size="sm" />
            </motion.div>
            
            {/* Performance Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mx-auto mt-12 max-w-lg"
            >
              <StatBars />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-secondary-950 py-32 border-t-4 border-primary-500/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-black uppercase tracking-wider text-white md:text-5xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-secondary-300 font-medium">Premium energy blends for every lifestyle</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {energyDrinkImages.slice(0, 4).map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-secondary-700 bg-gradient-to-b from-surface-800 to-surface-900 p-6 shadow-card transition-all hover:scale-105 hover:shadow-card-hover hover:border-primary-500"
              >
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img 
                    src={src} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={`Energy drink flavor ${idx + 1}`} 
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white">Energy Blast {idx + 1}</h3>
                  <p className="mt-1 text-sm text-secondary-400 font-medium">12 fl oz • 120mg caffeine</p>
                  <p className="mt-2 text-xs text-secondary-500">Premium formula with natural ingredients</p>
                </div>
                <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-accent-400 to-accent-500 px-4 py-2 text-sm font-black uppercase tracking-wide text-secondary-900 transition-all hover:shadow-lg hover:from-accent-300 hover:to-accent-400">
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn" className="bg-gradient-to-b from-secondary-950 to-surface-950 py-32 border-t-4 border-primary-500/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-black uppercase tracking-wider text-white md:text-5xl">
              Why Choose WAW
            </h2>
            <p className="mt-4 text-lg text-secondary-300 font-medium">Engineered for performance, crafted for taste</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Clean Ingredients",
                description: "Zero artificial colors, premium B-vitamins, and natural electrolytes for sustained energy without the crash.",
                icon: "⚡"
              },
              {
                title: "Sustained Energy",
                description: "Our advanced formula provides 6+ hours of clean energy and razor-sharp focus without jitters.",
                icon: "🚀"
              },
              {
                title: "Incredible Taste",
                description: "Bold, refreshing flavors from tropical storm to arctic blast that you'll actually crave.",
                icon: "🎯"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-secondary-700 bg-gradient-to-b from-surface-800 to-surface-900 p-8 shadow-card transition-all hover:scale-105 hover:shadow-card-hover hover:border-primary-500"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-4 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-secondary-300 leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Add spacing before footer */}
      <div className="h-20"></div>
    </div>
  );
}

function About(): React.JSX.Element {
  // Use the same working approach as Home page
  const imageModules = import.meta.glob('./assets/images/products/*', { eager: true });
  const productImages = Object.values(imageModules).map((module: any) => module.default);
  
  console.log('About page - imageModules:', imageModules);
  console.log('About page - productImages:', productImages);


  return (
    <div className="bg-gradient-to-b from-secondary-950 via-surface-900 to-secondary-950 text-white">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="font-display text-5xl font-black uppercase tracking-tight text-white md:text-7xl">
              About WAW Energy
            </h1>
            <p className="mt-6 text-xl text-secondary-200 font-medium md:text-2xl">
              Pioneering the future of energy drinks with clean ingredients, bold flavors, and uncompromising quality.
            </p>
          </motion.div>
                     <div className="mt-12 flex justify-center">
             <SwiperCube images={productImages} delay={1800} size="lg" />
           </div>
        </div>
      </section>

      {/* Product Gallery replaced with Swiper Cube */}
      <section className="py-32 border-t-4 border-primary-500/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-black uppercase tracking-wider text-white md:text-5xl">
              Our Product Line
            </h2>
            <p className="mt-4 text-lg text-secondary-300 font-medium">Every flavor tells a story of innovation</p>
          </div>
                     <div className="grid grid-flow-col auto-cols-max justify-center gap-8">
             <SwiperCube images={productImages} delay={2000} size="md" />
             <SwiperCube images={productImages} delay={2500} size="md" />
             <SwiperCube images={productImages} delay={3000} size="md" />
           </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 border-t-4 border-primary-500/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-black uppercase tracking-wider text-white md:text-5xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-secondary-300 font-medium">Driven by purpose, powered by innovation</p>
          </div>

          {/* Bottom Slideshow Section */}
          <section className="py-16 border-t-4 border-primary-500/30">
            <div className="container mx-auto max-w-7xl px-6">
              <div className="flex justify-center">
                <SwiperCube images={productImages} delay={3500} size="lg" />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Pure Innovation",
                description: "We revolutionize energy drinks with cutting-edge research and premium ingredients that fuel your ambitions.",
                icon: "🔬"
              },
              {
                title: "Quality First",
                description: "Every can meets our rigorous standards for purity, potency, and taste - no compromises, ever.",
                icon: "🏆"
              },
              {
                title: "Sustainable Future",
                description: "Carbon-neutral production, recyclable packaging, and community-focused initiatives for a better tomorrow.",
                icon: "🌱"
              }
            ].map((mission, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-secondary-700 bg-gradient-to-b from-surface-800 to-surface-900 p-8 shadow-card transition-all hover:scale-105 hover:shadow-card-hover hover:border-primary-500"
              >
                <div className="mb-4 text-4xl">{mission.icon}</div>
                <h3 className="mb-4 text-xl font-bold text-white">{mission.title}</h3>
                <p className="text-secondary-300 leading-relaxed font-medium">{mission.description}</p>
              </motion.div>
            ))}
          </div>
                  </div>
      </section>

      
      
      {/* Add spacing before footer */}
      <div className="h-20"></div>
    </div>
  );
}

function Buy(): React.JSX.Element {
  const [cans, setCans] = useState<number>(1);
  const [bought, setBought] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBuy = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setBought(true);
    setTimeout(() => {
      setBought(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-b from-secondary-950 via-surface-900 to-secondary-950 text-white min-h-screen">
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h1 className="font-display text-5xl font-black uppercase tracking-tight text-white md:text-7xl">
              Get Your Energy
            </h1>
            <p className="mt-6 text-xl text-secondary-200 font-medium">
              Choose your quantity and fuel your potential
            </p>
          </div>
          
          <div className="mx-auto mt-12 max-w-md">
            <div className="rounded-2xl border border-secondary-700 bg-gradient-to-b from-surface-800 to-surface-900 p-8 shadow-card">
              <form onSubmit={handleBuy} className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-white">Number of Cans</label>
                  <p className="mt-1 text-sm text-secondary-400 font-medium">Each can contains 120mg of premium caffeine</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={cans}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCans(Number(e.target.value))}
                    className="w-20 rounded-lg border border-secondary-600 bg-surface-800 px-4 py-3 text-center text-xl font-bold text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <span className="text-secondary-400">×</span>
                  <span className="text-2xl font-bold text-white">${(cans * 3.99).toFixed(2)}</span>
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 px-8 py-4 text-lg font-black uppercase tracking-wider text-white shadow-glow transition-all hover:scale-105 hover:shadow-glow-lg hover:from-primary-400 hover:to-primary-300"
                >
                  Buy Now - ${(cans * 3.99).toFixed(2)}
                </button>
              </form>
              
              {bought && (
                <div className="mt-6 rounded-lg bg-primary-500/20 border border-primary-500/30 p-4 text-center">
                  <p className="font-bold text-primary-400">
                    Order confirmed! {cans} can{cans > 1 ? 's' : ''} of pure energy coming your way!
                  </p>
                  <p className="mt-1 text-sm text-primary-300">Redirecting to home...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Add spacing before footer */}
      <div className="h-20"></div>
    </div>
  );
}

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-secondary-950 via-surface-900 to-secondary-950 text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/buy" element={<Buy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;