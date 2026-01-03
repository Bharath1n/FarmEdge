import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Sparkles,
  Heart,
  Search,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Market", href: "/market" },
    { name: "Weather", href: "/weather" },
    { name: "E-Commerce", href: "/ecommerce" },
    { name: "Resources", href: "/resources" },
    { name: "Chatbot", href: "/chatbot" },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Search:", searchQuery);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl border-b border-emerald-100 shadow-lg"
            : "bg-white/80 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative bg-gradient-to-br from-emerald-600 to-green-600 p-3 rounded-2xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  FarmEdge
                </span>
                <div className="text-[10px] text-emerald-600/70">
                  Smart Farming Solutions
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2.5 rounded-xl font-semibold transition ${
                      active
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-3 rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/cart-wishlist"
                className="p-3 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Auth */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow">
                    <User className="w-4 h-4" />
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-xl bg-gray-100"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`transition-all duration-300 ${
            searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto px-4 pb-6">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search products, resources..."
              className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ${
            isOpen ? "max-h-[600px]" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="bg-white border-t px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-emerald-50"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/wishlist"
              className="block px-4 py-3 rounded-xl font-semibold text-rose-600 hover:bg-rose-50"
            >
              Wishlist
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="mt-3 flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      <div className="h-20" />
    </>
  );
};

export default Navbar;
