import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart
    const totalPrice = cart.reduce((total,prod) =>(total+prod.price)*prod.quantity ,0);
    const tax = totalPrice*.1;
    return (
        <div className ='cart-items'>
            <h1>Order summary</h1>
            <h4>Total items: {cart.length}</h4>
            <ol>
                {
                    cart.map(price => <li>Item price:{price.price}</li>)
                }
            </ol>
            <p>Tax: {tax}</p>
            <h4>Total Cost: {totalPrice}</h4>
            <br/>
            {props.children/*setting button with child component*/}  
        </div>
    );
};

export default Cart;