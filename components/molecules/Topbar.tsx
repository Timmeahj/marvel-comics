import React from 'react';
import Login from '../atoms/Login';
import Logo from '../atoms/Logo';
import Subscribe from '../atoms/Subscribe';
import Search from '../atoms/Search';
import '../../styles/molecules/topbar.scss';

const Topbar: React.FC = () => {
  return (
      <div>
        <Login/>
        <Logo/>
        <Subscribe/>
        <Search/>
      </div>
  );
};

export default Topbar;