import React from 'react';
import '../../styles/atoms/cta.scss';

interface HeaderLinkProps {
  href: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; // Add onClick prop
}

const Cta: React.FC<HeaderLinkProps> = ({ href, text, onClick }) => {
  return (
    <a href={href} className="cta" onClick={onClick}> {/* Attach the onClick handler */}
      <div className="cta__skewbox"></div>
      <div className="cta__text">{text}</div>
    </a>
  );
};

export default Cta;