import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/page/Dashboard';
import AllProject from './components/page/AllProject';
import User from './components/page/User';
import Task from './components/page/Task';
import Report from './components/page/Report';
import Service from './components/page/Service';
import './App.css';
import Ticket from './components/page/Ticket';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="dashboard">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<AllProject />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/users" element={<User />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/services" element={<Service />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
