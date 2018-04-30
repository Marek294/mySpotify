import React from 'react';

import './Mobile.css';

const Mobile = (props) => {
    const { name, displayArtists } = props;

    return (
        <div className='mobile__currentlyplaying'>
            <div className='mobile__currentlyplaying__track' >
            <p className='mobile__currentlyplaying__track__name' onMouseOver={this.onMouseOver}>{name}</p>
            <p className='mobile__currentlyplaying__track__artists'>{displayArtists.join(', ')}</p>
            </div>
        </div>
    );
};

export default Mobile;