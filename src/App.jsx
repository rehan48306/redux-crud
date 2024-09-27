import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import UserDetail from './pages/UserDetail'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:_id" element={<UserDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
