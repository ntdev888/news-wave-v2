import React, { useState } from 'react';
import '../css/ArticlesList.css'; // Import the CSS file

const ArticlesList = ({ authToken, setActiveView, user, setArticle, articles, isLoading }) => {

      const handleCardClick = (i) => {
        setActiveView("singleArticle");
        setArticle(i)
      };
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

        return (
            <div className="articles-list">
                {articles.map((article) => (
                    <div 
                        key={article.id} 
                        className="article-card" 
                        onClick={() => handleCardClick(article)}
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
