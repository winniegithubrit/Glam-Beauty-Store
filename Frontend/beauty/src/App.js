import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import Home from "./Components/Home";
import Products from "./Components/Products";
import Contact from "./Components/Contact";
import About from "./Components/About";
import AddForm from "./Components/AddForm";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar">
          <div className="inner-nav">
            <Link to="/home">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/add-product">Add Product</Link>
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>{cartItems.length}</span>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/products"
            element={
              <Products cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/add-product" element={<AddForm />} />
          <Route path="*" element={<Home />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
