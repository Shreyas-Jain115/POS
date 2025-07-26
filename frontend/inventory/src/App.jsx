import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SoldProduct from './components/SoldProduct'
import CreateProduct from './components/CreateProduct'
import ViewAllProduct from './components/ViewAllProduct'
import ViewAllSoldProduct from './components/ViewAllSoldProduct'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ViewAllProduct />
      <ViewAllSoldProduct />
    </>
  )
}

export default App
