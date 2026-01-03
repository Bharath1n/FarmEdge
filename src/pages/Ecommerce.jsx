import React, { useEffect, useState } from "react";
import { Search, Filter, Heart, ExternalLink, Star, Loader2 } from "lucide-react";
import { useAuth, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { products } from "../data/products";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Ecommerce() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [wishlistIds, setWishlistIds] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const token = await getToken();
      const res = await axios.get("http://localhost:5001/api/user/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistIds(res.data.map((i) => i.productId));
    } catch {}
  };

  const toggleWishlist = async (product) => {
    setLoadingId(product.productId);
    const token = await getToken();

    if (wishlistIds.includes(product.productId)) {
      await axios.delete(
        `http://localhost:5001/api/user/wishlist/${product.productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistIds((p) => p.filter((id) => id !== product.productId));
    } else {
      await axios.post(
        "http://localhost:5001/api/user/wishlist",
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistIds((p) => [...p, product.productId]);
    }
    setLoadingId(null);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (category === "All" || p.category === category)
  );

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Filter className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Premium Agricultural Products</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              FarmEdge Store
            </h1>
            <p className="text-xl text-green-600 max-w-2xl mx-auto">
              Quality products for modern farming. Grow better, harvest more.
            </p>
          </div>

        <div className="flex gap-4 mb-6">
          <Search />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-xl border"
          />
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full ${
                c === category
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => {
            const wishlisted = wishlistIds.includes(product.productId);

            return (
              <div
                key={product.productId}
                className="bg-white rounded-2xl shadow p-5"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover rounded-xl mb-4"
                />

                <h3 className="font-semibold mb-2">{product.name}</h3>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={product.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-semibold flex items-center gap-1"
                  >
                    Buy <ExternalLink size={14} />
                  </a>

                  <SignedIn>
                    <button
                      onClick={() => toggleWishlist(product)}
                      disabled={loadingId === product.productId}
                      className={`p-2 rounded-full ${
                        wishlisted
                          ? "bg-rose-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {loadingId === product.productId ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
                      )}
                    </button>
                  </SignedIn>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="p-2 bg-gray-100 rounded-full">
                        <Heart size={16} />
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/cart-wishlist")}
            className="px-8 py-3 bg-black text-white rounded-xl"
          >
            View Wishlist ({wishlistIds.length})
          </button>
        </div>
      </div>
    </div>
  );
}
