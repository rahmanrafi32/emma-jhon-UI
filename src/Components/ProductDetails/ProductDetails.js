import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Products/Products';

const ProductDetails = () => {
    
    const {prodkey}=useParams();//showing product key in the addressbar 
    const [product,setProduct]= useState({})
    useEffect(()=>{
        fetch('https://hidden-fortress-20462.herokuapp.com/products/'+prodkey)
        .then(res=>res.json())
        .then(data=>setProduct(data));
    },[prodkey])
    return (
        <div>
            <Products key={product.key} showAddToCart ={false} product={product}/>
        </div>
    );
};

export default ProductDetails;