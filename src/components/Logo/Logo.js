import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

const Logo = () => {
    return (
        <Link to='/' className='logo'>
            <h1 className='logo__text'>my<span className='logo__text--color'>Spotify</span></h1>
        </Link>
    );
};

export default Logo;