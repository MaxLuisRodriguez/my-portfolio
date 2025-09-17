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
        backgroundColor: isDark ? '#000000' : '#ffffff', // Pure black for dark, white for light
        background: isDark ? '#000000' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
        margin: 0,
        padding: 0
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