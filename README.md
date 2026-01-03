# FarmEdge

FarmEdge is a modern web application designed to assist farmers with real-time data, resources, and tools to enhance their farming practices. The application provides features such as weather updates, market insights, e-commerce for agricultural products, and a chatbot for personalized assistance.

## Features

- Real-Time Weather Updates: Get the latest weather conditions to plan farming activities using OpenWeather API.
- Market Price Insights: Access current market prices from market.csv data to make informed selling decisions.
- E-Commerce Store: Browse and purchase agricultural products directly from the app.
- Chatbot Assistance: Interact with Ramesh, the AI assistant, powered by Google Generative AI, for queries related to   agriculture and farming practices.
- Resources Section: Access the latest news articles from NewsData.io and educational videos related to farming.

## Technologies Used

### Frontend
- React (Vite)
- Tailwind CSS
- Bootstrap
- Chart.js & Recharts (for data visualization)
- React Router
- Axios
- React Markdown
- Framer Motion (for animations)

### Backend
- Express.js
- MongoDB Atlas (for local storage of user data)
- Mongoose (for database management)
- Bcrypt.js & JSON Web Token (for authentication)
- CORS & Dotenv (for environment variable management)

### APIs Used
- Google Generative AI: AI chatbot assistance
- OpenWeather API: Real-time weather updates
- NewsData.io API: Latest news
- Market.csv Data: Market price insights for agricultural products

## Setup Instructions

1. Clone the repository:
   git clone <repository url>
   cd FarmEdge

2. Install dependencies:
   npm install

3. Create a `.env` file in the root directory and add your API keys:
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_NEWSAPI_KEY=your_newsdata_io_api_key
   VITE_GOOGLE_AI_KEY=your_google_generative_ai_key

4. Start the development server:
   npm run dev

## Contributing
Feel free to contribute to FarmEdge by submitting pull requests or reporting issues.