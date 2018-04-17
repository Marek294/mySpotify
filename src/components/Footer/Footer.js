import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__flock'>
                <p className='block__item'>English</p>
            </div>
            <div className='footer__block'>
                <p className='block__item'>&copy; 2018 mySpotify</p>
                <a href="https://www.spotify.com/pl/legal/end-user-agreement/" className='block__link'><p className='block__item'>Legal</p></a>
            </div>
        </footer>
    );
};

export default Footer;