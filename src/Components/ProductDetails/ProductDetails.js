import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const ProductDetails = () => {
    
    const {prodkey}=useParams();//showing product key in the addressbar 

    const product = fakeData.find(product => prodkey===product.key);
    
    return (
        <div>
            <Products key={product.key} showAddToCart ={false} product={product}/>
        </div>
    );
};

export default ProductDetails;