import React from 'react';
import FooterLink from '../atoms/FooterLink';

const Footer: React.FC = () => {
  const copy = "©"+new Date().getFullYear()+" MARVEL";
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <FooterLink href="/" text="Terms of use" />
          </li>
          <li>
            <FooterLink href="/" text="Privacy Policy" />
          </li>
          <li>
            <FooterLink href="/" text="Your US State Privacy Rights" />
          </li>
          <li>
            <FooterLink href="/" text="Do Not Sell or Share My Personal Information" />
          </li>
          <li>
            <FooterLink href="/" text="Children's Online Privacy Policy" />
          </li>
          <li>
            <FooterLink href="/" text="License Agreement" />
          </li>
          <li>
            <FooterLink href="/" text="Interest-Based Ads" />
          </li>
          <li>
            <FooterLink href="/" text="Marvel Insider Terms" />
          </li>
          <li>
            <FooterLink href="/" text={copy} />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;