import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getPlaylist } from '../../actions/playlist';

import './Playlist.css';

class Playlist extends Component {
    state = {
        playlist: {},
        display: false,
        currentlyPlayingId: ''
    }

    componentDidMount() {
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

                this.setState({
                    playlist,
                    display: true
                })
            }
        })()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { playerState } = nextProps;

        if(playerState) {
            const { 
                track_window: {
                    current_track: {
                        id
                    }
                }
            } = playerState;

            const { currentlyPlayingId } = prevState;

            if(id !== currentlyPlayingId) {
                return {
                    currentlyPlayingId: id
                }
            }
            return null;
        }
        
        return {
            currentlyPlayingId: ''
        };
    }

    displayDuration(duration_ms) {
        const minute = 1000 * 60;
        const seconds = parseInt(duration_ms % minute / 1000, 10);
        const minutes = parseInt(duration_ms / minute, 10);

        return seconds < 10 ? minutes+':0'+seconds : minutes+':'+seconds;
    }

    playSong = position => {
        const { 
            playlist: {
                uri
            }
        } = this.state;

        const offset = {
            position
        };

        this.props.playSong(uri, offset);
    }

    render() {
        const { playlist, display, currentlyPlayingId } = this.state;

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
                        name : albumName,
                        id : albumId
                    },
                    name,
                    artists,
                    duration_ms,
                    id
                } = track;

                const displayArtists = artists.map((item,i) => {
                    return (<Link to={`/artist/${item.id}`} key={i} className='artistsAlbum__item' >{item.name}</Link>);
                });
                

                return (
                    <li key={i} className='tracks__track' onDoubleClick={position => this.playSong(i)}>
                        <div className='track__info'>
                            <h2 className={classnames('track__name',id === currentlyPlayingId && 'track__name--playing')}>{name}</h2>
                            <div className='track__artistsAlbum'>
                                <ul className='artistsAlbum__artists'>{displayArtists}</ul>
                                <p className='artistsAlbum__separator'>&bull;</p>
                                <Link to={`/album/${albumId}`} className='artistsAlbum__item'>{albumName}</Link>
                            </div>
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

const mapStateToProps = state => {
    return {
        playerState: state.playerState
    }
}

export default connect(mapStateToProps, { getPlaylist })(Playlist);