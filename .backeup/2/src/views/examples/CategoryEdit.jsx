/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Button
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

  
  const CategoryEdit = () => {

    const { category_id } = useParams(); // Get the category_id from the URL
    useEffect(() => {
        // Fetch the category data for editing
        axios.get(`http://127.0.0.1:8000/api/category/${category_id}/edit/`)
          .then((response) => {
            setCategoryData({
              name: response.data.name,
              image: null, // Initialize the image field with null (you can set it to the image URL if you want to display the existing image)
              // Set other fields as needed for editing
            });
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, [category_id]);

    const [categoryData, setCategoryData] = useState({
        name: "",
        image: null,
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

    const handleSubmit = async (event) => {
      event.preventDefault();


      // Formadata appending categoryDataname and Category.image
      const formData = new FormData();
      formData.append("name", categoryData.name);
      // Check if an image has been selected before appending it
      if (categoryData.image) {
        formData.append("image", categoryData.image);
      }
  
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/category/${category_id}/edit/`, formData);
        console.log('Category Updated:', response.data);
        alert('created')
        
        navigate("/admin/category/list/");
  
      } catch (error) {
        console.error('Error creating product:', error);
      }
    };
    
      
    return (
      <>
        <Header />
        
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Category Add</h3>
                    </Col>
                    
                   
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}> 
                    <h6 className="heading-small text-muted mb-4">
                       information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category name"
                            >
                              Category NAme
                            </label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue="lucky.jesse"
                              
                              placeholder="Category-name"
                              type="text"
                              name="name"
                              value={categoryData.name}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-image"
                            >
                              Image
                            </label>
                            <Input
                              className="form-control"
                              type="file"
                              name="image"
                              onChange={handleImageChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </div>
                    <hr className="my-4" />
                  
                  
                  <div className="pl-lg-4">
                    <Button
                            color="primary"
                            
                            size="sm"
                            type="submit"
                            >
                            Submit
                    </Button>
                  </div>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default CategoryEdit;
  