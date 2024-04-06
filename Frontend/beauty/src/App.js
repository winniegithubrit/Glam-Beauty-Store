import "./App.css";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Contact from "./Components/Contact";
import About from "./Components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <BrowserRouter>
          <div className="inner-nav">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
