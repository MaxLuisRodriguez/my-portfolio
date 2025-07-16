import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home(): React.JSX.Element {
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h1>Welcome to Energy!</h1>
      <p>Get your energy boost now.</p>
    </div>
  );
}

function About(): React.JSX.Element {
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h1>About Energy</h1>
      <p>Energy is the coolest energy drink to keep you going strong!</p>
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
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h1>Buy Energy</h1>
      <form onSubmit={handleBuy} style={{ marginBottom: 20 }}>
        <label>
          Number of cans:
          <input
            type="number"
            min="1"
            max="24"
            value={cans}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCans(Number(e.target.value))}
            style={{ marginLeft: 8, width: 60 }}
          />
        </label>
        <button type="submit" style={{ marginLeft: 12 }}>Buy</button>
      </form>
      {bought && <p style={{ color: 'green' }}>You bought {cans} can(s) of Energy! Redirecting to home...</p>}
    </div>
  );
}

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 24 }}>
          <Link to="/" style={{ marginRight: 16 }}>Home</Link>
          <Link to="/about" style={{ marginRight: 16 }}>About</Link>
          <Link to="/buy">Buy</Link>
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