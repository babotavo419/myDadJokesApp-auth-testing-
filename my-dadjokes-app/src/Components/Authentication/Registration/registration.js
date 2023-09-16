import React, { useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import './registration.scss';
import { API_BASE_URL } from '../../API/index'; 

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9000';

function Registration() {
  const { register } = useAuth();  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // State to store registration errors
  const [loading, setLoading] = useState(false); // Loading state
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true); // Set loading to true while registering

    try {
      // Call the register function from the context
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        await register(username, email, password);
        console.log('Registration successful');

        // Set registrationSuccessful to true when registration is successful
        setRegistrationSuccessful(true);

        // Optionally, you can redirect the user to the login page or display a success message
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      // Handle registration errors here (e.g., duplicate email, weak password)
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed');

      // Reset registrationSuccessful to false when an error occurs
      setRegistrationSuccessful(false);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {registrationSuccessful && <p className="success-message">Registration successful</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Registration;


