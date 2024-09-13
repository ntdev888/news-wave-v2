import React, { useState,useEffect } from 'react';
import LoginScreen from './LoginScreen';
import CreateUser from './CreateUser';
import MainScreen from './MainScreen';
import SingleArticle from './SingleArticle';

const RouterComponenet = () => {
  const [activeView, setActiveView] = useState("menu");
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState();
  const [topic, setTopic] = useState();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [articleId, setArticleId] = useState();
  const [article, setArticle] = useState();

  const setArticlePage = (i) => {
    setArticle(i)
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


  const changeTopic = (i) => {
    setTopic(i);
  }


  const assignToAuthToken = (value) => {
    setAuthToken(value);
  };


  const renderView = () => {
    switch (activeView) {
      case "loginScreen":
        return (
          <LoginScreen
            authToken={authToken}
            setActiveView={setActiveView}
            user={user}
          />
        );

      case "createUser":
        return (
          <CreateUser
            authToken={authToken}
            setActiveView={setActiveView}
            user={user}
          />
        );

      case "singleArticle":
        return (
          <SingleArticle
            articleId={article}
            authToken={authToken}
            setActiveView={setActiveView}
            user={user}
            changeTopic={changeTopic} 
          />
        );

      case "main":
        return (
          <MainScreen 
            setActiveView={setActiveView} 
            changeTopic={changeTopic} 
            articles={articles}
            isLoading={isLoading}
            topic={topic}
            setArticle={setArticlePage} 
          />
        );

      // case "userAccountSettings":
      //   return (
      //     <UserAccountSettings
      //       authToken={authToken}
      //       setActiveView={setActiveView}
      //       user={user}
      //     />
      //   );

      default:
        return (
        <MainScreen 
          setActiveView={setActiveView} 
          changeTopic={changeTopic} 
          articles={articles}
          isLoading={isLoading}
          topic={topic}
          setArticle={setArticlePage} 
        />
      );

    }
  };

  return (
    <div className="app-content">
      {user ? renderView() : renderView("loginScreen")}
    </div>
  );
};

export default RouterComponenet;
