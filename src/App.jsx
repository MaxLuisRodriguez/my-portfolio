import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px 20px',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>
        Hello World! 🚀
      </h1>
      
      <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
        Welcome to WAW Energy App
      </p>
      
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Click me! Count: {count}
      </button>
    </div>
  )
}

export default App
