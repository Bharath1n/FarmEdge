import React from "react";
import farmedImg from '../assets/farmed.jpg'; // Ensure you have a suitable hero image
import weatherIcon from '../assets/weather-icon.png'; // Ensure you have the correct icon paths
import marketIcon from '../assets/market-icon.png';
import aiIcon from '../assets/ai-icon.png';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to FarmEdge</h1>
          <h4>Your partner in modern farming.</h4>
          <Link to="/login">
          <button className="cta-button">Get Started</button>
          </Link>
        </div>
      </section>
      <section className="features">
        <h2>Our Key Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <img src={weatherIcon} alt="Weather Updates" />
            <h3>Real-Time Weather Updates</h3> <br />
            <p>Stay informed about the latest weather conditions to plan your farming activities.</p>
          </div>
          <div className="feature">
            <img src={marketIcon} alt="Market Insights" />
            <h3>Market Price Insights</h3> <br />
            <p>Get the latest market prices to make informed selling decisions.</p>
          </div>
          <div className="feature">
            <img src={aiIcon} alt="AI Recommendations" />
            <h3>AI Recommendations</h3> <br />
            <p>Receive personalized farming advice based on your specific needs.</p>
          </div>
        </div>
      </section>
      {/* Quotes Section */}
      <section className="quotes">
        <div className="quote">
          <p>"The farmer has to be an optimist or he wouldn’t still be a farmer." - Will Rogers</p>
        </div>
        <div className="quote">
          <p>“We have neglected the truth that a good farmer is a craftsman of the highest order, a kind of artist.” – Wendell Berry</p>
        </div>
        <div className="quote">
          <p>"To forget how to dig the earth and to tend the soil is to forget ourselves." - Mahatma Gandhi</p>
        </div>
      </section>
    </div>
  );
};

export default Home;