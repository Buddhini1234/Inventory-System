import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#002855',
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}>
    {/* Logo */}
    <div style={{
      fontWeight: '600',
      fontSize: '26px',
      color: '#fff',
      letterSpacing: '1px'
    }}>
      NIFS
    </div>

    {/* Links and Dropdowns */}
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      {/* Home Link */}
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
        Home
      </Link>

      {/* Add Item Dropdown */}
      <div className="dropdown">
        <span>Add Item ▼</span>
        <div className="dropdown-content">
          <Link to="/add/computer">Computer</Link>
          <Link to="/add/cpu">UPS</Link>
          <Link to="/add/switch">Network Switch</Link>
        </div>
      </div>

      {/* Details Dropdown */}
      <div className="dropdown">
        <span>Details ▼</span>
        <div className="dropdown-content">
          <Link to="/details/computer">Computer</Link>
          <Link to="/details/cpu">UPS</Link>
          <Link to="/details/switch">Network Switch</Link>
        </div>
      </div>
    </div>

    {/* Styles */}
    <style>{`
      .dropdown {
        position: relative;
        font-weight: 500;
      }

      .dropdown span {
        cursor: pointer;
        padding: 8px;
        display: inline-block;
      }

      .dropdown-content {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        position: absolute;
        background-color: white;
        min-width: 180px;
        top: 100%;
        margin-top: 8px;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        z-index: 2000;
      }

      .dropdown:hover .dropdown-content {
        opacity: 1;
        visibility: visible;
      }

      .dropdown-content a {
        color: #002855;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        transition: background 0.3s;
      }

      .dropdown-content a:hover {
        background-color: #f0f4ff;
      }
    `}</style>
  </nav>
);

export default Navbar;
