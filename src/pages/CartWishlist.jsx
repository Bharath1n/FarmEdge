import React from 'react';
import "../styles/Ecommerce.css";

const CartWishlistPage = ({ cartItems, removeFromCart, wishlistItems, removeFromWishlist }) => {
  const totalCartValue = cartItems.reduce((total, item) => total + item.price, 0);
  return (
    <div className="cart-wishlist-page">
      <div className = "cart-section">
      <h1 className='head-cw'>Your Cart</h1>
      <br />
      {cartItems.length === 0 ? (
        <p className ="empty-cw" >Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div  className="cart-item-deatils">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price.toFixed(2)}</p>
              <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
            </li>
          ))}
          <div className="total-cart-value">
            <br />
            <h2>Total Cart Value: ₹{totalCartValue.toFixed(2)}</h2>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </ul>
        
      )}
      </div>
      <div className = "wishlist-section">
      <h1 className='head-cw'>Your Wishlist</h1>
      <br />
      {wishlistItems.length === 0 ? (
        <p className ="empty-cw">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
               <img src={item.image} alt={item.name} />
               <div className="wishlist-item-details">
              <h3>{item.name}</h3>
              <button className="remove-button" onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default CartWishlistPage;