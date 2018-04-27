import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import Browse from '../Browse/Browse';
import Collection from '../Collection/Collection';
import Playback from '../Playback/Playback';
import Sidebar from '../../components/Sidebar/Sidebar';
import Playlist from '../../containers/Playlist/Playlist';
import Loader from '../../components/Loader/Spinner';
import { getPlayer, play, pause, currentlyPlaying, boundPushState } from '../../actions/player';
import { logout } from '../../actions/auth';
import { getUserSavedTracks } from '../../actions/tracks';

import './Player.css';

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

        return (
            Object.keys(player).length === 0 ? <Loader /> : 
                <div className='player'>
                    <Sidebar location={location} />
                    <Playback
                        trackData={trackData}
                        setVolume={this.setVolume}
                        seek={this.seek}
                        togglePlay={this.togglePlay}
                        nextTrack={this.nextTrack}
                        // getCurrentState={this.getCurrentState}
                        previousTrack={this.previousTrack} />

                    <div className="player__content">
                    <Switch>
                        <Route path='/browse' render={props => <Browse {...props} playContext={this.playContext} />} />
                        <Route path='/collection' component={Collection} />
                        <Route path='/user/spotify/playlist/:id' render={props => <Playlist {...props} playSong={this.playSong} />} />
                        <Redirect to='/browse' />
                    </Switch>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken
    }
}

export default connect(mapStateToProps, { getUserSavedTracks, currentlyPlaying, getPlayer, play, pause, logout, boundPushState })(Player);