import React from 'react';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>LJC Developer Blog</h1>
    </header>
  );
};

const headerStyle = {
  background: '#ffffff',
  color: '#070707',
  textAlign: 'center',
  height:'20px',
};


export default Header;