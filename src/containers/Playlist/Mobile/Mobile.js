import React from 'react';
import classnames from 'classnames';

import './Mobile.css';

const Mobile = (props) => {
    const { tracks, currentlyPlayingId, images, name, owner, description } = props;

    const tracksDisplay =  tracks.items.map((item,i) => {
        const { track } = item;

        const {
            album: {
                name : albumName,
                id : albumId
            },
            name,
            artists,
            duration_ms,
            id
        } = track;

        const displayArtists = artists.map((item,i) => {
            return (<p to={`/artist/${item.id}`} key={i} className='mobile__artistsAlbum__item' >{item.name}</p>);
        });
        
        return (
            <li key={i} className='mobile__tracks__track' onClick={position => props.playSong(i)}>
                <div className='mobile__track__info'>
                    <h2 className={classnames('mobile__track__name',id === currentlyPlayingId && 'mobile__track__name--playing')}>{name}</h2>
                    <div className='mobile__track__artistsAlbum'>
                        <ul className='mobile__artistsAlbum__artists'>{displayArtists}</ul>
                        <p className='mobile__artistsAlbum__separator'>&bull;</p>
                        <p to={`/album/${albumId}`} className='mobile__artistsAlbum__item'>{albumName}</p>
                    </div>
                </div>
                <p className='mobile__track__duration'>{props.displayDuration(duration_ms)}</p>
            </li>
        )
    })


    return (
        <div className='mobile__playlist'>
            <div className='mobile__playlist__info'>
                <img src={images[0].url} alt ='' className='mobile__info__image' />
                <h2 className='mobile__info__title'>{name}</h2>
                <p className='mobile__info__font14 mobile__info__owner'>{owner.display_name}</p>
                <p className='mobile__info__font14 mobile__info__description'>{description}</p>
                <p className='mobile__info__font14 mobile__info__tracksNumber'>Utworów: {tracks.total}</p>
            </div>
            <ul className='mobile__playlist__tracks'>
                {tracksDisplay}
            </ul>
        </div>
    );
};

export default Mobile;