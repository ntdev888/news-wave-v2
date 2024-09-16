import React, { useState } from "react";
import "../css/CreateUser.css";

const CreateUser = ({ setActiveView, setUser, setToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    preferential_topics: "",
    read_to_me: false,
    magnified_text: false,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to submit form data to the Django API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Register the user
      const response = await fetch(
        "http://localhost:8000/api/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage("Registration successful!");
        console.log("Registration Success:", data);

        // Step 2: Log in the user after successful registration
        const loginResponse = await fetch(
          "http://localhost:8000/api/users/api-token-auth/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          }
        );

        if (!loginResponse.ok) {
          throw new Error("Failed to log in after registration");
        }

        const loginData = await loginResponse.json();
        localStorage.setItem("token", loginData.token);
        setToken(loginData.token);
        console.log("Login successful!", loginData.token);

        // Step 3: Fetch user ID after successful login
        const userInfoResponse = await fetch(
          "http://localhost:8000/api/users/get-user-id/?username=" +
            encodeURIComponent(formData.username),
          {
            method: "GET",
            headers: {
              Authorization: `Token ${loginData.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userData = await userInfoResponse.json();
        setUser(userData.user_id);
        console.log(`User ID set successfully! USERID: ${userData.user_id}`);
        setActiveView("main"); // Navigate to main view on success
      } else {
        const errorData = await response.json();
        setMessage(
          "Registration failed: " + (errorData.detail || "Unknown error")
        );
        console.error("Error:", errorData);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
      console.error("Error:", error);
    }
  };

  const handleCancelClick = () => {
    setActiveView("loginScreen"); // Redirect to login view on cancel
    console.log("Cancel clicked");
  };

  return (
    <div className="container-createuser">
      <div className="header">
        <span className="title-text">NEWS WAVE</span>
        <span className="subtext">Discover news effortlessly</span>
      </div>

      <div className="form-elements">
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="input-field"
            />
          </div>

          <div className="input-div">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-field"
            />
          </div>

          <div className="input-div">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input-field"
            />
          </div>

          <div className="cu-button-box">
            <button type="submit" className="button create-account-button">
              Create Account
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
