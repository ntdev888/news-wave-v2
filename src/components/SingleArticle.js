import React, {useState} from 'react';
import '../css/MainScreen.css'
import {useNavigate} from 'react-router-dom';

const SingleArticle = ({articleId}) => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [topic, setTopic] = useState(); // Use useState to manage topic state
  const [searchInput, setSearchInput] = useState(''); // State for the input field value

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value); // Update the input field value
  };

  const handleSearchClick = () => {
    setTopic(searchInput); // Update the topic state with the input field value
    console.log(topic);
  };

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
          <input 
              type="text" 
              placeholder="Search for topics..." 
              value={searchInput} 
              onChange={handleSearchInputChange} // Handle input change
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>

        </div>

        <div className="banner">

        </div>

        <div className="topical-news"></div>
      </div>

      <div className="news-render-space"><ArticlesList topic={topic}/></div>
      </div>
  );
};

export default SingleArticle;