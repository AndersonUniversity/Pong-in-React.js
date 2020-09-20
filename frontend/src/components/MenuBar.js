// src/components/MenuBar.js
// the Navigation bar, with Menu items

// standard react components
import React from 'react';
import { Navbar, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

// style for this page
import './MenuBar.css';

const MenuBar = () => {
  return (
    // Display menu items
    <div>
      <Navbar className="MenuBar">
        <Nav>
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/game">
            Play Game
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default MenuBar;
