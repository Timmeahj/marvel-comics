import React from 'react';
import Link from 'next/link';

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