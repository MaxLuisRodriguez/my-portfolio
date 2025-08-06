import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

import ImageSlideshow from './components/ImageSlideshow';
import test1Image from './assets/test-1.jpg';
import test2Image from './assets/test-2.jpg';


function Home(): React.JSX.Element {
  const energyDrinkImages = [
    test1Image,
    test2Image,
    'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
  ];

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to WAW Energy!</h1>
      <p className="text-xl text-gray-600 mb-8">Get your energy boost now.</p>

      <div className="mb-8">
        <ImageSlideshow images={energyDrinkImages} interval={4000} />
      </div>


      <p className="text-lg text-gray-700">Choose from our amazing flavors!</p>
    </div>
  )
}

function About(): React.JSX.Element {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Energy</h1>
      <p className="text-xl text-gray-600">Energy is the coolest energy drink to keep you going strong!</p>
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
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Buy Energy</h1>
      <form onSubmit={handleBuy} className="mb-6">
        <label className="block mb-4">
          <span className="text-lg text-gray-700">Number of cans:</span>
          <input
            type="number"
            min="1"
            max="24"
            value={cans}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCans(Number(e.target.value))}
            className="ml-3 w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
        >
          Buy
        </button>
      </form>
      {bought && (
        <p className="text-green-600 text-lg font-semibold">
          You bought {cans} can(s) of Energy! Redirecting to home...
        </p>
      )}
    </div>
  );
}

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <div className="p-6">
        <nav className="mb-8 bg-white shadow-md rounded-lg p-4">
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              About
            </Link>
            <Link 
              to="/buy" 
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Buy
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 