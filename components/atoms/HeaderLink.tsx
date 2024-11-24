import React from 'react';
import Link from 'next/link';
import '../../styles/atoms/headerlink.scss';

interface HeaderLinkProps {
  href: string; 
  text: string; 
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      {text}
    </Link>
  );
};

export default HeaderLink;