import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    fetch("http://127.0.0.1:5000/cart-items")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  // Function to handle checkout button click
  const handleCheckout = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>Price: ${item.price}</span>
              <span>Description: {item.description}</span>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
