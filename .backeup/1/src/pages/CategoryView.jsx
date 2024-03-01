import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const CategoryView = () => {
  const { category_id } = useParams();
  const [category, setCategory] = useState({});
  const navigate = useNavigate(); // Define the navigate function

  useEffect(() => {
    // Fetch the category details by category_id
    axios
      .get(`http://127.0.0.1:8000/api/category/${category_id}/view/`)
      .then((response) => setCategory(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [category_id]);

  const handleDeleteCategory = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/category/${category_id}/delete/`)
      .then(() => {
        // Perform any actions you need after successful deletion, e.g., redirect to a different page.
        console.log("Category deleted successfully");

        // Redirect to the desired page after successful deletion.
        navigate("/category/list/");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div>
      <h1>Category Details</h1>
      <p>Category Name: {category.name}</p>

      {category.image ? (
        <div>
          <img src={`http://127.0.0.1:8000${category.image}`} alt={category.name} style={{ width: "10%" }} />
        </div>
      ) : (
        <div>
          No image available
        </div>
      )}

      <button onClick={handleDeleteCategory}>Delete Category</button>
    </div>
  );
};

export default CategoryView;
