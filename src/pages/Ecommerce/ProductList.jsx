import React from 'react';
import ProductCard from './ProductCard';

const products = [
        {
          id: 1,
          name: "Organic Fertilizer",
          description: "Premium organic fertilizer for healthy crops.",
          price: 2500,
          image: "https://i.pinimg.com/474x/24/38/76/24387681c0cf23b9c596fa50067e0541.jpg",
        },
        {
          id: 2,
          name: "Irrigation Timer",
          description: "Smart irrigation timer to optimize water usage.",
          price: 7500,
          image: "https://i.pinimg.com/474x/47/61/87/47618704021ac32cd56406d902d13b83.jpg",
        },
        {
          id: 3,
          name: "Seed Pack",
          description: "High-quality seeds for better crop yield.",
          price: 1200,
          image: "https://i.pinimg.com/474x/16/02/26/160226e5eca0375e38ed277658826bb9.jpg",
        },
        {
          id: 4,
          name: "Soil Moisture Sensor",
          description: "Monitor soil moisture for better irrigation decisions.",
          price: 6500,
          image: "https://i.pinimg.com/474x/30/a5/d8/30a5d83b0c7c6e95802e0cc1d4f0ae67.jpg",
        },
        {
          id: 5,
          name: "Hydroponic Kit",
          description: "Complete hydroponic kit for soil-less farming.",
          price: 3500,
          image: "https://i.pinimg.com/474x/fc/fd/e6/fcfde65d64dcb87d2a787eb00b89493d.jpg",
        },
        {
          id: 6,
          name: "Plant Growth Light",
          description: "LED grow light for indoor plant growth.",
          price: 999,
          image: "https://i.pinimg.com/474x/6e/08/79/6e087902e3726d6124118a8e38430dd2.jpg",
        },
        {
          id: 7,
          name: "Automatic Watering System",
          description: "Automated system for easy plant watering.",
          price: 22000,
          image: "https://i.pinimg.com/474x/71/e6/11/71e611a5bc0b3546c1b3adf2a8eb3a88.jpg",
        },
        {
          id: 8,
          name: "Greenhouse Kit",
          description: "Portable greenhouse for year-round gardening.",
          price: 50000,
          image: "https://i.pinimg.com/474x/a2/f1/20/a2f12079c124383fad0d36b89bb35392.jpg",
        },
        {
          id: 9,
          name: "Compost Bin",
          description: "Eco-friendly composting bin for waste recycling.",
          price: 1200,
          image: "https://i.pinimg.com/474x/0a/c2/cb/0ac2cbf8289f0f86a871b2cc630f0b7a.jpg",
        },
        {
          id: 10,
          name: "Garden Trowel",
          description: "Durable hand trowel for easy gardening.",
          price: 350,
          image: "https://i.pinimg.com/474x/0c/c0/1a/0cc01acbfdae759ea012883335c2fdae.jpg",
        },
        {
          id: 11,
          name: "Plant Fertilizer Sprayer",
          description: "Sprayer for applying liquid fertilizers evenly.",
          price: 8000,
          image: "https://i.pinimg.com/474x/4f/48/53/4f485389cece10020ae123fb3085b33b.jpg",
        },
        {
          id: 12,
          name: "Organic Herb Garden Kit",
          description: "Grow your own herbs with this organic kit.",
          price: 4500,
          image: "https://i.pinimg.com/474x/41/06/a0/4106a0665bc511a65f6bf9e016c2b310.jpg",
        },
      ];
    
const ProductList = ({ addToCart, addToWishlist }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      ))}
    </div>
  );
};

export default ProductList;