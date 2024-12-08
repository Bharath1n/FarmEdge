import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login"; 
import "./styles/app.css";
import HelpBot from "./pages/HelpBot";
import Market from "./pages/Market";
import SignUp from "./pages/SignUp";
import Ecommerce from './pages/Ecommerce';
import Resources from "./pages/Resources";
import WeatherIrrigation from "./pages/WeatherIrrigation";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/helpbot" element={<HelpBot />} />
            <Route path="/weatherIrrigation" element={<WeatherIrrigation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/market" element={<Market />} />
            <Route path="/Ecommerce" element={<Ecommerce />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
