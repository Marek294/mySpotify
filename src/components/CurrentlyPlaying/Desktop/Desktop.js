import React from 'react';

import './Desktop.css';

const Desktop = (props) => {
    const { images, name, displayArtists } = props;

    return (
        <div className='desktop__currentlyplaying'>
            <img src={images[0].url} alt='' className='desktop__currentlyplaying__image' />
            <div className='desktop__currentlyplaying__track' >
            <p className='desktop__currentlyplaying__track__name' onMouseOver={this.onMouseOver}>{name}</p>
            <p className='desktop__currentlyplaying__track__artists'>{displayArtists.join(', ')}</p>
            </div>
        </div>
    );
};

export default Desktop;