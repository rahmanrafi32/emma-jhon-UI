import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shops.css';

const Shops = () => {
//    const data = fakeData.slice(0,10);
   const [products, setProduct] = useState([]);

   useEffect(()=>{
        fetch('https://hidden-fortress-20462.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=> setProduct(data))
   },[])
   
   const [cart,setCart]=useState([])
   
   const handleCart = (product) =>{
        const toBeAdded = product.key       
        const sameProduct = cart.find(prod=> toBeAdded === prod.key )//finding the same product keys from cart
        let count =1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity += 1;
            const others = cart.filter(prod=>prod.key!== toBeAdded)
            newCart = [...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart =[...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count) //adding productKey to local storage
   }
   
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
        <div className ='shop-container'>
            <div className ='product-container'>
                {
                    products.map(product=><Products 
                        key={product.key}
                        showAddToCart={true}
                        product ={product} 
                        handle = {handleCart}
                        />)
                }   
            </div>
            <div className ='cart-container'>
               <Cart cart ={cart}>
                    <Link to='/review' className='main-button'><button>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shops;