import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Products = (props) => {
    const {name,key,seller,price,img,stock}=props.product;
    return (
        <div className='product'>
            <div className ='product-img'>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
                <h2><Link to={"/product/"+key}>{name}</Link></h2>
                <p>by: {seller}</p>
                <h3>Price:${price}</h3>
                <p>only {stock} remaining in the stock</p>
                {
                    props.showAddToCart && <button onClick ={()=>props.handle(props.product)}><FontAwesomeIcon icon ={faShoppingCart} /> Add to cart</button>
                }
            </div>
        </div>
    );
};

export default Products;