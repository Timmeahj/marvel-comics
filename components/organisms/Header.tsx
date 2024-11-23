import React from 'react';
import Navbar from '../molecules/Navbar';
import Topbar from '../molecules/Topbar';

const Header: React.FC = () => {
  return (
    <header>
      <Topbar/>
      <Navbar />
    </header>
  );
};

export default Header;