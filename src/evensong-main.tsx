import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './refinements.css'
import Evensong from './Evensong'

createRoot(document.getElementById('root')!).render(<StrictMode><Evensong /></StrictMode>)
