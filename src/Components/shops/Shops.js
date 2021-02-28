import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shops.css';

const Shops = () => {
   const data = fakeData.slice(0,10);
   const [products, setProduct] = useState(data);
   
   const [cart,setCart]=useState([])
   const handleCart = (product) =>{
        const newCart = [...cart,product];
        setCart(newCart);
   }
  
   
    return (
        <div className ='shop-container'>
            <div className ='product-container'>
                {
                    products.map(product=><Products 
                        product ={product} 
                        handle = {handleCart}
                        />)
                }   
            </div>
            <div className ='cart-container'>
               <Cart cart ={cart} />
            </div>
        </div>
    );
};

export default Shops;