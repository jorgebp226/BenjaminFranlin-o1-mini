import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <h1>Virtudes Franklin</h1>
    <div>
      <Link to="/">Calendario</Link>
      <Link to="/progress">Progreso</Link>
    </div>
  </nav>
);

export default Navbar;
