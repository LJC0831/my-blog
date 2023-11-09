import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>LJC Developer Blog</h1>
    </header>
  );
};

const headerStyle = {
  background: '#fff',
  color: '#333',
  textAlign: 'center',
  padding: '1rem',
};


export default Header;