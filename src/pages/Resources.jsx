import React, { useEffect, useState } from 'react';

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

  return (
    <div className="w-full">

    <section className="text-center bg-green-100 py-16 border-b-4 border-green-500">
      <h1 className="text-4xl font-bold text-green-800">Be Safe, Control the Environment</h1>
      <p className="text-lg text-gray-700 mt-2">Optimizing sustainability with modern farming techniques.</p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
          Learn More
        </button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition">
          Read More
        </button>
      </div>
    </section>

    <section className="px-6 py-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Latest AGRO News</h2>
        {loading ? (
          <p className="text-center text-lg">Loading news...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsArticles.map((article, index) => (
              <div key={index} className="bg-white border rounded-lg shadow-md p-4 transition hover:shadow-lg">
                <img
                  src={article.image_url || 'https://via.placeholder.com/350x200'}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h4 className="text-lg font-semibold mt-3">{article.title}</h4>
                <p className="text-sm text-gray-600">{article.description || 'No description available.'}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold mt-2 inline-block">
                  Read More →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="px-6 py-12 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Farming Videos</h2>

        {[
          { title: "Introduction to Farming", videos: ["lRyXlvIJFWI", "NCp93xbSwWM", "L4ymLChJmew", "yzs-LOJ1w08"] },
          { title: "Beginner Farming Techniques", videos: ["heTxEsrPVdQ", "fRlUhUWS0Hk", "_AM2fX24vtQ", "ETZF-oyPSy0"] },
          { title: "Intermediate Farming Techniques", videos: ["zFdxU-73yAc", "ETZF-oyPSy0", "LGF33NN4B8U", "ys42RUFhMqg"] },
          { title: "Advanced Farming Techniques", videos: ["kN_gua66C1w", "ETZF-oyPSy0", "nGtdZxTNu0o", "zFdxU-73yAc"] }
        ].map((category, index) => (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">{category.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {category.videos.map((video, idx) => (
                <iframe
                  key={idx}
                  className="w-full h-48 rounded-md shadow-md"
                  src={`https://www.youtube.com/embed/${video}`}
                  title={`Video ${idx + 1}`}
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resources;