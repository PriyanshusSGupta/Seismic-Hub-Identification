import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <h1 className="text-center">Seismic Hub Identification</h1>
          <nav className="nav">
            <ul>
              <li><Link to="/" className="font-medium">Home</Link></li>
              <li><Link to="/upload" className="font-medium">Upload</Link></li>
              <li><Link to="/visualization" className="font-medium">Visualization</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="text-sm text-center">&copy; 2024 Seismic Hub Identification. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;