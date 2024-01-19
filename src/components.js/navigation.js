import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navigation.css';

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    navigate('/');
  }

  return (
    <nav>
      <div className="logo">COMFORT STAY</div>
      <div className={`menu-toggle ${showMenu ? "active" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-list ${showMenu ? "active" : ""}`}>
        <li>
          <Link to="/header">Home</Link>
        </li>
        <li>
          <Link to="/facilities">Facilities</Link>
        </li>
        <li>
          <Link to="/roomReserv">Rooms</Link>
        </li>
        <li>
          <button className='btn' onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
