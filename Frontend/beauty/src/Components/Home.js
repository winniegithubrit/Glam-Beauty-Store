import React from 'react'
import { Link } from "react-router-dom"
import "./App.css"

function Home() {
  return (
    <div className="Home">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Our Products</Link>
        </li>
        <li>
          <Link  to="/about">About Us</Link>
        </li>
        <li>
          <Link  to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="users">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home
