import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className ='header-container'>
           <div className ='header-img'>
               <img src={logo} alt=""/>
           </div>
           <nav>
               <a href="/shop">Shop</a>
               <a href="/Oder">Order Item</a>
               <a href="/Inventory">Manage Inventory</a>
           </nav>
        </div>
    );
};

export default Header;