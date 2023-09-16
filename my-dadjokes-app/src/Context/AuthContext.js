import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9000';

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // You can initialize with user data if needed

  const login = async (email, password) => {
    try {
      // Send a POST request to your login endpoint
      // For example:
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return userData; // Return the user data if login is successful
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error; // You can handle this error in your Login component
    }
  };

  const logout = async () => {
    try {
      // Send a POST request to your logout endpoint
      // For example:
      const response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      throw error; // You can handle this error in your Logout component
    }
  };

  const register = async (username, email, password) => {
    try {
      // Send a POST request to your registration endpoint
      // For example:
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
        const userData = await response.json();
        setUser(userData);
        return userData; // Return the user data if registration is successful
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw error; // You can handle this error in your Registration component
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to access the context
export function useAuth() {
  return useContext(AuthContext);
}
