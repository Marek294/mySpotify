import React from 'react';

import classes from './CurrentlyPlaying.css';

const CurrentlyPlaying = (props) => {
    const { state } = props;
    
    const { track_window } = state;
    const { current_track } = track_window;

    const name = current_track.name;
    const artists = current_track.artists;
    const images = current_track.album.images;

    const displayArtists = artists ? artists.map((item,i) => {
        return <li key={i}>{item.name}</li>
    }) : null;

    return (
        <div className={classes.CurrentlyPlaying}>
            <h1>Currently Playing</h1>
            <img src={images[0].url} alt="" />
            <p>{name}</p>
            <ul>{displayArtists}</ul>
        </div>
    );
};

export default CurrentlyPlaying;