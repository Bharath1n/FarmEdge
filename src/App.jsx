import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login"; 
import Market from "./pages/Market";
import Chatbot from "./pages/Chatbot";
import SignUp from "./pages/SignUp";
import Ecommerce from './pages/Ecommerce';
import CartWishlistPage from './pages/CartWishlist';
import Resources from "./pages/Resources";
import Weather from "./pages/Weather";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setNotification(`${product.name} has been added to your cart!`);
    setFadeOut(false);
    setTimeout(() => {
      setFadeOut(true);
    }, 3000);
    setTimeout(() => setNotification(""), 3500);
 
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
    setNotification(`${product.name} has been added to your wishlist!`);
    setFadeOut(false);
    setTimeout(() => {
      setFadeOut(true);
    }, 3000);
    setTimeout(() => setNotification(""), 3500);
  
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <Router>
      <div className="App">
        <Navbar />
        {notification && <div className={`notification ${fadeOut ? 'fade-out' : ''}`}>{notification}</div>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/market" element={<Market />} />
            <Route path="/Ecommerce" element={<Ecommerce addToCart={addToCart} addToWishlist={addToWishlist} />} />
            <Route path="/cart-wishlist" element={
            <CartWishlistPage 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              wishlistItems={wishlistItems} 
              removeFromWishlist={removeFromWishlist} 
            />} 
          />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
