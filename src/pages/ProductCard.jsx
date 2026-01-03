import axios from "axios";
import { Heart, ExternalLink, ShoppingCart } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { getToken } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const addToWishlist = async () => {
    try {
      const token = await getToken();
      await axios.post(
        "http://localhost:5001/api/user/wishlist",
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsWishlisted(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Wishlist Button - Floating */}
        <button
          onClick={addToWishlist}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
          } ${isAnimating ? 'scale-125' : 'scale-100'} shadow-lg`}
        >
          <Heart 
            size={18} 
            fill={isWishlisted ? "currentColor" : "none"}
            className="transition-all duration-300"
          />
        </button>

        {/* Quick View Badge */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full text-gray-700">
            Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-800 text-base line-clamp-2 min-h-[3rem] mb-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{Math.floor(product.price * 1.3)}</span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            23% OFF
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <ShoppingCart size={16} />
            <span>Buy Now</span>
          </a>

          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}