import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Review from '../Review/Review';
import './ReviewItems.css';

const ReviewItems = () => {
    const [cart,setCart] = useState([])//to set products in the cart

    const history = useHistory()
    const proceedOrder = () =>{
        history.push(`/shipment`)
    }
    const removeProduct = (productKey => { //click function to remove product from review
        const newCart = cart.filter(prod=>prod.key != productKey)//creating new cart for the items that remain after removing an item
        setCart(newCart);//setting the cart value newCart toh get the remaining items
        removeFromDatabaseCart(productKey);//removing data from local storage
    })
    
    useEffect(()=>{
        const saveCart = getDatabaseCart(); //getting data from local storage 
        const productKeys = Object.keys(saveCart);//getting the product keys 
        
        fetch('https://hidden-fortress-20462.herokuapp.com/productsByKyes',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(productKeys)
        })
        .then(res=> res.json())
        .then(data=>setCart(data));
    },[])
    return (
        <div className='main-reviewContainer'>
            <div className='review-items'>   
                {
                    cart.map(product=> <Review product={product} removeProduct={removeProduct} key={product.key} />)
                }
            </div>
            <div className='cart'>
                <Cart cart={cart}><button onClick={proceedOrder} className='main-button'>Proceed Order</button></Cart>
            </div>
        </div>
    );
};

export default ReviewItems;