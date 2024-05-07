import React, { useState, useEffect } from "react";
import "./ProductForm.css";

import { useParams, Link } from "react-router-dom";


function ProductForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Fetch the product details based on the ID
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image,
        });
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    // Create a new product object using the form data
    const updatedProduct = { ...formData };

    // Send a PUT request to the server with the updated product data
    fetch(`http://127.0.0.1:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product updated:", data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  }

  return (
    <div className="form-cont">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Price:</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
        <label>Image URL:</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>
      <Link to="/">Back to Products</Link>
    </div>
  );
}

export default ProductForm;
