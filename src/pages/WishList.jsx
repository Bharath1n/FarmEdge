import React, { useState, useEffect } from "react";
import {
  Heart,
  ExternalLink,
  Trash2,
  ArrowLeft,
  Star,
  Package,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

function WishlistItem({ item, onRemove, isRemoving }) {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 ${
        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="relative w-full md:w-40 h-40 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
            <Sparkles size={16} />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between gap-4 mb-3">
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600">
                {item.name}
              </h3>

              <button
                onClick={() => onRemove(item.productId)}
                disabled={isRemoving}
                className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg"
              >
                {isRemoving ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Trash2 size={20} />
                )}
              </button>
            </div>

            {item.rating && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(item.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {item.rating}
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-green-600">
                ₹{item.price}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <a
              href={item.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white"
            >
              <ExternalLink size={18} />
              Buy on Partner Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Wishlist() {
  const { getToken } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(null);

  const loadWishlist = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        "http://localhost:5001/api/user/wishlist",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(res.data);
    } catch {
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    setRemovingId(productId);
    try {
      const token = await getToken();
      await axios.delete(
        `http://localhost:5001/api/user/wishlist/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems((prev) =>
        prev.filter((i) => i.productId !== productId)
      );
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <AlertCircle size={40} className="text-red-500 mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-10 px-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-green-100"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        <h1 className="text-4xl font-bold mt-4">Your Wishlist</h1>
        <p className="text-green-100 mt-1">
          {items.length} saved items
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">
              Your wishlist is empty
            </p>
          </div>
        ) : (
          items.map((item) => (
            <WishlistItem
              key={item.productId}
              item={item}
              onRemove={removeItem}
              isRemoving={removingId === item.productId}
            />
          ))
        )}
      </div>
    </div>
  );
}
