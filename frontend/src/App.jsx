import { useState } from 'react'

import './App.css'
import Register from './pages/Register'
import Log from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

  {/* < Register /> */}
  <Log />
    </div>
  )
}

export default App
