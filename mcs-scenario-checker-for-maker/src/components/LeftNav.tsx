import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftNav.css';

const LeftNav: React.FC = () => {
  return (
    <nav className="left-nav">
      <NavLink to="/add-test">Add Test</NavLink>
      <NavLink to="/execute-tests">Execute Tests</NavLink>
    </nav>
  );
};

export default LeftNav;