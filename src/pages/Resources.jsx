import React, { useEffect, useState } from 'react';
import '../styles/resources.css'; // Import the CSS file for styling

const Resources = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '1ebe56ca0b4c48b39c6fb9bd5fd6c1a5'; // Replace with your NewsAPI key
      const newsApiUrl = `https://newsapi.org/v2/everything?q=farming&apiKey=${apiKey}`;

      try {
        const response = await fetch(newsApiUrl);
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setNewsArticles(data.articles.slice(0, 6)); // Get the top 6 articles
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="resources-page">
      {/* Hero Section */}
      <section className="resources-hero">
        <h1>Be Safe, Control the Environment</h1>
        <p>Optimizing sustainability with modern farming techniques.</p>
        <div className="resources-hero-buttons">
          <button className="resources-primary-btn">Learn More</button>
          <button className="resources-secondary-btn">Read More</button>
        </div>
      </section>

      {/* News Section */}
      <section id="resources-news" className="resources-news-section">
        <h2>Latest Farming News</h2>
        <div id="resources-news-container" className="resources-news-container">
          {newsArticles.length > 0 ? (
            newsArticles.map((article, index) => (
              <div key={index} className="resources-news-card">
                <img src={article.urlToImage || 'https://via.placeholder.com/350x200'} alt={article.title} />
                <h4>{article.title}</h4>
                <p>{article.description || 'No description available.'}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
              </div>
            ))
          ) : (
            <p>No news articles found.</p>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section id="resources-videos" className="resources-videos-section">
        <h2>Farming Videos</h2>

        {/* Introduction Videos */}
        <div className="resources-video-category">
          <h3>Introduction to Farming</h3>
          <div className="resources-video-container">
            <iframe src="https://www.youtube.com/embed/lRyXlvIJFWI" title="Intro Video 1" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/NCp93xbSwWM" title="Intro Video 2" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/L4ymLChJmew" title="Intro Video 3" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/yzs-LOJ1w08" title="Intro Video 4" allowFullScreen></iframe>
         
          </div>
        </div>

        {/* Beginners Videos */}
        <div className="resources-video-category">
          <h3>Beginner Farming Techniques</h3>
          <div className="resources-video-container">
            <iframe src="https://www.youtube.com/embed/heTxEsrPVdQ" title="Beginner Video 1" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/fRlUhUWS0Hk" title="Beginner Video 2" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/_AM2fX24vtQ" title="Beginner Video 3" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/ETZF-oyPSy0" title="Beginner Video 4" allowFullScreen></iframe>
          </div>
        </div>

        {/* Intermediate Videos */}
        <div className="resources-video-category">
          <h3>Intermediate Farming Techniques</h3>
          <div className="resources-video-container">
            <iframe src="https://www.youtube.com/embed/zFdxU-73yAc" title=" Intermediate Video 1" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/ETZF-oyPSy0" title=" Intermediate Video 2" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/LGF33NN4B8U" title=" Intermediate Video 3" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/ys42RUFhMqg" title=" Intermediate Video 4" allowFullScreen></iframe>
          </div>
        </div>

        {/* Advanced Videos */}
        <div className="resources-video-category">
          <h3>Advanced Farming Techniques</h3>
          <div className="resources-video-container">
            <iframe src="https://www.youtube.com/embed/kN_gua66C1w" title="Advanced Video 1" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/ETZF-oyPSy0" title="Advanced Video 2" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/nGtdZxTNu0o" title="Advanced Video 3" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/zFdxU-73yAc" title="Advanced Video 4" allowFullScreen></iframe>
         
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;