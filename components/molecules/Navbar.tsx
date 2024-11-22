import React from 'react';
import HeaderLink from '../atoms/HeaderLink';

const Navbar: React.FC = () => {
  return (
      <nav>
        <ul>
          <li>
            <HeaderLink href="/" text="News" />
          </li>
          <li>
            <HeaderLink href="/" text="Comics" />
          </li>
          <li>
            <HeaderLink href="/" text="Characters" />
          </li>
          <li>
            <HeaderLink href="/" text="Movies" />
          </li>
          <li>
            <HeaderLink href="/" text="TV Shows" />
          </li>
          <li>
            <HeaderLink href="/" text="Games" />
          </li>
          <li>
            <HeaderLink href="/" text="Videos" />
          </li>
          <li>
            <HeaderLink href="/" text="More" />
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;