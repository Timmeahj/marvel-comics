import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
          <li style={{ marginRight: '20px' }}>
            <Link href="/">
              Home
            </Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link href="/about">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;