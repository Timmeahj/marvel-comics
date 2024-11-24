import React from 'react';
import '../../styles/atoms/cta.scss';

interface HeaderLinkProps {
    href: string; 
    text: string; 
  }

const Cta: React.FC<HeaderLinkProps> = ({ href, text }) => {
  return (
    <a href={href} className='cta'>
        <div className='cta__skewbox'></div>
        <div className='cta__text'>{text}</div>
    </a>
  );
};

export default Cta;