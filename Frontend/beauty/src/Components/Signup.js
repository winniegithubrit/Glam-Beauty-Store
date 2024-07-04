import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
    };

    try {
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="glam-auth-container" id="glam-signup-container">
      <div className="glam-form-box glam-sign-up-box">
        <form className="glam-signup-form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="glam-social-icons">
            <a href="#" className="glam-social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="glam-social-link">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="glam-social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
