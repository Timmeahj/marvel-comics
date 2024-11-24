import React from 'react';
import '../../styles/atoms/subscribe.scss';
import Search from './Search';

const Subscribe: React.FC = () => {
  return (
    <div className='subscribe'>
        <a className='subscribe__link'>
            {/* TODO put in public and import, save image locally */}
            <img src="https://cdn.marvel.com/u/prod/marvel/images/mu/web/2021/icon-mu-shield.png" alt="Marvel Unlimited logo"/>
            <div className='subscribe__text'>
                <div>Marvel Unlimited</div>
                <span>Subscribe</span>
            </div>
        </a>
        <Search/>
    </div>
  );
};

export default Subscribe;