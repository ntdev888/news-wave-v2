import React, { useState,useEffect } from 'react';
import '../css/SingleArticle.css';



const SingleArticle = ({ setActiveView, articleId, changeTopic, topic }) => {
  const [searchInput, setSearchInput] = useState(''); // State for the input field value

  const contentToSplit = articleId.content
  console.log(contentToSplit)

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update the input field value
  };

  const handleSearchClick = () => {
    changeTopic(searchInput); // Update the topic state with the input field value
    setActiveView("main");
    console.log(topic);
  };

  const handleHomeClick = (e) => {
    setActiveView("main");
  }

  const renderParagraphs = (i) => { 
    return i.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };


  return (
    <div className="singlearticle-container">
      <div className="singlearticle-heading">

        <div className="singlearticle-title-area">
          <div className="singlearticle-home-button">
            <img src="./imgs/home.png" 
            alt="Description" 
            style={{ width: '20px', height: '20px' }}
            onClick={handleHomeClick} 
            />
            </div> 

          <div className="singlearticle-title-main">
            <div onClick={handleSearchClick} className='singlearticle-title-text-main'>NEWS WAVE</div>
            <div className='singlearticle-subtext-main'>Discover news effortlessly</div>
          </div>
          <div className="singlearticle-profile-button"></div>

          <div className="singlearticle-seach">
            <input 
              type="text" 
              placeholder="Search for topics..." 
              value={searchInput} 
              onChange={handleSearchInputChange} 
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
        {renderParagraphs(contentToSplit)}
      </div>
    </div>
  );
};

export default SingleArticle;
