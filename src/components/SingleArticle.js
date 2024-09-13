import React, { useState } from 'react';
import '../css/SingleArticle.css';

const SingleArticle = ({ setActiveView, articleId, changeTopic }) => {
  const [topic, setTopic] = useState(); // Use useState to manage topic state
  const [searchInput, setSearchInput] = useState(''); // State for the input field value

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update the input field value
  };

  const handleSearchClick = () => {
    changeTopic(searchInput); // Update the topic state with the input field value
    setActiveView("main");
    console.log(topic);
  };

  return (
    <div className="singlearticle-container">
      <div className="singlearticle-heading">

        <div className="singlearticle-title-area">
          <div className="singlearticle-home-button"></div> {/* Corrected 'className' */}

          <div className="singlearticle-title-main">
            <div className='singlearticle-title-text-main'>NEWS WAVE</div>
            <div className='singlearticle-subtext-main'>Discover news effortlessly</div>
          </div>
          <div className="singlearticle-profile-button"></div>

          <div className="singlearticle-seach">
            <input 
              type="text" 
              placeholder="Search for topics..." 
              value={searchInput} 
              onChange={handleSearchInputChange} // Handle input change
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>

        </div>

        <div className="singlearticle-banner">
          <img src={articleId.pictureUrl} alt="Article Banner" />
        </div>

        <div className="singlearticle-topical-news">
          {articleId.title}
        </div>
      </div>

      <div className="singlearticle-news-render-space">
        {articleId.description}
      </div>
    </div>
  );
};

export default SingleArticle;
