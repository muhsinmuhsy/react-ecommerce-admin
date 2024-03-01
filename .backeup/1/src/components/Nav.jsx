import React from "react";


import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <div>

            <Link to="/">Home</Link>
            <Link to="/category/list/">Category List</Link>

            <Link to="/product/list/">Product List</Link>
            
        </div>
    )
}

export default Nav