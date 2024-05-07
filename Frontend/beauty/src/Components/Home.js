import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Function to handle navigation to the Products page
  const handleNavigateToProducts = () => {
    navigate("/products"); // Navigate to the Products page
  };

  return (
    <div>
      <div className="big-image">
        {/* Your image tag here */}
        <img
          src="https://images.unsplash.com/photo-1598528738936-c50861cc75a9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Make Up Image"
        />
        <div className="image-text">
          <h2>GLAM BEAUTY STORE</h2>
          <h2>IS NOW OPEN !!</h2>
          <h3>Discover your beauty essentials with us </h3>
          <h3>
            Transform your look and embrace your <br /> glamour today!
          </h3>
          <h3>
            Explore our curated collection of makeup <br />
            must-haves
          </h3>
          <div className="btn">
            {/* Button to navigate to Products page */}
            <input
              type="button"
              value="Our Products"
              onClick={handleNavigateToProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
