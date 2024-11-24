import React from 'react';
import Login from '../atoms/Login';
import Logo from '../atoms/Logo';
import Subscribe from '../atoms/Subscribe';
import '../../styles/molecules/topbar.scss';

const Topbar: React.FC = () => {
  return (
      <div className='topbar container'>
        <Login/>
        <Logo/>
        <Subscribe/>
      </div>
  );
};

export default Topbar;