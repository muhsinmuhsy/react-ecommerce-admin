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
  import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  
  const CategoryAdd = () => {

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
        const response = await axios.post('http://127.0.0.1:8000/api/category/add', formData);
        console.log('Category created:', response.data);
        alert('created')
        
        navigate("/admin/category/add/");
  
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
  
  export default CategoryAdd;
  