// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Contact from "./Components/Contact";
import About from "./Components/About";
import AddForm from "./Components/AddForm";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Payment from "./Components/Payment";
import ProductForm from "./Components/ProductForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = (username) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCartItems([]); 
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar">
          <div className="inner-nav">
            {!isLoggedIn ? (
              <>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </>
            ) : (
              <>
                <div className="useremail">
                  <span>Welcome, {user}</span>
                </div>
                <Link to="/home">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/add-product">Add Product</Link>
                <Link to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>{cartItems.length}</span>
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
        <Routes>
          {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login setUser={handleLogin} />} />
              <Route path="*" element={<Navigate to="/signup" />} />
            </>
          ) : (
            <>
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
              <Route
                path="/cart"
                element={
                  <Cart cartItems={cartItems} setCartItems={setCartItems} />
                }
              />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/update-product/:id" element={<ProductForm />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
