import React from 'react';
import '../css/MainScreen.css'
import ArticlesList from './ArticlesList.js'

const MainScreen = () => {


  return (
<div className="container">
  <div className="heading">

    <div className="title-area">

      
      <div classNames="home-button"></div>

      <div className="title-main">
        <div className='title-text-main'>NEWS WAVE</div>
        <div className='subtext-main'>Discover news effortlessly</div>
      </div>
      <div className="profile-button"></div>

      <div className="seach">
        <input />
      </div>

    </div>

    <div className="banner">

    </div>

    <div className="topical-news"></div>
  </div>

  <div className="news-render-space"></div>
    <ArticlesList />
  </div>
  );
};

export default MainScreen;
