import React, { useEffect, useState } from 'react';
import { Newspaper, PlayCircle, Leaf, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

const Resources = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;
  const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=farming&language=en`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();
        if (data.results) {
          setNewsArticles(data.results.slice(0, 4));
        } else {
          setError("No news found.");
        }
      } catch (error) {
        setError("Failed to fetch news.");
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  const videoCategories = [
    { 
      title: "Introduction to Farming", 
      videos: ["lRyXlvIJFWI", "NCp93xbSwWM", "L4ymLChJmew", "yzs-LOJ1w08"],
      icon: "🌱",
      color: "from-green-400 to-emerald-500"
    },
    { 
      title: "Beginner Farming Techniques", 
      videos: ["heTxEsrPVdQ", "fRlUhUWS0Hk", "_AM2fX24vtQ", "ETZF-oyPSy0"],
      icon: "🌾",
      color: "from-yellow-400 to-orange-500"
    },
    { 
      title: "Intermediate Farming Techniques", 
      videos: ["zFdxU-73yAc", "ETZF-oyPSy0", "LGF33NN4B8U", "ys42RUFhMqg"],
      icon: "🚜",
      color: "from-blue-400 to-cyan-500"
    },
    { 
      title: "Advanced Farming Techniques", 
      videos: ["kN_gua66C1w", "ETZF-oyPSy0", "nGtdZxTNu0o", "zFdxU-73yAc"],
      icon: "🎯",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}></div>
        
        <div className="relative container mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Your Agricultural Knowledge Hub</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Be Safe, Control the Environment
          </h1>
          <p className="text-2xl text-green-100 mb-10 max-w-3xl mx-auto">
            Optimizing sustainability with modern farming techniques and cutting-edge resources
          </p>
          
          <div className="flex justify-center gap-4">
            <button className="group bg-white text-green-700 px-8 py-4 rounded-xl shadow-2xl hover:shadow-green-300/50 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2">
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-green-500/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2">
              Explore Resources
              <Leaf className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(240, 253, 244)"/>
          </svg>
        </div>
      </section>

      {/* News Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Newspaper className="w-4 h-4" />
            <span className="text-sm font-semibold">Latest Updates</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Latest AGRO News</h2>
          <p className="text-gray-600 text-lg">Stay updated with the latest developments in agriculture</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              <Leaf className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-green-600" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-2xl border-2 border-red-200">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsArticles.map((article, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={article.image_url || 'https://via.placeholder.com/350x200'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5">
                  <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description || 'No description available.'}
                  </p>
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group"
                  >
                    Read More 
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Videos Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full mb-4">
              <PlayCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Video Library</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Farming Videos</h2>
            <p className="text-gray-600 text-lg">Learn from expert tutorials and demonstrations</p>
          </div>

          {videoCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="mb-16 last:mb-0"
              style={{
                animation: `fadeIn 0.8s ease-out ${categoryIndex * 0.2}s both`
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`bg-gradient-to-r ${category.color} text-white text-3xl w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform transition-all hover:scale-110`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
                  <div className={`h-1 w-32 bg-gradient-to-r ${category.color} rounded-full mt-2`}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {category.videos.map((video, idx) => (
                  <div 
                    key={idx}
                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-900"
                  >
                    <iframe
                      className="w-full h-56"
                      src={`https://www.youtube.com/embed/${video}`}
                      title={`Video ${idx + 1}`}
                      allowFullScreen
                    ></iframe>
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using modern techniques to increase productivity
          </p>
          <button className="bg-white text-green-700 px-10 py-4 rounded-xl shadow-2xl hover:shadow-green-300/50 transition-all duration-300 transform hover:scale-105 font-bold text-lg flex items-center gap-2 mx-auto">
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Resources;