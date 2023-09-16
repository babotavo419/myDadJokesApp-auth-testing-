import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useAuth } from '../../../Context/AuthContext';
import { API_BASE_URL } from '../../API/index';
import './login.scss';

function Login() {
  const { login } = useAuth();
  // Define state variables to store user input (e.g., username and password)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend for authentication
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
        // Include any other login-related data here
      });

      // If authentication is successful, you can handle it here
      // For example, you can store the user data and navigate to the dashboard
      login(response.data.user);

      // Optionally, you can redirect the user to the dashboard or another page
    } catch (error) {
      // Handle authentication errors here (e.g., incorrect username/password)
      console.error('Login error:', error.response.data);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for username and password */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Submit button */}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
