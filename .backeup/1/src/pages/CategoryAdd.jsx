import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryAdd = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: null, // Store the image file
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setCategoryData({ ...categoryData, image: imageFile });
  };

  const navigate = useNavigate(); // Define the navigate function

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryData.name);
  
    
    // Check if an image has been selected before appending it
    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }

    // Make a POST request to the Django API using Axios with the FormData
    axios
      .post('http://127.0.0.1:8000/api/category/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
        },
      })
      .then((response) => {
        // Handle the response data as needed
        console.log(response.data);

        // redirect
        navigate("/category/list/");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={categoryData.name}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CategoryAdd;
