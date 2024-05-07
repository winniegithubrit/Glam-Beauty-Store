import React, { useState, useEffect } from "react";
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  // Function to handle product deletion
  const handleDelete = (productId) => {
    // Send a DELETE request to the server to delete the product
    fetch(`http://127.0.0.1:5000/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Remove the deleted product from the products state
        setProducts(products.filter((product) => product.id !== productId));
        console.log("Product deleted:", data);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  // Function to handle adding a product to the cart
  const addToCart = (productId) => {
    // Implement logic to add the product to the cart
    // For now, just navigate to the cart page
    navigate("/cart");
  };

  return (
    <div className="main">
      {/* Product data */}
      <div className="product-data">
        <h1>Our Products</h1>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product-container">
                <div className="card">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    {/* Add to Cart button */}
                    <button onClick={() => addToCart(product.id)}>
                      Add to Cart
                    </button>
                    <div>
                      <Link to={`/products/${product.id}`}>
                        <button>Update</button>
                      </Link>
                      <button onClick={() => handleDelete(product.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
