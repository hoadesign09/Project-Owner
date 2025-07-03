import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/sidebar.css"

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo"><Link to="/">Project Owner</Link></h2>
      <ul className="menu">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
