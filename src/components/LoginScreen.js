import React, {useState} from 'react';
import '../css/LoginScreen.css';


const LoginScreen = ({setActiveView, setUser, setToken}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    //log user in from information input into login fields
    try {
      const response = await fetch("http://localhost:8080/api-token-auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Store the token in localStorage for future persistancy

      localStorage.setItem("token", data.token);
      // Use the prop function to update the authToken state in the parent component

      setToken(data.token);
      console.log("Login successful!");
      console.log(data.token); //development testing remove for application (NT)

      //successful login will execute UserID Lookup in auth table on Django
      const userInfoResponse = await fetch(
        "http://localhost:8080/api/get-user-id/?username=" +
          encodeURIComponent(username),
        {
          method: "GET",
          headers: {
            Authorization: `Token ${data.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userData = await userInfoResponse.json();

      setUser(userData.user_id);
      console.log(`User ID set successfully! USERID : ${userData.user_id}`);
    } catch (err) {
      setError("Failed to login. Please check your username and password.");
      console.error(err);
    }
  };



  const handleCreateUserClick = () => {
    console.log('Create User clicked');
  };

  const handleMainClick = () => {
    setActiveView("main");
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
            <form>
              <label>
                Username:
                <input type="text" name="username" />
              </label>
              <br />
              <label>
                Password:
                <input type="password" name="password" />
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
          <button className="button" onClick={showPopup}>Login</button>
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
