import React from 'react';
import { useRouter } from 'next/router';
import NavigatorStyle from '../../styles/Navigator.module.css';


function Navigator() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav className={NavigatorStyle.left_nav}>
      <ul style={navListStyle}>
        <li>
          <img src="/profile.JPG" alt="프로필 사진" className={NavigatorStyle.profile_img} />
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/Intro')}>
          소개
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/react')}>
          React.js
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/VueList')}>
          Vue.js
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/nodejs')}>
          Node.js
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/mariadb')}>
          mariadb
        </li>
        <li style={navItemStyle} onClick={() => handleNavigation('/board/etc')}>
          기타작업
        </li>
      </ul>
    </nav>
  );
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