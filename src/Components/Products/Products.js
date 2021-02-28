import React from 'react';
import './Product.css';

const Products = (props) => {
    const {name,key,seller,price,img,stock}=props.product;
    return (
        <div className='product'>
            <div className ='product-img'>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
                <h2>{name}</h2>
                <p>by: {seller}</p>
                <h3>Price:${price}</h3>
                <p>only {stock} remaining in the stock</p>
                <button onClick ={()=>props.handle(props.product)} >Add to cart</button>
            </div>
        </div>
    );
};

export default Products;