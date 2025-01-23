import React, { useState } from 'react';
import ProductList from './Ecommerce/ProductList';
import '../styles/app.css';
import "../styles/Ecommerce.css";

const Ecommerce = ({ addToCart, addToWishlist }) => {
    return (
      <div className="ecommerce">
        <h1>FarmEdge Store</h1>
        <ProductList addToCart={addToCart} addToWishlist={addToWishlist} />
        <div className="button-container">
      </div>
    </div>
    );
  };

export default Ecommerce;