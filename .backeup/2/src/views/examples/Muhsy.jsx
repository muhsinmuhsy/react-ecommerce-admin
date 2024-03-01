
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

import React, { useEffect, useState } from "react";
import axios from "axios";
  
  
const CategoryList  = () => {


  /////////////////// for get and delete category //////////////////////////
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      // Fetch the category list from your API using Axios
      axios.get("http://127.0.0.1:8000/api/category/list")
        .then((response) => setCategories(response.data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const DeleteCategory = (categoryId) => {
    axios.delete(`http://127.0.0.1:8000/api/category/${categoryId}/delete`)
      .then(() => {
        console.log('category deleted successfully');

        // Update local state to remove the deleted category
        setCategories(categories.filter(category => category.id !== categoryId));
      })

      
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };



  /////////////////// for add category //////////////////////////
  const [defaultModalAdd, setDefaultModalAdd] = useState(false);
  const toggleModalAdd = () => {
    setDefaultModalAdd(!defaultModalAdd);
  };
  

  const [categoryDataAdd, setCategoryDataAdd] = useState({
    id : null,
    name: "",
    image: null,
  });

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCategoryDataAdd({ ...categoryDataAdd, [name]: value });
  };
  
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setCategoryDataAdd({ ...categoryDataAdd, image: imageFile });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();


    // Formadata appending categoryDataname and Category.image
    const formData = new FormData();
    formData.append("name", categoryDataAdd.name);
    // Check if an image has been selected before appending it
    if (categoryDataAdd.image) {
      formData.append("image", categoryDataAdd.image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/category/add', formData);
      console.log('Category created:', response.data);
      window.location.reload();
      
      

    } catch (error) {
      console.error('Error creating product:', error);
    }
  };



  /////////////////// for edit category //////////////////////////
  const [defaultModalEdit, setDefaultModalEdit] = useState(false);

  const toggleModalEdit = () => {
    setDefaultModalEdit(!defaultModalEdit);
  };

  const [editCategory, setEditCategory] = useState({
    id: null,
    name: "",
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);  

  const handleEditSubmit = () => {
    const formData = new FormData();
    formData.append("name", editCategory.name);
  
    // Check if a new image is selected
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
  
    axios
      .patch(
        `http://127.0.0.1:8000/api/category/${editCategory.id}/edit/`,formData,    
      )
      .then((response) => {
        console.log("Category edited successfully");
        console.log('Server response:', response);

        // Reload the page
        window.location.reload();

        // Update local state to reflect the changes
        setCategories((prevCategories) =>
          prevCategories.map((prevCategory) =>
            prevCategory.id === editCategory.id ? editCategory : prevCategory
          )
        );
        toggleModalEdit();
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
                    <h3 className="mb-0">Category list</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    
                    <Button
                        color="primary"
                        onClick={() => { toggleModalAdd(); }}
                        size="sm"
                      >
                        Add category
                    </Button>
                    
                      
                  </Col>
                </Row>
              </CardHeader>


              <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={defaultModalAdd}
                toggle={toggleModalAdd}
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
                              placeholder="Category-name"
                              type="text"
                              name="name"
                              onChange={handleInputChange}      
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
                              onChange={handleImageChange}
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

                      <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">
                                <li className="ni ni-atom"></li>
                            </span>

                            <span className="mr-2">
                              <li className="ni ni-basket" onClick={() => DeleteCategory(category.id)}>
                               
                              </li>
                            </span>
                            

                            <Col md="4">
                            <Button
                              block
                              color="default"
                              type="button"
                              onClick={() => {
                                setEditCategory({
                                  id: category.id,
                                  name: category.name,
                                  image: category.image
                                });
                                toggleModalEdit();
                              }}
                            >
                              Edit
                            </Button>

                              <Modal
                                className="modal-dialog-centered"
                                size="sm"
                                isOpen={defaultModalEdit}
                                toggle={toggleModalEdit}
                              >
                                <div className="modal-body p-0">
                                  <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent pb-5">
                                      <div className="text-muted text-center mt-2 mb-3">
                                        <small>Edit Category</small>
                                      </div>
                                      
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                      
                                      <Form role="form">

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
                                              value={editCategory.name}
                                              onChange={(e) =>
                                                setEditCategory({ ...editCategory, name: e.target.value })
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
                                              onChange={(e) => setSelectedImage(e.target.files[0])}
                                            />
                                          </InputGroup>
                                        </FormGroup>

                                        
                                        <div className="text-center">
                                        <Button
                                          className="my-4"
                                          color="primary"
                                          type="button"
                                          onClick={handleEditSubmit}
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
  