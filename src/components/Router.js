import React, { useState,useEffect } from 'react';
import LoginScreen from './LoginScreen';
import CreateUser from './CreateUser';
import MainScreen from './MainScreen';
import SingleArticle from './SingleArticle';
import '../css/router.css'

const RouterComponenet = () => {
  const [activeView, setActiveView] = useState("menu");
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState();
  const [topic, setTopic] = useState();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState();

  const assignToAuthToken = (value) => {
    setAuthToken(value);
  };


  const renderView = () => {
    switch (activeView) {
      case "loginScreen":
        return (
          <LoginScreen
            setToken={assignToAuthToken}  
            setActiveView={setActiveView}
            setUser={setUser}
          />
        );

      case "createUser":
        return (
          <CreateUser
            setToken={assignToAuthToken} 
            setActiveView={setActiveView}
            setUser={setUser}
          />
        );

      case "singleArticle":
        return (
          <SingleArticle
            articleId={article}
            authToken={authToken}
            setActiveView={setActiveView}
            user={user}
            changeTopic={setTopic} 
          />
        );

      case "main":
        return (
          <MainScreen 
          setActiveView={setActiveView} 
          changeTopic={setTopic} 
          isLoading={isLoading}
          topic={topic}
          articles={articles}
          setArticles={setArticles}
          setIsLoading={setIsLoading}
          setArticle={setArticle} 
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
          <LoginScreen
          setToken={assignToAuthToken} 
          setActiveView={setActiveView}
          setUser={setUser}
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
