import React from 'react';
import { motion } from 'framer-motion';
import SwiperCube from '../components/SwiperCube';

const Home: React.FC = () => {
  // Import product images dynamically
  const imageModules = import.meta.glob('../assets/images/products/*', { eager: true });
  const energyDrinkImages = Object.values(imageModules).map((module: any) => module.default);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section with Large Image */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
                <span className="text-blue-400">⚡</span>
                <span className="text-blue-300 text-sm font-medium">Now Available Worldwide</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Unleash Your
                <span className="block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  Energy
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Premium energy drinks crafted for peak performance and unstoppable focus. 
                Engineered for excellence, powered by innovation.
              </p>
            </motion.div>

            {/* Large Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-12"
            >
              <img 
                src={energyDrinkImages[0]} 
                alt="WAW Energy Hero" 
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl shadow-blue-500/25"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fade-in Image Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.8 },
              y: { duration: 1.2 },
              scale: { duration: 1.0, delay: 0.2 },
              filter: { duration: 0.6, delay: 0.1 }
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <img 
              src={energyDrinkImages[1]} 
              alt="WAW Energy Collection" 
              className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Swiper Cubes Section - Full Width */}
      <section className="py-20 bg-slate-800/30 w-full">
        <div className="w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Choose from our amazing flavors!</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Experience the difference with our premium energy formula designed for modern life.
            </p>
          </motion.div>

          {/* Three Slideshows Side by Side - Full Width */}
          <div className="grid grid-flow-col auto-cols-max justify-center gap-8 w-full">
            <SwiperCube 
              images={energyDrinkImages} 
              delay={2000}
              size="xl"
            />
            <SwiperCube 
              images={energyDrinkImages} 
              delay={3000}
              size="xl"
            />
            <SwiperCube 
              images={energyDrinkImages} 
              delay={2500}
              size="xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
