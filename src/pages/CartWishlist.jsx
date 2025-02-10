import React from 'react';

const CartWishlistPage = ({ cartItems, removeFromCart, wishlistItems, removeFromWishlist }) => {
  const totalCartValue = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen  bg-cover bg-gradient-to-t from-neutral-100 to-green-300 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white p-6 shadow-lg rounded-lg min-h-screen">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-4">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700">Price: ₹{item.price.toFixed(2)}</p>
                    <button
                      className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length > 0 && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold">Total: ₹{totalCartValue.toFixed(2)}</h2>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">Your Wishlist</h1>
          {wishlistItems.length === 0 ? (
            <p className="text-center text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {wishlistItems.map(item => (
                <div key={item.id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <button
                      className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartWishlistPage;
