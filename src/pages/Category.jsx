import './Table.scss';
import './Modal.scss';
import logo from '../logo.svg';

import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




function Category() {


  //////////////////////////////// Category List ///////////////////////////////

  // State for storing the list of categories
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API on component mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/category/list")
    .then ((response)  => setCategories(response.data))
    .catch((error) => console.error("Error fetching dat", error));
  }, []);

  // Initialize count variable here
  let count = 0;

  //////////////////////////////// Category Add ///////////////////////////////
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    image: null,
  });
 

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategoryData({ ...newCategoryData, [name]: value });
  };

  // name requred
  const [AddnameError, setAddNameError] = useState("");

  const handleAddImageChange = (event) => {
    const imageFile = event.target.files[0];
    setNewCategoryData({ ...newCategoryData, image: imageFile });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", newCategoryData.name);

    
    // Validate the name field
    if (!newCategoryData.name.trim()) {
      setAddNameError("Category Name is required");
      return;
    }
    // Clear any previous error
    setAddNameError("");
  
    if (newCategoryData.image) {
      formData.append("image", newCategoryData.image);
    }
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/category/add',
        formData,
      );
  
      // Update state with the new category data
      setCategories([...categories, response.data]);
  
      console.log("Category Added successfully");
      console.log('Server response:', response);
      setAddModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };


  //////////////////////////////// Category Edit ///////////////////////////////
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const [editCategoryData, setEditCategoryData] = useState({
    id: null,
    name: "",
    image: null,
  });

  // name required for edit
  const [editNameError, setEditNameError] = useState("");

  const [selectedEditImage, setSelectedEditImage] = useState(null);

  const handleEditSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const formData = new FormData();
    formData.append("name", editCategoryData.name);

    // Validate the name field
    if (!editCategoryData.name.trim()) {
      setEditNameError("Category Name is required");
      return;
    }
    // Clear any previous error
    setEditNameError("");
  
    if (selectedEditImage) {
      formData.append("image", selectedEditImage);
    }
  
    axios
      .patch(
        `http://127.0.0.1:8000/api/category/${editCategoryData.id}/edit/`,
        formData,
      )
      .then((response) => {
        // Update the state with the edited category data
        setCategories(categories.map(category => (
          category.id === editCategoryData.id ? response.data : category
        )));
  
        console.log("Category edited successfully");
        console.log('Server response:', response);
        setEditModalOpen(false); // Close the modal if needed
      })
      .catch((error) => {
        console.error("Error editing category:", error);
      });
  };


  //////////////////////////////// Category Delete ///////////////////////////////
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const [deleteCategoryData, setDeleteCategoryData] = useState({
    id: null,
    name:""
  });
  const handleDeleteSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    axios.delete(`http://127.0.0.1:8000/api/category/${deleteCategoryData.id}/delete`)
      .then(() => {
        console.log('Category deleted successfully');
        setCategories(categories.filter(category => category.id !== deleteCategoryData.id));

        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };


  return (
    <div className="Category">
      

      <div className='category-add'> 
        <div className="add-button d-flex justify-content-end mt-2 mb-2">
          <Button variant="dark" onClick={toggleAddModal}>
            Category Add
          </Button>
        </div>        
      </div>
      
      <div className="table text-center">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Image</th>
              <th>Category Name</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>

            {categories.map((category) => (
              <tr key={category.id}>
              <td>{++count}</td>
              <td>
                {category.image ?(
                  
                  <img src={`http://127.0.0.1:8000${category.image}`} alt={`${category.name} category`} className="table-image" />

                  
                ):(
                  <img src={logo} alt="none-img" className="table-image" />

                )}
              </td>
              <td>{category.name}</td>
              <td>
                <span>
                  <Link to={`/category/${category.id}/products/`}>View</Link>
                </span>
                <span className='table-action-pl'
                onClick={() => {
                  setEditCategoryData({
                    id: category.id,
                    name: category.name,
                    image: category.image
                  });
                  toggleEditModal();
                }}
                >Edit</span>
                <span className='table-action-pl'
                onClick={() => {
                  setDeleteCategoryData({
                    id: category.id,
                    name: category.name
                  });
                  toggleDeleteModal();
                }}
                >Delete</span>
              </td>
            </tr>
            ))}
            
          </tbody>
        </Table>
      </div>


      {/*///////////////// ////////////// Modals ///////////////////////////////////////////*/}

      {/* Category add */}
      <div className="category-add-modal">
        <Modal show={isAddModalOpen} onHide={toggleAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Category Add</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleAddSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className={`form-control ${AddnameError ? "is-invalid" : ""}`}
                onChange={handleAddInputChange}
              />
              { AddnameError && <div className="invalid-feedback">{AddnameError}</div> }
              <br />
              <input
                type="file"
                name="image"
                className='form-control'
                onChange={handleAddImageChange}
              />

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setAddModalOpen(false)}>
                  Close
                </Button>
                <Button variant="dark" type='submit'>
                  Save Changes
                </Button>
              </Modal.Footer>
              
            </form>
          </Modal.Body>
        
        </Modal>
      </div>
      

      {/* Category edit */}

      <div className="category-edit-modal">
        <Modal show={isEditModalOpen} onHide={toggleEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Category Edit</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmit}>
              <input
                className={`form-control ${editNameError ? "is-invalid" : ""}`}
                placeholder="Type Category name"
                type="text"
                value={editCategoryData.name}
                onChange={(e) =>
                  setEditCategoryData({ ...editCategoryData, name: e.target.value })
                }
              />
              {editNameError && (
                <div className="invalid-feedback">{editNameError}</div>
              )}
              <br />
              <input
                className="form-control"
                type="file"
                onChange={(e) => setSelectedEditImage(e.target.files[0])}
              />

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
                  Close
                </Button>
                <Button variant="dark" type='submit'>
                  Save Changes
                </Button>
              </Modal.Footer>
              
            </form>
          </Modal.Body>
        
        </Modal>
      </div>


      {/* Category delete */}

      <div className="category-delete-modal">
        <Modal show={isDeleteModalOpen} onHide={toggleDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Category Delete</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <p>Are you sure! Do you want delete <span className='delete-name'>{deleteCategoryData.name }?</span></p>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" type='button' onClick={handleDeleteSubmit}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </div>
  );


}

export default Category;
