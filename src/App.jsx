import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div>
      <h1>Welcome to WAW Energy!</h1>
      <p>Get your energy boost now.</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h1>About WAW Energy</h1>
      <p>WAW Energy is the coolest energy drink to keep you going strong!</p>
    </div>
  )
}

function Buy() {
  const [cans, setCans] = useState(1)
  const [bought, setBought] = useState(false)
  const navigate = useNavigate()

  const handleBuy = (e) => {
    e.preventDefault()
    setBought(true)
    setTimeout(() => {
      setBought(false)
      navigate('/')
    }, 2000)
  }

  return (
    <div>
      <h1>Buy WAW Energy</h1>
      <form onSubmit={handleBuy}>
        <label>
          Number of cans:
          <input
            type="number"
            min="1"
            max="24"
            value={cans}
            onChange={e => setCans(e.target.value)}
            style={{ marginLeft: '8px', width: '60px' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '12px' }}>Buy</button>
      </form>
      {bought && <p style={{ color: 'green' }}>You bought {cans} can(s) of WAW Energy! Redirecting to home...</p>}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <nav style={{ marginBottom: '24px' }}>
        <Link to="/" style={{ marginRight: '16px' }}>Home</Link>
        <Link to="/about" style={{ marginRight: '16px' }}>About</Link>
        <Link to="/buy">Buy</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
      </Routes>
    </div>
  )
}

export default App
