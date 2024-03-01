import React from 'react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavLink } from 'react-router-dom';
import './Menu.scss';

function Menu() {
  return (
    <div className="Menu">

      

      <div className="menu-content">
        <ul className='menu-ul'>
          <li>
            <NavLink to="/"  activeclassname="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/category/" activeclassname="active">
              Category
            </NavLink>
          </li>
        </ul>
      </div>
      
      
    </div>


  );
}

export default Menu;
