import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      setUser(username);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="glam-auth-container" id="glam-login-container">
      <div className="glam-form-box glam-sign-in-box">
        <form className="glam-login-form" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
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
          <span>or use your account</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
