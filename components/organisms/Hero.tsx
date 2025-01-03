import React from 'react';
import Cta from '../atoms/Cta';
import '../../styles/organisms/hero.scss';

const Hero: React.FC = () => {
  return (
    <div className='hero'>
        <div className='container'>
            <div className="hero__skewbox"></div>
            <div className='hero__wrapper'>
                <h1>Your custom Marvel Comic voucher!</h1>
                <p>Use the interface below to customize your own personal Marvel Comic voucher. Want to keep it for later? Don't forget to save your creation!</p>
                <Cta href="#editor" text="Get started" />
            </div>
        </div>
    </div>
  );
};

export default Hero;