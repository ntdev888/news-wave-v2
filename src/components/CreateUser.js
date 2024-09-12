import React, {useState} from 'react';
import '../css/CreateUser.css';
import {useNavigate} from 'react-router-dom';

const CreateUser = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      preferential_topics: '',
      read_to_me: false,
      magnified_text: false,
    });
  
    const [message, setMessage] = useState('');
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    // Function to submit form data to the Django API
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:8000/api/users/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setMessage('Registration successful!');
          console.log('Success:', data);
          navigate('/');
        } else {
          const errorData = await response.json();
          setMessage('Registration failed: ' + errorData.detail);
          console.error('Error:', errorData);
        }
      } catch (error) {
        setMessage('An error occurred: ' + error.message);
        console.error('Error:', error);
      }
    };

    const handleCancelClick = () => {
      console.log('Canel clicked');
      navigate('/');
    };


    

  return (
    <div>
      <span className="title-text">NEWS WAVE</span>
      <span className="subtext">Discover news effortlessly</span>
      {/* Form */}
      <div>
      <form onSubmit={handleSubmit}>
        <div>
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

        <div className='form-feild'>
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

        <div>
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

        <button type="submit" className="button create-account-button">Create Account</button>
        <button type="button" className="button cancel-button" onClick={handleCancelClick}>Cancel</button>
      </form>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
