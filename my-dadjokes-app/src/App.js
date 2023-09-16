import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './Components/Authentication/Registration/registration';
import Login from './Components/Authentication/Login/login';
import Dashboard from './Components/Dashboard/dashboard';

function App() {
  return (
    <Routes>
      {/*<Route path="/" element={<Home />} />*/}
      <Route index  element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;




