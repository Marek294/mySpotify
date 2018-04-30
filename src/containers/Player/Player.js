import React, { Component } from 'react';
import { connect } from 'react-redux';
import Desktop from './Desktop/Desktop';
import Mobile from './Mobile/Mobile';
import Loader from '../../components/Loader/Spinner';
import isMobile from '../../utils/isMobile';
import { getPlayer, play, pause, currentlyPlaying, boundPushState } from '../../actions/player';
import { logout } from '../../actions/auth';
import { getUserSavedTracks } from '../../actions/tracks';

async function waitForSpotifyWebPlaybackSDKToLoad () {
    return new Promise(resolve => {
        if (window.Spotify) {
            resolve(window.Spotify);
        } else {
            window.onSpotifyWebPlaybackSDKReady = () => {
                resolve(window.Spotify);
            };
        }
    });
};

class Player extends Component {
    state = {
        player: {},
        trackData: {},
        device_id: '',
        state: null,
        volume: 0
    }

    componentDidMount() {
        (async () => {
            const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();

            const token = this.props.accessToken;
            const player = new Player({
                name: 'mySpotify Player',
                getOAuthToken: cb => { cb(token); }
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });

            player.addListener('authentication_error', ({ message }) => {
                this.props.logout();
                console.error(message); 
            });

            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => {
                (async () => {
                    const volume = await player.getVolume();
                    
                    this.getTrackData(player);

                    this.props.boundPushState(state);

                    this.setState({
                        state,
                        volume
                    });
                })();
            });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);

                (async () => {

                    this.getTrackData(player);
                    const currentlyPlaying = await this.props.currentlyPlaying();

                    this.setState({
                        player,
                        volume: player._options.volume,
                        currentlyPlaying
                    })
                })();
         
            });

            // Connect to the player!
            player.connect();

          })();
    }

    playSong = (context_uri, offset) => {
        const { 
            player: {
                _options: {
                    id : device_id
                }
            }
         } = this.state;

        this.props.play({ context_uri, offset }, device_id);
    };

    playContext = context_uri => {
        const { 
            player: {
                _options: {
                    id : device_id
                }
            },
            player,
            state
         } = this.state;

        if(state) {
            if(state.context.uri === context_uri) player.togglePlay();
            else this.props.play({ context_uri }, device_id);
        } else this.props.play({ context_uri }, device_id);
        
    };

    getTrackData = player => {
        (async ()=> {
            const state = await player.getCurrentState();
            const volume = await player.getVolume();
            const currentPlayer = await this.props.getPlayer();

            if(state) {
                const { 
                    paused,
                    track_window: {
                        current_track: { 
                            album: { images },
                            artists,
                            name,
                            duration_ms 
                        }
                    },
                    position: progress_ms
                } = state;

                const volume_percent = volume*100;

                this.setState({
                    trackData: {
                        is_playing: !paused,
                        images,
                        artists,
                        name,
                        duration_ms,
                        progress_ms,
                        volume_percent
                    }
                })

            } else {
                if(currentPlayer) {
                    const { 
                        is_playing,
                        item: { 
                            album: { images },
                            artists,
                            name,
                            duration_ms 
                        },
                        progress_ms,
                        device: {
                            volume_percent
                        } 
                    } = currentPlayer;

                    this.setState({
                        trackData: {
                            is_playing,
                            images,
                            artists,
                            name,
                            duration_ms,
                            progress_ms,
                            volume_percent
                        }
                    });

                }
            }
        })()
    }

    // getCurrentState = () => {
    //     const { player } = this.state;

    //     (async () => {

    //         const state = await player.getCurrentState();
    //         const volume = await player.getVolume();

    //         if(state) {
    //             const { 
    //                 paused,
    //                 track_window: {
    //                     current_track: { 
    //                         album: { images },
    //                         artists,
    //                         name,
    //                         duration_ms 
    //                     }
    //                 },
    //                 position: progress_ms
    //             } = state;

    //             const volume_percent = volume*100;

    //             this.setState({
    //                 trackData: {
    //                     is_playing: !paused,
    //                     images,
    //                     artists,
    //                     name,
    //                     duration_ms,
    //                     progress_ms,
    //                     volume_percent
    //                 }
    //             })
    //         }
    //     })()
    // }

    getVolume = () => {
        const { player } = this.state;

        player.getVolume()
            .then(volume => {
                this.setState({
                    volume: volume*100
                })
            })
    }

    setVolume = volume => {
        const { player } = this.state;

        player.setVolume(volume/100);
    }

    seek = progress => {
        const { player } = this.state;

        player.seek(progress);
    }

    togglePlay = context_uri => {
        const { player } = this.state;

        player.togglePlay();
    }

    nextTrack = () => {
        const { player } = this.state;

        player.nextTrack();
    }

    previousTrack = () => {
        const { player } = this.state;

        player.previousTrack();
    }

    render() {
        const { player, trackData } = this.state;
        const { location } = this.props;

        const props = {
            location,
            trackData,
            setVolume: this.setVolume,
            seek: this.seek,
            togglePlay: this.togglePlay,
            nextTrack: this.nextTrack,
            previousTrack: this.previousTrack,
            playContext: this.playContext,
            playSong: this.playSong,
        }

        return (
            Object.keys(player).length === 0 ? <Loader /> : 
                    isMobile() ? <Mobile {...props} /> : <Desktop {...props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken
    }
}

export default connect(mapStateToProps, { getUserSavedTracks, currentlyPlaying, getPlayer, play, pause, logout, boundPushState })(Player);