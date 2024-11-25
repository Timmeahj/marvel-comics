import React from 'react';
import Link from 'next/link';
import '../../styles/atoms/footerlink.scss';

interface HeaderLinkProps {
  href: string; 
  text: string; 
}

const FooterLink: React.FC<HeaderLinkProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      {text}
    </Link>
  );
};

export default FooterLink;