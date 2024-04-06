import React from 'react'
import "../App.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-container">
      <div className="navbar">
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
        </ul>
      </div>
    </div>
  );
}

export default About
