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
          소개
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/react')}>
          React.js
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/vue')}>
          Vue.js
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/nodejs')}>
          Node.js
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/mariadb')}>
          MariaDB
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/etc')}>
          기타작업
        </li>
      </ul>
    </nav>
  );
};

const navContainerStyle = {
  background: '#fff', 
  width: '200px',
  padding: '1rem',
};

const navListStyle = {
  listStyle: 'none',
  padding: 0,
};

const navItemStyle = {
  margin: '0.5rem 0',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '5px',
  transition: 'background 0.3s ease',
};



export default Navigator;