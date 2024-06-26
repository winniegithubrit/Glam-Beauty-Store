import React, { useState, useEffect } from "react";
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";

function Products({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  const handleDelete = (productId) => {
    fetch(`http://127.0.0.1:5000/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(products.filter((product) => product.id !== productId));
        console.log("Product deleted:", data);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const addToCart = (product) => {
    const cartItem = {
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: 1, // Default quantity
      total: product.price, // Default total
      user_id: 1, // Assuming user_id is 1 for demo purposes
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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main">
      <div className="product-data">
        <h1>Our Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <div className="product-container">
                <div className="card">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <div className="card-actions">
                      <button
                        onClick={() => addToCart(product)}
                        className="btns btn-add-to-cart"
                      >
                        Add To Cart
                      </button>
                      <Link to={`/update-product/${product.id}`}>
                        <button className="btns btn-small">Update</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btns btn-small"
                      >
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
