import React from "react";
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
            <a className="nav-link" href="./Home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./Market">Market</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./Ecommerce">E-Commerce</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="./weatherIrrigation">Irrigation</a>
          </li> */}
          <li className="nav-item">
          <a className="nav-link" href="./HelpBot">Chatbot</a></li>
          <li className="nav-item">
            <a className="nav-link" href="./Resources">Resources</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./SignUp">
              <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
