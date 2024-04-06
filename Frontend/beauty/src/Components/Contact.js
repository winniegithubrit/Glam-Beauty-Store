import React from 'react'
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="contactpage">
      <ul>
        <li>
          <Link to="/">Contact Us</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/products">Our Products</Link>
        </li>

        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="users">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Contact
