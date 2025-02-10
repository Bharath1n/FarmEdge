import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from './Ecommerce/ProductList';

const Ecommerce = ({ addToCart, addToWishlist }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 uppercase">FarmEdge Store</h1>
      </div>
      <ProductList addToCart={addToCart} addToWishlist={addToWishlist} />
      <div className="flex flex-auto justify-center items-center">
      <Link to="/cart-wishlist">
          <button className="bg-gray-800 text-white py-2 px-6 mt-4 rounded-lg hover:bg-gray-900 transition">
            Go to Cart 🛒
          </button>
        </Link>
        </div>
    </div>

  );
};

export default Ecommerce;
