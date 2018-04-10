import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Logo.css';

const Logo = () => {
    return (
        <Link to='/' className={classes.Logo}>
            <h1>my<span>Spotify</span></h1>
        </Link>
    );
};

export default Logo;