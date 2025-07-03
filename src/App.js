import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/page/Dashboard';
import AllProject from './components/page/AllProject';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="dashboard">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<AllProject />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
