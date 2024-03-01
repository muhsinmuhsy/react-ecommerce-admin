// Importing necessary components and modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  CardBody,
  FormGroup,
  Form
} from "reactstrap";

import Header from "components/Headers/Header.js";

// Functional component for managing categories
const CategoryList = () => {
  // State for storing the list of categories
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API on component mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/category/list")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Delete category function

  // const deleteCategory = (categoryId) => {
  //   axios.delete(`http://127.0.0.1:8000/api/category/${categoryId}/delete`)
  //     .then(() => {
  //       console.log('Category deleted successfully');
  //       setCategories(categories.filter(category => category.id !== categoryId));
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting category:', error);
  //     });
  // };

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

  // State and functions for adding a new category
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

  const handleAddImageChange = (event) => {
    const imageFile = event.target.files[0];
    setNewCategoryData({ ...newCategoryData, image: imageFile });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", newCategoryData.name);
  
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
      setAddModalOpen(false); // Close the modal if needed
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  

  // State and functions for editing a category
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const [editCategoryData, setEditCategoryData] = useState({
    id: null,
    name: "",
    image: null,
  });

  const [selectedEditImage, setSelectedEditImage] = useState(null);

  const handleEditSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const formData = new FormData();
    formData.append("name", editCategoryData.name);
  
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
  

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Category List</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={toggleAddModal}
                      size="sm"
                    >
                      Add Category
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              {/* Add Category Modal */}
              <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={isAddModalOpen}
                toggle={toggleAddModal}
              >
                <div className="modal-body p-0">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                      <div className="text-muted text-center mt-2 mb-3">
                        <small>Add Category</small>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form" onSubmit={handleAddSubmit}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Category Name"
                              type="text"
                              name="name"
                              onChange={handleAddInputChange}
                            />
                          </InputGroup>
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              className="form-control"
                              type="file"
                              name="image"
                              onChange={handleAddImageChange}
                            />
                          </InputGroup>
                        </FormGroup>

                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </Modal>

              {/* Category List Table */}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          {category.image ? (
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                            >
                              <img
                                alt="..."
                                src={`http://127.0.0.1:8000${category.image}`}
                              />
                            </a>
                          ) : (
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                            >
                              <img
                                alt="..."
                                key="defaultImage"
                                src={require("../../assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                          )}
                          <Media>
                            <span className="mb-0 text-sm">
                              {category.name}
                            </span>
                          </Media>
                        </Media>
                      </th>

                      <td className="d-flex justify-content-center">
                        <div className="d-flex align-items-center">
                          <span className="mr-2">
                            <li className="ni ni-atom"></li>
                          </span>
                          <span className="mr-2">

                            {/* <li className="ni ni-basket" onClick={() => deleteCategory(category.id)}> */}
                            
                            <li className="ni ni-basket" onClick={() => {
                              setDeleteCategoryData({
                                id: category.id,
                                name: category.name
                              });
                              toggleDeleteModal();
                            }}>
                            </li>
                            
                          </span>
                          {/* Delete Category Modal */}
                          <Modal
                            className="modal-dialog-centered"
                            isOpen={isDeleteModalOpen}
                              toggle={toggleDeleteModal}
                          >
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">
                                Delete
                              </h5>
                              <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => setDeleteModalOpen(false)}
                              >
                                <span aria-hidden={true}>×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                            Are you sure you want to delete 
                            {deleteCategoryData.name }?
                          </div>

                            <div className="modal-footer">
                              <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => setDeleteModalOpen(false)}
                              >
                                Close
                              </Button>
                              <Button color="primary" type="button" onClick={handleDeleteSubmit}>

                                Delete
                              </Button>
                            </div>
                          </Modal>

                          
                          {/* Edit Category Button */}
                          <Col md="4">
                            {/* <Button
                              block
                              color="default"
                              type="button"
                              onClick={() => {
                                setEditCategoryData({
                                  id: category.id,
                                  name: category.name,
                                  image: category.image
                                });
                                toggleEditModal();
                              }}
                            >
                              Edit
                            </Button> */}

                              <span className="mr-2">

                              {/* <li className="ni ni-basket" onClick={() => deleteCategory(category.id)}> */}

                              <li className="ni ni-palette" onClick={() => {
                                setEditCategoryData({
                                  id: category.id,
                                  name: category.name,
                                  image: category.image
                                });
                                toggleEditModal();
                              }}>
                              </li>

                              </span>

                            {/* Edit Category Modal */}
                            <Modal
                              className="modal-dialog-centered"
                              size="sm"
                              isOpen={isEditModalOpen}
                              toggle={toggleEditModal}
                            >
                              <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                  <CardHeader className="bg-transparent pb-5">
                                    <div className="text-muted text-center mt-2 mb-3">
                                      <small>Edit Category</small>
                                    </div>
                                  </CardHeader>
                                  <CardBody className="px-lg-5 py-lg-5">
                                    <Form role="form" onSubmit={handleEditSubmit}>
                                      <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                          <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                              <i className="ni ni-email-83" />
                                            </InputGroupText>
                                          </InputGroupAddon>
                                          <Input
                                            placeholder=""
                                            type="text"
                                            value={editCategoryData.name}
                                            onChange={(e) =>
                                              setEditCategoryData({ ...editCategoryData, name: e.target.value })
                                            }
                                          />
                                        </InputGroup>
                                      </FormGroup>

                                      <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                          <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                              <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                          </InputGroupAddon>
                                          <Input
                                            className="form-control"
                                            type="file"
                                            onChange={(e) => setSelectedEditImage(e.target.files[0])}
                                          />
                                        </InputGroup>
                                      </FormGroup>

                                      <div className="text-center">
                                      <Button
                                        className="my-4"
                                        color="primary"
                                        type="submit"  // Change the type to "submit"
                                      >
                                        Submit
                                      </Button>

                                      </div>
                                    </Form>
                                  </CardBody>
                                </Card>
                              </div>
                            </Modal>
                          </Col>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CategoryList;
