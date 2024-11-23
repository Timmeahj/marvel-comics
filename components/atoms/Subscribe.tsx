import React from 'react';
import '../../styles/atoms/subscribe.scss';

const Subscribe: React.FC = () => {
  return (
    <div>
        <a>
            {/* TODO put in public and import, save image locally */}
            <img src="https://cdn.marvel.com/u/prod/marvel/images/mu/web/2021/icon-mu-shield.png" alt="Marvel Unlimited logo"/>
            <div>
                <p>Marvel Unlimited</p>
                <span>Subscribe</span>
            </div>
        </a>
    </div>
  );
};

export default Subscribe;