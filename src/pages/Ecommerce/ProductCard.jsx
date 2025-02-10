import React from 'react';
import { ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transform transition ">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg hover:scale-105" />
      <div className="flex flex-col justify-between h-27 ">
      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
      <p className="text-gray-700 mb-2">₹{product.price.toFixed(2)}</p>
      </div>
      <div className="mt-4 flex flex-row gap-3">
      <button id='e-commerce'
      className="flex items-center gap-2 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-950 transition"
      onClick={() => addToCart(product)}>
      <ShoppingCart className="w-5 h-5" /> Add to Cart
      </button>
      <button id='e-commerce'
      className="p-2 bg-red-400 text-white rounded hover:bg-red-500 transition"
      onClick={() => addToWishlist(product)}>
      <Heart className="w-5 h-5" />
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
