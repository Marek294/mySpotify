import React from 'react';
import { Link } from 'react-router-dom';

import './Featured.css';

const Featured = (props) => {
    const { featured } = props;
    let message, playlists, displayPlaylists;

    if(Object.keys(featured).length) {
        ({
            message,
            playlists: {
                items : playlists
            }
        } = featured);

        displayPlaylists = playlists.map((item, i) => (
            <Link to={`../user/spotify/playlist/${item.id}`} key={i} className='playlists__item' >
                <div className='item__imageContainer'>
                    <img src={item.images[0].url} alt='' className='item__image' />
                    <div className='item__overlay'>
                        <i className="far fa-play-circle overlay__icon"></i>
                    </div>
                </div>
                <p className='item__name'>{item.name}</p>
            </Link>
        ))
    }

    return (
        <div className='featured'>
            <h1 className='featured__title'>{message}</h1>
            <div className='featured__playlists'>{displayPlaylists}</div>
        </div>
    );
};

export default Featured;