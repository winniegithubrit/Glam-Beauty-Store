// App.js
import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file
import Home from "./Components/Home";
import Products from "./Components/Products";
import Contact from "./Components/Contact";
import About from "./Components/About";
import ProductForm from "./Components/ProductForm";
import AddForm from "./Components/AddForm";
import Cart from "./Components/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items data
    fetch("http://127.0.0.1:5000/products/cart-items")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data); // Update cart items state
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []); // Fetch data only once when component mounts

  console.log("Cart Items:", cartItems); // Log cart items data

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
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductForm />} />
          <Route path="/add-product" element={<AddForm />} />
          <Route path="*" element={<Home />} />
          {/* Pass cartItems as props to Cart */}
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
