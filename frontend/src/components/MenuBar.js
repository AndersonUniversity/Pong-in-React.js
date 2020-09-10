// src/components/MenuBar.js
// the Navigation bar, with Menu items

// standard react components
import React from 'react';
import { Navbar, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    // Display menu items
    <div>
      <Navbar className="MenuBar">
        <Nav>
          <Link className="link" to="/">
            Home
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default MenuBar;
