import React, {useState} from 'react';
import '../css/MainScreen.css'
import ArticlesList from './ArticlesList.js'

const MainScreen = ({authToken, setActiveView, user, changeTopic, topic, articles, isLoading, setArticle}) => {
   // Use useState to manage topic state
  const [searchInput, setSearchInput] = useState(''); // State for the input field value

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update the input field value
  };

  const handleSearchClick = () => {
    changeTopic(searchInput); // Update the topic state with the input field value
    console.log('Topic updated to:', topic);
  };

  const handleHomeClick = (e) => {
    setActiveView("main");
  }

  return (
    <div className="container">
      <div className="heading">

        <div className="title-area">

      
          <div classNames="mainscreen-home-button"></div>
          <img src="./imgs/home.png" 
            alt="Description" 
            style={{ width: '20px', height: '20px' }}
            onClick={handleHomeClick} 
            />
          <div className="title-main">
            <div className='title-text-main'>NEWS WAVE</div>
            <div className='subtext-main'>Discover news effortlessly</div>
          </div>
          <div className="profile-button"></div>

          <div className="seach">
          <input 
              type="text" 
              placeholder="Search for topics..." 
              value={searchInput} 
              onChange={handleSearchInputChange}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>

        </div>

        <div className="banner">

        </div>

        <div className="topical-news"></div>
      </div>

      <div className="news-render-space">
        <ArticlesList setActiveView={setActiveView} articles={articles} isLoading={isLoading} setArticle={setArticle}/>
        </div>
      </div>
  );
};

export default MainScreen;
