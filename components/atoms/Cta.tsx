import React from 'react';

interface HeaderLinkProps {
    href: string; 
    text: string; 
  }

const Cta: React.FC<HeaderLinkProps> = ({ href, text }) => {
  return (
    <a href={href}>
        <div>{text}</div>
    </a>
  );
};

export default Cta;