import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/custom-routing-engine">Custom Engine</Link>
      </li>
      <li>
        <Link to="/routing-animation">Animation</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
