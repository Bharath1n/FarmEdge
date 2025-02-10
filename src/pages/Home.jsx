import React from "react";
import weatherIcon from '../assets/weather-icon.png';
import marketIcon from '../assets/market-icon.png';
import aiIcon from '../assets/ai-icon.png';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center text-gray-800 bg-gradient-to-t from-neutral-100 to-green-300 bg-center ">
            <div className="hero bg-cover py-20 text-black flex flex-col items-center justify-center min-h-screen ">
        <div className="max-w-4xl mx-auto ">
          <h1 className="text-4xl font-bold font-serif">WELCOME TO FARMEDGE</h1>
          <h4 className="text-lg my-16 font-serif">Your Partner in Modern Farming.</h4>
          <Link to="/login">
            <button className="mt-8 px-6 py-3 bg-green-300 text-white hover:bg-neutral-900 rounded font-semibold shadow-md">Get Started</button>
          </Link>
        </div>
      </div>
       
      <div className="py-4">
        <div className="grid md:grid-cols-3 gap-8 w-fit mx-[20px]">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img src={weatherIcon} alt="Weather Updates" className="h-16 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Real-Time Weather Updates</h3>
            <p className="mt-2 text-gray-600">Stay informed about the latest weather conditions to plan your farming activities.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img src={marketIcon} alt="Market Insights" className="h-16 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Market Price Insights</h3>
            <p className="mt-2 text-gray-600">Get the latest market prices to make informed selling decisions.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img src={aiIcon} alt="AI Recommendations" className="h-16 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">AI Recommendations</h3>
            <p className="mt-2 text-gray-600">Receive personalized farming advice based on your specific needs.</p>
          </div>
        </div>
      </div>

      <section className="px-6 py-12 bg-green-50">
        <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">Contact Us</h2>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="John Harbour" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="example@mail.com" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" rows="4" placeholder="Your message..."></textarea>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </section>


    </div>
  );
};

export default Home;
