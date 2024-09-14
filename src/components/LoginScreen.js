import React, { useState } from 'react';
import '../css/LoginScreen.css';

const LoginScreen = ({ setActiveView, setUser, setToken }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Log user in from information input into login fields
    try {
      const response = await fetch('http://localhost:8000/api/users/api-token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Store the token in localStorage for future persistency
      console.log(data.token);
      localStorage.setItem('token', data.token);
      // Use the prop function to update the authToken state in the parent component
      setToken(data.token);
      console.log('Login successful!');
      console.log(data.token); // Development testing

      // Successful login will execute UserID Lookup in auth table on Django
      const userInfoResponse = await fetch(
        'http://localhost:8000/api/users/get-user-id/?username=' + encodeURIComponent(username),
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userData = await userInfoResponse.json();

      setUser(userData.user_id);
      console.log(`User ID set successfully! USERID : ${userData.user_id}`);
      setActiveView('main');
    } catch (err) {
      setError('Failed to login. Please check your username and password.');
      console.error(err);
      setIsPopupVisible(false);
    }
  };

  const handleCreateUserClick = () => {
    setActiveView('createUser')
    console.log('Create User clicked');
  };

  const handleMainClick = () => {
    setActiveView('main');
    console.log('Guest clicked');
  };

  // Function to show the popup
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  // Function to hide the popup
  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="android-large-1">
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Bind input to state
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Bind input to state
                />
              </label>
              <br />
              <button type="submit">Submit</button>
              <button type="button" onClick={hidePopup}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="title-box">
        <div className="title-text-login">NEWS WAVE</div>
        <div className="subtext-login">Discover news effortlessly</div>
      </div>

      <div className="button-box">
        <div className="button1">
          <button className="button" onClick={showPopup}>
            Login
          </button>
        </div>
        <div className="button2">
          <button className="button" onClick={handleMainClick}>
            Guest
          </button>
        </div>

        <span className="create-account" onClick={handleCreateUserClick}>
          Create an account
        </span>
      </div>
    </div>
  );
};

export default LoginScreen;
