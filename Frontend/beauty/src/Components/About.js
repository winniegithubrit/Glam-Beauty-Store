import React from 'react'
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-container">
      <ul>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/products">Our Products</Link>
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

export default About
