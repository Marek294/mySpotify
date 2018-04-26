import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylist } from '../../actions/playlist';

import './Playlist.css';

class Playlist extends Component {
    state = {
        playlist: {},
        display: false
    }

    componentWillMount() {
        const { 
            match: {
                params: {
                    id
                }
            } 
        } = this.props;

        (async () => {
            const playlist = await this.props.getPlaylist(id);

            if(Object.keys(playlist).length) {

                this.props.playSong(playlist.uri);

                this.setState({
                    playlist,
                    display: true
                })
            }
        })()
    }

    displayDuration(duration_ms) {
        const minute = 1000 * 60;
        const seconds = parseInt(duration_ms % minute / 1000, 10);
        const minutes = parseInt(duration_ms / minute, 10);

        return seconds < 10 ? minutes+':0'+seconds : minutes+':'+seconds;
    }

    render() {
        const { playlist, display } = this.state;

        let name, description, images, owner, tracks, tracksDisplay;

        if(display) {
            ({
                name,
                description,
                images,
                owner,
                tracks
            } = playlist)

            tracksDisplay = tracks.items.map((item,i) => {
                const { track } = item;

                const {
                    album: {
                        name : albumName
                    },
                    name,
                    artists,
                    duration_ms
                } = track;

                const displayArtists = artists.map(item => {
                    return item.name;
                }).join(', ');
                
                return (
                    <li key={i} className='tracks__track'>
                        <div className='track__info'>
                            <h2 className='track__name'>{name}</h2>
                            <p className='track__artistsAlbum'>{displayArtists} &bull; {albumName}</p>
                        </div>
                        <p className='track__duration'>{this.displayDuration(duration_ms)}</p>
                    </li>
                )
            })
        }

        return (
            display &&
            <div className='playlist'>
                <div className='playlist__info'>
                    <img src={images[0].url} alt ='' className='info__image' />
                    <h2 className='info__title'>{name}</h2>
                    <p className='info__font14 info__owner'>{owner.display_name}</p>
                    <p className='info__font14 info__description'>{description}</p>
                    <p className='info__font14 info__tracksNumber'>Utworów: {tracks.total}</p>
                </div>
                <ul className='playlist__tracks'>
                    {tracksDisplay}
                </ul>
            </div>
        )
    }
}

export default connect(null, { getPlaylist })(Playlist);