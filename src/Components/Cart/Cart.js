import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart
    const totalPrice = cart.reduce((total,prod) =>total+prod.price ,0)
    const tax = totalPrice*.1;
    return (
        <div>
            <h1>Order summary</h1>
            <h3>Total items: {cart.length}</h3>
             {
                cart.map(price => <h3>Item price:{price.price}</h3>)
             }
            <p>Tax: {tax}</p>
            <h4>Total Cost: {totalPrice}</h4>
        </div>
    );
};

export default Cart;