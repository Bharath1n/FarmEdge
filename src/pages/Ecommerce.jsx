import React, { useState } from 'react';
import ProductList from './Ecommerce/ProductList';
import { Link } from 'react-router-dom';
import "../styles/Ecommerce.css";

const Ecommerce = ({ addToCart, addToWishlist }) => {
    return (
      <div className="ecommerce">
        <Link to="/cart-wishlist">
          <button className="view-cart-wishlist">View Cart & Wishlist</button>
        </Link>
        <h1>FarmEdge Store</h1>
        <ProductList addToCart={addToCart} addToWishlist={addToWishlist} />
        <div className="button-container">
      </div>
    </div>
    );
  };

export default Ecommerce;