import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Buy from './pages/Buy';
import ShopifyCallback from './pages/ShopifyCallback';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Simple component that uses theme
const AppWithTheme: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white' 
        : 'bg-white text-black'
    }`}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/shopify/callback" element={<ShopifyCallback />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <AppWithTheme />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;