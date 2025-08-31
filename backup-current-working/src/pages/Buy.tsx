import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const Buy: React.FC = () => {
  // Import product images dynamically
  const imageModules = import.meta.glob('../assets/images/products/*', { eager: true });
  const productImages = Object.values(imageModules).map((module: any) => module.default);

  // Sample product data - you can expand this later
  const products = [
    {
      id: 'tropical-storm',
      name: 'Tropical Storm Energy',
      price: 3.99,
      image: productImages[0],
      description: 'Premium energy drink with tropical fruit flavors and sustained focus formula.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
                <span className="text-blue-400">🛍️</span>
                <span className="text-blue-300 text-sm font-medium">Shop Now</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Get Your
                <span className="block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  WAW Energy
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience the ultimate energy boost with our premium formulas. 
                Add to cart and feel the difference today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Premium Products</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Choose from our selection of high-performance energy drinks.
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          {/* Future Products Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-slate-800/30 rounded-xl p-8 border border-blue-600/30">
              <h3 className="text-2xl font-bold text-white mb-4">More Products Coming Soon!</h3>
              <p className="text-blue-200 text-lg">
                We're constantly developing new flavors and formulas. Stay tuned for exciting additions to our lineup!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Buy;
