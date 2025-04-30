import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Personnages from './pages/Personnages'
import PersonnageDetails from './pages/PersonnageDetails'
import Personnagefav from './pages/PersonnageFav'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Personnages />} />
      <Route path="/personnage/:id" element={<PersonnageDetails />} />
      <Route path="/favoris" element={<Personnagefav />} />
    </Routes>
  </Router>
  )
}

export default App
