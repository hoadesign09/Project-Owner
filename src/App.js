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
import ProjectForm from './components/ProjectForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="dashboard">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<AllProject />} title="Projects" />
            <Route path="/projects/new" element={<ProjectForm />} />
            {/* Route này sẽ nhận query string ?view=1 hoặc ?edit=1, không cần khai báo riêng */}
            <Route path="/project" element={<ProjectForm />} />
            <Route path="/tasks" element={<Task />} title="Tasks" />
            <Route path="/users" element={<User />} title="Users" />
            <Route path="/reports" element={<Report />} title="Reports" />
            <Route path="/tickets" element={<Ticket />} title="Tickets" />
            <Route path="/services" element={<Service />} title="Services" />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
