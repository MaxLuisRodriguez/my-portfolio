import React from 'react';
import { motion } from 'framer-motion';

// TODO: Update this interface with your actual product data structure
interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  caffeine?: string;
  calories?: number;
  comingSoon?: boolean;
}

interface ProductShowcaseProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

// TODO: Replace placeholder product images with actual product photos
const ProductShowcase: React.FC<ProductShowcaseProps> = ({ 
  products, 
  title = "Our Premium Products",
  subtitle = "Crafted with only the finest natural ingredients"
}) => {
  return (
    <section className="py-20 bg-gradient-to-b from-black-950 to-black-900">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header - TODO: Update copy as needed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-gold-500 mb-4">
            {title}
          </h2>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Products Grid - TODO: Adjust grid layout based on number of products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Product Card - TODO: Style to match brand aesthetic */}
              <div className="bg-gradient-to-br from-black-800/50 to-black-900/80 rounded-2xl p-8 border border-primary-500/20 shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
                
                {/* Coming Soon Badge - TODO: Remove when product is live */}
                {product.comingSoon && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black-950 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Coming Soon
                  </div>
                )}

                {/* Product Image - TODO: Replace with actual product photos */}
                <div className="mb-6 relative overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info - TODO: Update with actual product details */}
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-gold-400 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-primary-200 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Product Stats - TODO: Add more stats as needed */}
                  <div className="flex justify-center gap-6 mb-6 text-sm">
                    {product.caffeine && (
                      <div className="text-center">
                        <div className="text-gold-400 font-bold">{product.caffeine}</div>
                        <div className="text-primary-300">Caffeine</div>
                      </div>
                    )}
                    {product.calories && (
                      <div className="text-center">
                        <div className="text-gold-400 font-bold">{product.calories}</div>
                        <div className="text-primary-300">Calories</div>
                      </div>
                    )}
                  </div>

                  {/* Price - TODO: Update with actual pricing */}
                  {product.price && (
                    <div className="text-3xl font-bold text-primary-400 mb-6">
                      ${product.price.toFixed(2)}
                    </div>
                  )}

                  {/* CTA Button - TODO: Connect to actual purchase flow */}
                  <button 
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      product.comingSoon 
                        ? 'bg-black-700 text-primary-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-black-950 shadow-lg hover:shadow-primary-500/30'
                    }`}
                    disabled={product.comingSoon}
                  >
                    {product.comingSoon ? 'Notify Me' : 'Try Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
