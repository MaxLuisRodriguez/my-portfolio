import React from 'react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, description }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      title: name,
      price,
      quantity: 1,
      variantId: id, // Using id as variantId for now
      image
    });
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-600/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        {description && (
          <p className="text-blue-200 text-sm mb-4">{description}</p>
        )}
        <div className="text-2xl font-bold text-green-400 mb-4">${price.toFixed(2)}</div>
        
        <button
          onClick={handleAddToCart}
          className="group relative w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transform active:scale-95 overflow-hidden border border-blue-400/30 hover:border-blue-300/50"
        >
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Button content */}
          <div className="relative flex items-center justify-center space-x-2">
            <span className="text-xl">🛒</span>
            <span className="text-lg font-semibold">Add to Cart</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 