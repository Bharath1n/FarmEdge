import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Main app component
import './styles/index.css'; // Global CSS

// Ensure that the root element is being accessed correctly
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found. Please check your index.html file.");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}