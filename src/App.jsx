import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Market from "./pages/Market.jsx";
import Weather from "./pages/Weather.jsx";
import Ecommerce from "./pages/Ecommerce.jsx";
import Resources from "./pages/Resources.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Wishlist from "./pages/WishList.jsx";

const Protected = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* ✅ PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />

            {/* 🔒 PROTECTED ROUTES */}
            <Route
              path="/market"
              element={
                <Protected>
                  <Market />
                </Protected>
              }
            />

            <Route
              path="/weather"
              element={
                <Protected>
                  <Weather />
                </Protected>
              }
            />

            <Route
              path="/ecommerce"
              element={
                <Protected>
                  <Ecommerce />
                </Protected>
              }
            />

            <Route
              path="/chatbot"
              element={
                <Protected>
                  <Chatbot />
                </Protected>
              }
            />

            <Route
              path="/cart-wishlist"
              element={
                <Protected>
                  <Wishlist />
                </Protected>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
