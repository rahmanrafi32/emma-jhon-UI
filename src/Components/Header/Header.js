import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className ='header-container'>
           <div className ='header-img'>
               <img src={logo} alt=""/>
           </div>
           <nav>
               <Link to="/shop">Shop</Link>
               <Link to="/order">Order Item</Link>
               <Link to="/inventory">Manage Inventory</Link>
           </nav>
        </div>
    );
};

export default Header;