import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/product/list')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching data', error));
    }, []);

    return (
        <div>
            <h1>Product list</h1>
            <Link to="/product/add/">Product add</Link>
            
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.category.name}
                        {product.name}
                        <Link to={`/product/${product.id}/edit`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
