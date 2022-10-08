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
        <div className="mainpage">
          <h1>
          </h1>
        </div>
        <Footer />        
      </body>
    </html>
  );
};

export default App;
