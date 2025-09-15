import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const CartDropdown: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    totalItems, 
    totalPrice, 
    redirectToShopify,
    clearCart 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-full z-50 mt-2 w-96 rounded-lg border border-blue-700/50 bg-slate-900/95 shadow-2xl backdrop-blur-xl transform -translate-x-full"
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between border-b border-blue-700/30 p-4">
          <h3 className="text-lg font-bold text-white">Shopping Cart</h3>
          <button
            onClick={closeCart}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-96 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-blue-200">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-12 h-12 rounded object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{item.title}</h4>
                    <p className="text-blue-400 font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="text-white font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t border-blue-700/30 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Total ({totalItems} items):</span>
              <span className="text-white font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={redirectToShopify}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Checkout on Shopify
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartDropdown; 