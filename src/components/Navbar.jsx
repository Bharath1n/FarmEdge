import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/mainlogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-300 uppercase px-4 md:px-12 py-4 static w-full top-0 z-50 shadow-md">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-black font-serif">
          <img src={logo} alt="FarmEdge" className="h-12 mr-2 p-2" />
          <span className="font-bold text-xl">FarmEdge</span>
        </Link>
        <div className="hidden md:flex space-x-4 font-serif">
          <Link className="text-black hover:text-white " to="/">Home</Link>
          <Link className="text-black hover:text-white" to="/Market">Market</Link>
          <Link className="text-black hover:text-white" to="/Weather">Weather</Link>          
          <Link className="text-black hover:text-white" to="/Ecommerce">E-Commerce</Link>
          <Link className="text-black hover:text-white" to="/Chatbot">Chatbot</Link>
          <Link className="text-black hover:text-white" to="/Resources">Resources</Link>
          <Link className="text-black hover:text-white" to="/signup">
            <i className="fas fa-user hover:scale-125"></i>
          </Link>
          <Link to="/cart-wishlist" className="text-black hover:text-white transition">
            <i className="fa fa-shopping-cart hover:scale-125">
            </i>
          </Link>
        </div>
        <button className="md:hidden text-2xl text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="font-serif absolute top-16 right-5 w-[50%] bg-green-100 rounded-2xl text-center py-1 md:hidden"
          >
            <Link to="/" className="block py-3 text-black hover:text-white transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/Market" className="block py-3 text-black hover:text-white transition" onClick={() => setIsOpen(false)}>Market</Link>
            <Link to="/Weather" className="block py-3 text-black hover:text-white transition" onClick={() => setIsOpen(false)}>Weather</Link>
            <Link to="/Ecommerce" className="block py-3 text-black hover:text-white transition" onClick={() => setIsOpen(false)}>E-Commerce</Link>
            <Link to="/Chatbot" className="block py-3 text-black hover:text-white transition" onClick={() => setIsOpen(false)}>Chatbot</Link>
            <Link to="/Resources" className="block py-3 text-black hover:text-white transition" onClick={() => setIsOpen(false)}>Resources</Link>
            <Link to="/signup" className="block py-3 text-black hover:text-white transition" onClick={() => setIsOpen(false)}>
              <i className="fas fa-user"></i>
            </Link>
            <Link to="/cart-wishlist" className="block py-3 hover:text-white transition font-mono" onClick={() => setIsOpen(false)}>
              <i className="fa fa-shopping-cart"></i>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
