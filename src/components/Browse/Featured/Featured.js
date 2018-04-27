import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import './Featured.css';

const Featured = (props) => {
    const { featured, playerState, playContext } = props;
    let message, playlists, displayPlaylists;

    if(Object.keys(featured).length) {
        ({
            message,
            playlists: {
                items : playlists
            }
        } = featured);

        let contextUri = '';
        let paused = '';

        if(playerState) {
            contextUri = playerState.context.uri;
            paused = playerState.paused;
        }

        displayPlaylists = playlists.map((item, i) => (
            <div key={i} className='playlists__item' >
                <div className='item__imageButton'>
                    <div className={classnames('item__imageContainer', (item.uri === contextUri && !paused)  && 'item__imageContainer--playing')}>
                        <img src={item.images[0].url} alt='' className='item__image' />
                        <Link to={`../user/spotify/playlist/${item.id}`} className='item__overlay'></Link>
                        { (item.uri === contextUri && !paused) && 
                            <button className='overlay__icon' onClick={context_uri => playContext(item.uri)}>
                                <i className='fas fa-pause'></i>
                            </button> 
                        }
                        { (item.uri !== contextUri || (item.uri === contextUri && paused)) &&
                            <button className='overlay__icon' onClick={context_uri => playContext(item.uri)}>
                                <i className='fas fa-play'></i>
                            </button>
                        }
                    </div>
                </div>
                <p className='item__name'>{item.name}</p>
            </div>
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