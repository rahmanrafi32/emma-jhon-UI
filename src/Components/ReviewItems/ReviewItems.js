import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Review from '../Review/Review';
import './ReviewItems.css';

const ReviewItems = () => {
    const [cart,setCart] = useState([])//to set products in the cart

    const placeOrder = () =>{//removing review items from cart and review component
        setCart([]);
        processOrder();
    }
    const removeProduct = (productKey => { //click function to remove product from review
        const newCart = cart.filter(prod=>prod.key != productKey)//creating new cart for the items that remain after removing an item
        setCart(newCart);//setting the cart value newCart toh get the remaining items
        removeFromDatabaseCart(productKey);//removing data from local storage
    })
    
    useEffect(()=>{
        const saveCart = getDatabaseCart(); //getting data from local storage 
        const productKeys = Object.keys(saveCart);//getting the product keys 

        const cartProducts = productKeys.map(key=>{ //maping the product key from saveCarts and matching the keys with product keys of fakeData.
            const  product = fakeData.find(prod => prod.key===key);
            product.quantity = saveCart[key]; //setting the quantity of selected product
            return product;
        }) 
        setCart(cartProducts);
    },[])
    return (
        <div className='main-reviewContainer'>
            <div className='review-items'>   
                {
                    cart.map(product=> <Review product={product} removeProduct={removeProduct} key={product.key} />)
                }
            </div>
            <div className='cart'>
                <Cart cart={cart}><button onClick={placeOrder} className='main-button'>Place Order</button></Cart>
            </div>
        </div>
    );
};

export default ReviewItems;