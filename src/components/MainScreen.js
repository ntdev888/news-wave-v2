import React, {useState, useEffect} from 'react';
import '../css/MainScreen.css'
import ArticlesList from './ArticlesList.js'

const MainScreen = ({authToken, articles , setArticle , setActiveView, setIsLoading, user, changeTopic, topic, isLoading, setArticles}) => {
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

  useEffect(() => {
    const fetchTopics = async (input) => {
        const endpoint = topic 
            ? `http://localhost:8000/news/articles/?topic=${topic}` 
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

    fetchTopics(topic);
  }, [topic]);


  return (
    <div className="container">
      <div className="heading">

        <div className="title-area">

      
          <div className="mainscreen-home-button">
          <img src="./imgs/Home.png" 
            alt="Description" 
            style={{ width: '30px', height: '30px' }}
            onClick={handleHomeClick} 
            />
          </div>
          

          <div className="title-main">
            <div className='title-text-main'>NEWS WAVE</div>
            <div className='subtext-main'>Discover news effortlessly</div>
          </div>

          <div className="mainscreen-profile-button">
          <img src="./imgs/Avatar.png" 
            alt="Description" 
            style={{ width: '30px', height: '30px' }}
            onClick={handleHomeClick} 
            />
          </div>

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
        <img 
            className="banner-image"
            src="./imgs/background.png" 
            alt="Description" 
            />
        </div>
      </div>

      <div className="news-render-space">
        <ArticlesList setActiveView={setActiveView} articles={articles} isLoading={isLoading} setArticle={setArticle}/>
        </div>
      </div>
  );
};

export default MainScreen;
