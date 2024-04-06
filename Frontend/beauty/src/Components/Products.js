import React from 'react'
import { Link } from "react-router-dom";
import "../App.css";


function Products() {
  return (
    <div className="products">
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>

          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Products
