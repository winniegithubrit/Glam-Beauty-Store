import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductDetails.css"; // Import the updated CSS file

function ProductDetails({ cartItems, setCartItems }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  const addToCart = (product) => {
    const cartItem = {
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: 1,
      total: product.price,
      user_id: 1,
    };

    fetch("http://127.0.0.1:5000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Item added to cart:", data);
        setCartItems([...cartItems, data]);
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details-details">
        <h2>{product.name}</h2>
        <p className="product-details-price">Price: ${product.price}</p>
        <p>{product.description}</p>
        <div className="product-details-actions">
          <button
            className="product-details-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <Link className="product-details-back-link" to="/products">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
