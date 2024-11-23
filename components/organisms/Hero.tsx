import React from 'react';
import Cta from '../atoms/Cta';

const Hero: React.FC = () => {
  return (
    <div>
        <div>
            <h1>Your custom Marvel Comic voucher!</h1>
            <p>Use the interface below to customize your own personal Marvel Comic voucher. Want to keep it for later? Don't forget to save your creation!</p>
            <Cta href="/" text="Get started" />
        </div>
    </div>
  );
};

export default Hero;