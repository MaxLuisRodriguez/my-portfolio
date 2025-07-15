import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>⚡ Welcome to WAW Energy! ⚡</h1>
      <p>Get your energy boost now with the coolest energy drink around!</p>
      <div style={{ marginTop: '40px' }}>
        <Link to="/buy" style={{
          display: 'inline-block',
          padding: '15px 30px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '1.2em',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}>
          🛒 Buy Now!
        </Link>
      </div>
    </div>
  )
}

function About() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>🚀 About WAW Energy</h1>
      <p>WAW Energy is the coolest energy drink to keep you going strong!</p>
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px', 
        marginTop: '30px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3>Why Choose WAW?</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block', color: 'white' }}>
          <li>⚡ Maximum energy boost</li>
          <li>🍃 Natural ingredients</li>
          <li>💪 Great taste</li>
          <li>🚀 Keeps you focused</li>
        </ul>
      </div>
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
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>🛒 Buy WAW Energy</h1>
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        padding: '30px', 
        borderRadius: '15px',
        maxWidth: '400px',
        margin: '0 auto',
        backdropFilter: 'blur(10px)'
      }}>
        <form onSubmit={handleBuy}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              color: 'white', 
              fontSize: '1.1em' 
            }}>
              Number of cans:
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={cans}
              onChange={e => setCans(parseInt(e.target.value) || 1)}
              style={{ 
                width: '80px', 
                textAlign: 'center',
                fontSize: '1.1em'
              }}
            />
          </div>
          <button type="submit" style={{ 
            fontSize: '1.1em',
            padding: '12px 30px'
          }}>
            💳 Buy {cans} Can{cans > 1 ? 's' : ''}!
          </button>
        </form>
        {bought && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderRadius: '8px',
            border: '2px solid #4CAF50'
          }}>
            <p style={{ color: '#4CAF50', margin: 0, fontWeight: 'bold' }}>
              ✅ You bought {cans} can{cans > 1 ? 's' : ''} of WAW Energy! 
              <br />
              Redirecting to home...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <nav style={{ 
        backgroundColor: 'rgba(0,0,0,0.2)', 
        padding: '15px 20px',
        marginBottom: '20px',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          <Link to="/" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1em',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s'
          }}>🏠 Home</Link>
          <Link to="/about" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1em',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s'
          }}>ℹ️ About</Link>
          <Link to="/buy" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '1.1em',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s'
          }}>🛒 Buy</Link>
        </div>
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
