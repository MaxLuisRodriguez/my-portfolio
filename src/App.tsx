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

// Component that uses theme - must be inside ThemeProvider
const ThemedApp: React.FC = () => {
  const { isDark } = useTheme();
  
  console.log('ThemedApp rendering with theme:', isDark ? 'dark' : 'light');
  
  return (
    <div 
      className="min-h-screen transition-all duration-300"
      style={{
        backgroundColor: isDark 
          ? 'rgb(15 23 42)' // slate-900
          : 'rgb(255 255 255)', // white
        color: isDark 
          ? 'rgb(255 255 255)' // white
          : 'rgb(0 0 0)', // black
        backgroundImage: isDark 
          ? 'linear-gradient(to bottom, rgb(15 23 42), rgb(30 58 138), rgb(15 23 42))' // slate-900 via-blue-900 to slate-900
          : 'none'
      }}
    >
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
          <ThemedApp />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;