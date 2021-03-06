import React from 'react';
import './Review.css';

const Review = (props) => {
    const{name, quantity,key,price}=props.product
    const remove = props.removeProduct;
    return (
        <div className='review-container'>
            <div className='review-details'>
                <h2 className='product-details'>{name}</h2>
                <p>Quantity: {quantity}</p>
                <h4>Price: ${price}</h4>
                <br/>
                <button onClick ={()=>remove(key)} className='product-details'>Remove</button>
            </div>  
        </div>
    );
};

export default Review;