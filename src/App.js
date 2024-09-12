import React from 'react';
import './css/MockupContainer.css'; // Import the CSS file
import RouterComponenet from './components/Router.js'; // Import the component correctly with a capitalized name


const MockupContainer = () => {

  return (

    <div className="mockup-container">
      {/* The PNG image with the transparent center */}
      <img 
        src="./imgs/phone-mockup.png" 
        alt="Phone Mockup" 
        className="mockup-image" 
      />

      {/* Render the app content behind the mockup */}
      <div className="app-content">
       <RouterComponenet />
      </div>
    </div>

  );
};

export default MockupContainer;
