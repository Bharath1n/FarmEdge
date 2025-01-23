import React from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";
import logo from '../assets/mainlogo.png';

const Navbar = () => {
  return (
    <nav className="navbar sticky-top">
      <div className="container-fluid d-flex align-items-center">
        <a href="#" className="navbar-brand d-flex align-items-center">
        <img src={logo} alt="FarmEdge" height="50" className="me-2" />
          <span className="fw-bold fs-4">FarmEdge</span>
        </a>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="./Market">Market</a>
          </li> */}
          <li className="nav-item">
            <Link to="/Ecommerce" className="nav-link">E-Commerce</Link>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="./weatherIrrigation">Irrigation</a>
          </li> */}
          <li className="nav-item">
            <Link to="/helpbot" className="nav-link">Chatbot</Link>
          </li>
          <li className="nav-item">
            <Link to="/resources" className="nav-link">Resources</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              <i className="fas fa-user"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart-wishlist" className="nav-link">
            <i className="fa fa-shopping-cart"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
