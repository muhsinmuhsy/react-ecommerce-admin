import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    // Fetch the category list from your API using Axios
    axios.get("http://127.0.0.1:8000/api/category/list")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/category/${categoryId}/delete`)
      .then(() => {
        // Perform any actions you need after successful deletion.
        console.log("Category deleted successfully");

        // Optionally, you can also update the state to reflect the new list of categories.
        setCategories(categories.filter(category => category.id !== categoryId));


      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div>
      <Link to="/category/add/">Category add</Link>
      <h1>Category List</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {console.log(category.image, category.name)}

            {category.image ? (
              <div>
                <Link to={`/category/${category.id}/view`}>
                  <img src={`http://127.0.0.1:8000${category.image}`} alt={category.name} style={{ width: "10%" }} />
                  {category.name}
                </Link>
              </div>
            ) : (
              <Link to={`/category/${category.id}/view`}>{category.name}</Link>
            )}

            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            <Link to={`/category/${category.id}/edit`}>Edit</Link>


          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
