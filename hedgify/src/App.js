import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
  const [account, setAccount] = useState(undefined);

  return (
    <div id='top' className="change">
      <Header account={account} setAccount={setAccount} />

      <Routes>
        <Route path="/" element={
          <main>
            <Home />
          </main>
        } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
