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
      name,
      price,
      image,
      quantity: 1
    });
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-600/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
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
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 