import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext'

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AuthProvider>
    <App />
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();

