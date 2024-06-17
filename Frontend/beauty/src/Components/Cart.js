import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    fetch("http://127.0.0.1:5000/carts")
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

  const increaseQuantity = (itemId) => {
    fetch(`http://127.0.0.1:5000/carts/${itemId}/increase-quantity`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to increase quantity");
        }
        return response.json();
      })
      .then((data) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: data.quantity, total: data.total };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error("Error increasing quantity:", error);
      });
  };

  const decreaseQuantity = (itemId) => {
    fetch(`http://127.0.0.1:5000/carts/${itemId}/decrease-quantity`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to decrease quantity");
        }
        return response.json();
      })
      .then((data) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: data.quantity, total: data.total };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error("Error decreasing quantity:", error);
      });
  };

  const deleteCartItem = (itemId) => {
    fetch(`http://127.0.0.1:5000/carts/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleCheckout = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <span>Name: {item.name}</span>
              <br />
              <span>Price: ${item.price}</span>
              <br />
              <span>Description: {item.description}</span>
              <br />
              <span>Quantity: {item.quantity}</span>
              <br />
              <span>Total: ${item.total}</span>
              <div className="cart-item-actions">
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <button onClick={() => deleteCartItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
