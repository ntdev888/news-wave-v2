import React, { useEffect, useState } from 'react';
import '../css/ArticlesList.css'; // Import the CSS file
import {useNavigate} from 'react-router-dom';

const ArticlesList = ({ topic }) => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate(); // useNavigate hook for navigation
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            const endpoint = topic 
                ? `http://localhost:8000/news/articles?topic=${topic}` 
                : `http://localhost:8000/news/articles-random/`;
          try {
            const response = await fetch(
              endpoint,
              {
                method: "GET",
                headers: {
                //   Authorization: `Token ${authToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            setArticles(data);
            setIsLoading(false);
            console.log("Article example:");
            console.log(data[1]);
          } catch (error) {
            console.error("Error fetching data: ", error);
            setIsLoading(false);
          }
        };
    
        fetchTopics();
      }, []);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

    const handleCardClick = (articleUrl) => {
        // Open the article URL in a new tab
        navigate('/single-article');
    };

        return (
            <div className="articles-list">
                {articles.map((article) => (
                    <div 
                        key={article.id} 
                        className="article-card" 
                        onClick={() => handleCardClick(article.id)}
                    >
                        <img 
                            src={article.pictureUrl} 
                            alt={article.title} 
                            className="article-image" 
                        />
                        <div className="article-title">
                            {article.title}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

export default ArticlesList;
