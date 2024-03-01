import './Table.scss';
import './Modal.scss';
import logo from '../logo.svg';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CategoryProduct() {
    const { category_id } = useParams();
    const [categoryProduct, setCategoryProduct] = useState({ category: {}, products: [], variants:[] });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/category/${category_id}/products/`)
            .then((response) => setCategoryProduct(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [category_id]);

    // Initialize count variable here
    let count = 0;

    //////////////////////////////// CategoryProduct View ///////////////////////////////
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const toggleViewModal = (productId) => {
        setSelectedProductId(productId);
        setViewModalOpen(!isViewModalOpen);
    };

    //////////////////////////////// CategoryProduct Add ///////////////////////////////
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const toggleAddModal = () => {
        setAddModalOpen(!isAddModalOpen);
    };
    

    const [addCategoryProductData, setAddCategoryProductData] = useState({
        category: category_id,
        name: "",
        image: null,
        description: "",
        product_details: "",
        hide: false    
    });
    
    const handleAddProductInputChange = (event) => {
        const { name, value } = event.target;
        setAddCategoryProductData({ ...addCategoryProductData, [name]: value });
    };
    
    const handleAddProductImageChange = (event) => {
        const imageFile = event.target.files[0];
        setAddCategoryProductData({ ...addCategoryProductData, image: imageFile });
    };

    // name requred
    const [AddnameError, setAddNameError] = useState("");
    
    // Passing product_id to tab2
    const [newProductId, setNewProductId] = useState(null);

    const handleAddProductSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        // Append other fields
        Object.entries(addCategoryProductData).forEach(([key, value]) => {
            if (key === 'image' && value) {
                // Append the image only if it is present
                formData.append(key, value);
            } else if (key !== 'image') {
                formData.append(key, value);
            }
        });


        // Validate the name field
        if (!addCategoryProductData.name.trim()) {
            setAddNameError("Product Name is required");
            return;
        }
        // Clear any previous error
        setAddNameError("");
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/products/add/',
                formData
            );
    
            // Update state with the new data
            setCategoryProduct((prevCategoryProduct) => ({
                ...prevCategoryProduct,
                products: [...prevCategoryProduct.products, response.data],
            }));

           

            // Update the product ID directly in the addProductVariantData state
            setAddProductVariantData((prevData) => ({
                ...prevData,
                product: response.data.id,
            }));
    
            // Switch to Tab 2 after successfully adding a new product
            handleTabClick(2, response.data.id);

            // Set the newly added product ID
            setNewProductId(response.data.id);
    
            console.log("CategoryProduct Added successfully");
            console.log('Server response:', response);
            console.log('id:', response.data.id);
        } catch (error) {
            console.error("Error adding CategoryProduct:", error);
        }
    };

    
    
    
    
    
    
   //////////////////////////////// Tab ///////////////////////////////
    const [activeTab, setActiveTab] = useState(1);
    
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    //////////////////////////////// ProductVariant Add ///////////////////////////////


    const [addProductVariantData, setAddProductVariantData] = useState({
        product: "",
        name: "",
        actual_price: "",
        discount_price: "",
        offer_percentage: "",
        availability: true,
        hide: false    
    });
    
    

    const handleAddVariantInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // If it's a checkbox, use 'checked' instead of 'value'
        const inputValue = type === 'checkbox' ? checked : value;

        setAddProductVariantData({ ...addProductVariantData, [name]: inputValue });
    };

    const handleAddVariantSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        // Append other fields
        Object.entries(addProductVariantData).forEach(([key, value]) => {  
            formData.append(key, value); 
        });
    
        // Log the FormData to confirm the 'product' field is set
        console.log('FormData:', formData);
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/productvariants/add/',
                formData
            );
        
            console.log("ProductVariant Added successfully");
            console.log('Server response:', response);
        } catch (error) {
            console.error("Error adding ProductVariant:", error);
            console.log('newProductId:', newProductId);
    
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received');
            } else {
                console.error('Error message:', error.message);
            }
        }
    };
    

    
    


    
    
    

    return (
        <div className="CategoryProduct">


            {/* <h1>{categoryProduct.category.name}</h1>
            <ul>
                {categoryProduct.products.map(product => (
                <li key={product.id}>
                    {product.name}
                    <ul>
                    {categoryProduct.variants
                        .filter(variant => variant.product === product.id)
                        .map(variant => (
                        <li key={variant.id}>
                            {variant.name} - Actual Price: {variant.actual_price}
                        </li>
                        ))}
                    </ul>
                </li>
                ))}
            </ul> */}


            <div className="d-flex justify-content-between align-items-center">
                <span>
                    <h5>{categoryProduct.category.name}</h5>
                </span>
                <span className="add-button mt-2 mb-2">
                    <Button variant="dark"
                    onClick={() => toggleAddModal()}
                    >Product Add</Button>
                </span>
            </div>


            


            <div className="table text-center">
                <Table responsive="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                   
                    <th>Actions</th>
                    
                    </tr>
                </thead>
                <tbody>

                    {categoryProduct.products.map(product => (
                    <tr key={product.id}>
                    <td>{++count}</td>
                    <td>
                        {product.image ?(
                        
                        <img src={`http://127.0.0.1:8000${product.image}`} alt={`${product.name} product`} className="table-image" />

                        
                        ):(
                        <img src={logo} alt="none-img" className="table-image" />

                        )}
                    </td>
                    <td>{product.name}</td>

                    
                    <td>
                    <span onClick={() => toggleViewModal(product.id)}>View</span>
                        <span className='table-action-pl'>Edit</span>
                        <span className='table-action-pl'>Delete</span>
                    </td>
                    
                    </tr>
                    ))}
                    
                </tbody>
                </Table>
            </div>

            {/*///////////////// ////////////// Modals ///////////////////////////////////////////*/} 


            {/* CategoryProduct view */}
            <div className="modal">
                <Modal show={isViewModalOpen} onHide={toggleViewModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Product ${selectedProductId} Variants`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {categoryProduct.variants
                                .filter(variant => variant.product === selectedProductId)
                                .map(variant => (
                                    <li key={variant.id}>
                                        {variant.name} - Actual Price: {variant.actual_price}, Discount Price: {variant.discount_price}
                                        
                                    </li>
                                ))}
                        </ul>
                    </Modal.Body>
                </Modal>
            </div>           


            {/* CategoryProduct add */}
            <div className="modal">
            <Modal show={isAddModalOpen}  fullscreen={true} onHide={toggleAddModal} >
                <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                {activeTab === 1 && (
                   <form className='m-5' onSubmit={handleAddProductSubmit}>

                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" 
                        className={`form-control ${AddnameError ? "is-invalid" : ""}`} 
                        onChange={handleAddProductInputChange} />
                        { AddnameError && <div className="invalid-feedback">{AddnameError}</div> }
                        <br />

                        <label htmlFor="image">Image:</label>
                        <input type="file" id="image" name="image" accept="image/*"className='form-control' onChange={handleAddProductImageChange} />
                        <br />

                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" className='form-control' onChange={handleAddProductInputChange}></textarea>
                        <br />

                        <label htmlFor="product_details">Product Details:</label>
                        <textarea id="product_details" name="product_details"className='form-control' onChange={handleAddProductInputChange}></textarea>
                        <br />

                        <label htmlFor="hide">Hide:</label>
                        <input type="checkbox" id="hide" name="hide"  onChange={handleAddProductInputChange} />
                        <br />
                        <div className='d-flex justify-content-end'>
                        <Button variant="dark" type='submit' className=''>
                            Next
                        </Button>
                        </div>
                        
                    </form>
                )}

                {activeTab === 2 && (
                    <div>
                        <h2>Content for Tab 2</h2>
                        {/* <h2>{` Name: ${addCategoryProductData.name}`}</h2> */}

                        <h2>{`Product ID: ${newProductId}`}</h2>
                        <form className='m-5' onSubmit={handleAddVariantSubmit}>

                            <label htmlFor="product">Product:</label>
                            <input
                                type="text"
                                id="product"
                                name="product"
                                className='form-control'
                                value={newProductId || ""}
                                readOnly
                            />

                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" 
                                className='form-control'
                                onChange={handleAddVariantInputChange} />
                            <br />

                            <label htmlFor="actual_price">Actual Price:</label>
                            <input type="text" id="actual_price" name="actual_price" 
                                className='form-control'
                                onChange={handleAddVariantInputChange} />
                            <br />

                            <label htmlFor="discount_price">Discount Price:</label>
                            <input type="text" id="discount_price" name="discount_price" 
                                className='form-control'
                                onChange={handleAddVariantInputChange} />
                            <br />

                            <label htmlFor="availability">Availability:</label>
                            <input type="checkbox" id="availability" name="availability" checked={addProductVariantData.availability} onChange={handleAddVariantInputChange} />
                            <br />

                            <label htmlFor="hide">Hide:</label>
                            <input type="checkbox" id="hide" name="hide" checked={addProductVariantData.hide} onChange={handleAddVariantInputChange} />
                            <br />

                            
                            <div className='d-flex justify-content-end'>
                                <Button variant="dark" type='submit' className=''>
                                    Save
                                </Button>
                            </div>
                        </form>
                        
                    </div>
                )}
                
                </Modal.Body>
            </Modal>
            </div>




        </div>
    );
}

export default CategoryProduct;
