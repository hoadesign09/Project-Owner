import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/sidebar.css"
import DashboardIcon from "@mui/icons-material/Dashboard";


function Sidebar() {
    return (
        <div className="sidebar">
            <div className="top">
                <h2 className="logo"><Link to="/"><span>POMDESK</span></Link></h2>
            </div>
            <hr />
            <div className="center">
                <ul className="menu">
                    <Link to="/">
                        <li>
                            {/* <DashboardIcon className="icon" /> */}
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <Link to="/projects"><li>Projects</li></Link>
                    <Link to="/tasks"><li>Tasks</li></Link>
                    <Link to="/users"><li>Users</li></Link>
                    <Link to="/reports"><li>Reports</li></Link>
                    <Link to="/tickets"><li>Tickets</li></Link>
                    <Link to="/services"><li>Services</li></Link>
                </ul>
            </div>

        </div>
    );
}

export default Sidebar;
