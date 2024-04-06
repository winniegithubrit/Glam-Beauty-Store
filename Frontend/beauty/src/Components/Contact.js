import React from 'react'
import { Link } from "react-router-dom";
import "../App.css";

function Contact() {
  return (
    <div className="contactpage">
      <div className="navbar">
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
        </ul>
      </div>
    </div>
  );
}

export default Contact
