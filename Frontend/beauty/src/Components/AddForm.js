import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Create a new product object using the form data
    const newProduct = { ...formData };

    // Send a POST request to the server to add the new product
    fetch("http://127.0.0.1:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added:", data);
        // Redirect to the products page after successful addition
        navigate("/products");
        // Clear the form fields after successful submission
        setFormData({
          name: "",
          price: "",
          description: "",
          image: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  }

  return (
    <div>
      <h2>Add Product</h2>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddForm;
