import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylist } from '../../actions/playlist';
import isMobile from '../../utils/isMobile';
import Desktop from './Desktop/Desktop';
import Mobile from './Mobile/Mobile';

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
                        id,
                        linked_from
                    }
                }
            } = playerState;

            const { currentlyPlayingId } = prevState;


            if(linked_from.id && linked_from.id !== currentlyPlayingId) {
                return {
                    currentlyPlayingId: linked_from.id
                }
            }

            if(!linked_from.id && id !== currentlyPlayingId) {
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

        let name, description, images, owner, tracks;

        if(display) {
            ({
                name,
                description,
                images,
                owner,
                tracks
            } = playlist)
        }

        const props = {
            name,
            description,
            images,
            owner,
            tracks,
            currentlyPlayingId,
            displayDuration: this.displayDuration,
            playSong: this.playSong
        }

        return (
            display &&
                (isMobile() ? <Mobile {...props} /> : <Desktop {...props} />)
        )
    }
}

const mapStateToProps = state => {
    return {
        playerState: state.playerState
    }
}

export default connect(mapStateToProps, { getPlaylist })(Playlist);