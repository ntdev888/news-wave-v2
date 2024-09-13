import React from 'react';
import '../css/LoginScreen.css';


const LoginScreen = () => {

  const handleCreateUserClick = () => {
    console.log('Create User clicked');
  };

  const handleMainClick = () => {
    console.log('Guest clicked');
  };


  return (
    <div className="android-large-1">

      <div className='title-box'>      
        <div className='title-text-login'>NEWS WAVE</div>
        <div className='subtext-login'>Discover news effortlessly</div>
      </div>

      <div className="image frame03-placeholder-icon">
        <div className="iconly-light-outline-image">
          <img className="icon-fill1" alt="Fill1" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAnIGhlaWdodD0nMjAnIHZpZXdCb3g9JzAgMCAyMCAyMCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZmlsbC1ydWxlPSdldmVub2RkJyBjbGlwLXJ1bGU9J2V2ZW5vZGQnIGQ9J001LjY1MDQgMS41QzMuMTI5NCAxLjUgMS41MDA0IDMuMjI3IDEuNTAwNCA1Ljg5OVYxNC4wNTFDMS41MDA0IDE2LjcyNCAzLjEyOTQgMTguNDUgNS42NTA0IDE4LjQ1SDE0LjMwMDRDMTYuODI3NCAxOC40NSAxOC40NjA0IDE2LjcyNCAxOC40NjA0IDE0LjA1MVY1Ljg5OUMxOC40NjA0IDMuMjI3IDE2LjgyNzQgMS41IDE0LjMwMDQgMS41SDUuNjUwNFpNMTQuMzAwNCAxOS45NUg1LjY1MDRDMi4yNzA0IDE5Ljk1IDAuMDAwMzk2NzI5IDE3LjU3OSAwLjAwMDM5NjcyOSAxNC4wNTFWNS44OTlDMC4wMDAzOTY3MjkgMi4zNzEgMi4yNzA0IDAgNS42NTA0IDBIMTQuMzAwNEMxNy42ODU0IDAgMTkuOTYwNCAyLjM3MSAxOS45NjA0IDUuODk5VjE0LjA1MUMxOS45NjA0IDE3LjU3OSAxNy42ODU0IDE5Ljk1IDE0LjMwMDQgMTkuOTVaJyBmaWxsPScjNjE2NDZCJy8+Cjwvc3ZnPgo=" />
        </div>
      </div>

      <div className='button-box'>

        <div className='button1'>
          <button className="button">Login</button>
        </div>
        <div className='button2'>
          <button className="button" onClick={handleMainClick}>Guest</button>
        </div>

        <span className="create-account" onClick={handleCreateUserClick}>Create an account</span>
      </div>

    </div>
  );
};

export default LoginScreen;
