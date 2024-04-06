import './App.css';
import Home from './Components/Home';
import Products from './Components/Products';
import User from './Components/User';
import Contact from './Components/Contact';
import About from './Components/About';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <BrowserRouter>
          <div className="inner-nav">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
        <Products />
        <User />
        <Review />
      </div>
    </div>
  );
}

export default App;
