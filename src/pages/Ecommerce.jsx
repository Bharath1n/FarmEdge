import React, { useState } from 'react';
import ProductList from './Ecommerce/ProductList';
import Cart from './Ecommerce/Cart';
import Wishlist from './Ecommerce/Wishlist';
import "../styles/Ecommerce.css"

const Ecommerce = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="ecommerce">
      <h1>FarmEdge Store</h1>
      <ProductList addToCart={addToCart} addToWishlist={addToWishlist} />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      <Wishlist wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} />
    </div>
  );
};

export default Ecommerce;