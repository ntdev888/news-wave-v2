import React, { useEffect, useState } from 'react';

import '../css/ArticlesList.css'; // Import the CSS file

const ArticlesList = ({ topic }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Determine the API endpoint based on whether the topic is provided
        const endpoint = topic ? `http://localhost:8000/news/articles?topic=${topic}` : `http://localhost:8000/news/articles-random/`;

        // Fetch articles from the appropriate endpoint
        fetch(endpoint)
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching articles:', error));
    }, [topic]);

    const handleCardClick = (articleUrl) => {
        // Open the article URL in a new tab
        window.open(articleUrl, '_blank');
    };

    return (
        <div>
            {articles.map((article, index) => (
                <div 
                    key={index} 
                    onClick={() => handleCardClick(article.url)}
                >
                    <img 
                        src={article.pictureUrl} 
                        alt={article.title} 
                    />
                    <div>
                        {article.title}
                    </div>
                    <div>
                        {article.description}
                    </div>
                    <div>
                        <span>Source: {article.source_name}</span>
                        <span>Published: {new Date(article.published_at).toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticlesList;
