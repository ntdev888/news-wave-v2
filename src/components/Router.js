import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import CreateUser from './CreateUser';
import MainScreen from './MainScreen';

const RouterComponenet = () => {
  // State for managing user login and preferences
  const [user, setUser] = useState(null); // User object to hold user info if logged in
  const [preferences, setPreferences] = useState({ theme: 'light', notifications: true }); // Example preferences state
  const [loadedComponent, setLoadedComponent] = useState('LoginScreen'); // State to track which component is loaded

  // Function to handle user login
  const handleLogin = (userData) => {
    setUser(userData); // Set the user data after successful login
    setLoadedComponent('MainScreen'); // Navigate to the main screen after login
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null); // Clear user data
    setLoadedComponent('LoginScreen'); // Navigate back to login screen
  };

  // Function to update user preferences
  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences })); // Merge existing preferences with new ones
  };

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            user ? (
              <MainScreen user={user} preferences={preferences} onLogout={handleLogout} />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/mainscreen"
          element={<MainScreen />}
        />

        <Route
          path="/create-user"
          element={<CreateUser />}
        />

        <Route 
            path="/main" 
            element={<MainScreen />} 
        />
        
      </Routes>
    </Router>
  );
};

export default RouterComponenet;
