import { Routes, Route } from "react-router-dom"

import Home from './components/Home'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <html>
      <body className='test'>
        <header>
          <div className="wallet">
            <Navbar />
          </div>
        </header>
        <Routes>
        <Route path="/" element={
          <main>
            <Home />
          </main>
        } />
      </Routes>
        <Footer />        
      </body>
    </html>
  );
};

export default App;
