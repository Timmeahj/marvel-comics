import React from 'react';
import Navbar from '../molecules/Navbar';
import Topbar from '../molecules/Topbar';
import '../../styles/organisms/header.scss';

const Header: React.FC = () => {
  return (
    <header>
      <Topbar/>
      <Navbar />
    </header>
  );
};

export default Header;