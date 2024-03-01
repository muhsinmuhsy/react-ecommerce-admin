import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const ProductEdit = () => {
  const { product_id } = useParams(); // Get the product_id from the URL

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price: '',
    // Add other fields as needed for editing
  });

  useEffect(() => {
    // Fetch the product data for editing
    axios.get(`http://127.0.0.1:8000/api/product/${product_id}/edit/`)
      .then((response) => {
        setFormData({
            category: response.data.category,
          name: response.data.name,
          price: response.data.price,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [product_id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const navigate = useNavigate(); // Define the navigate function

  const handleProductEdit = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

   

    axios
      .patch(`http://127.0.0.1:8000/api/product/${product_id}/edit/`, formDataToSend)
      .then((response) => {
        // Handle success, e.g., show a success message or redirect to the product list
        console.log("product updated successfully");

         // redirect
        navigate("/product/list/");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div>
      <h1>Edit product</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>
        
        {/* Add fields for other product properties as needed */}
        <button type="button" onClick={handleProductEdit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
