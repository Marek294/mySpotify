import React from 'react';
import classnames from 'classnames';
import  { Link } from 'react-router-dom';
import isMobile from '../../../utils/isMobile';

import './Desktop.css';

const Desktop = (props) => {
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
            return (<Link to={`/artist/${item.id}`} key={i} className='desktop__artistsAlbum__item' >{item.name}</Link>);
        });
        
        return (
            <li key={i} className='desktop__tracks__track' onDoubleClick={position => props.playSong(i)}>
                <div className='desktop__track__info'>
                    <h2 className={classnames('desktop__track__name',id === currentlyPlayingId && 'desktop__track__name--playing')}>{name}</h2>
                    <div className='desktop__track__artistsAlbum'>
                        <ul className='desktop__artistsAlbum__artists'>{displayArtists}</ul>
                        <p className='desktop__artistsAlbum__separator'>&bull;</p>
                        <Link to={`/album/${albumId}`} className='desktop__artistsAlbum__item'>{albumName}</Link>
                    </div>
                </div>
                <p className='desktop__track__duration'>{props.displayDuration(duration_ms)}</p>
            </li>
        )
    })


    return (
        <div className='desktop__playlist'>
            <div className='desktop__playlist__info'>
                <img src={images[0].url} alt ='' className='desktop__info__image' />
                <h2 className='desktop__info__title'>{name}</h2>
                <p className='desktop__info__font14 info__owner'>{owner.display_name}</p>
                <p className='desktop__info__font14 info__description'>{description}</p>
                <p className='desktop__info__font14 info__tracksNumber'>Utworów: {tracks.total}</p>
            </div>
            <ul className='desktop__playlist__tracks'>
                {tracksDisplay}
            </ul>
        </div>
    );
};

export default Desktop;