import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const CategoryEdit = () => {
  const { category_id } = useParams(); // Get the category_id from the URL

  const [formData, setFormData] = useState({
    name: "",
    image: null, // Initialize the image property with null
    // Add other fields as needed for editing
  });

  useEffect(() => {
    // Fetch the category data for editing
    axios.get(`http://127.0.0.1:8000/api/category/${category_id}/edit/`)
      .then((response) => {
        setFormData({
          name: response.data.name,
          image: null, // Initialize the image field with null (you can set it to the image URL if you want to display the existing image)
          // Set other fields as needed for editing
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [category_id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const navigate = useNavigate(); // Define the navigate function

  const handleCategoryEdit = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

   

    axios
      .patch(`http://127.0.0.1:8000/api/category/${category_id}/edit/`, formDataToSend)
      .then((response) => {
        // Handle success, e.g., show a success message or redirect to the category list
        console.log("Category updated successfully");

         // redirect
        navigate("/category/list/");
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  return (
    <div>
      <h1>Edit Category</h1>
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
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image" // Set the name attribute to "image"
            onChange={handleFileChange}
          />
        </div>
        {/* Add fields for other category properties as needed */}
        <button type="button" onClick={handleCategoryEdit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CategoryEdit;
