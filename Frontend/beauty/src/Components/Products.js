import React from 'react'
import { Link } from "react-router-dom";


function Products() {
  return (
    <div className="products">
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
        <li>
          <Link to="users">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Products
