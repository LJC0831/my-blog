// navigator.js

import React from 'react';
import { useRouter } from 'next/router';

const Navigator = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav style={navContainerStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle} onClick={() => handleNavigation('/')}>
          Home
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/about')}>
          About
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/contact')}>
          Contact
        </li>
      </ul>
    </nav>
  );
};

const navContainerStyle = {
  background: '#333',
  color: '#fff',
  width: '150px', // 조절 가능한 너비
  padding: '1rem',
};

const navListStyle = {
  listStyle: 'none',
  padding: 0,
};

const navItemStyle = {
  margin: '0.5rem 0',
  cursor: 'pointer',
};

export default Navigator;