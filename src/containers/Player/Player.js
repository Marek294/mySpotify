import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import UserRoute from '../../routes/UserRoute';
import Browse from '../Browse/Browse';
import Collection from '../Collection/Collection';
import Playback from '../Playback/Playback';
import Sidebar from '../Sidebar/Sidebar';
import Loader from '../../components/Loader/Spinner';
import { getPlayer, play, currentlyPlaying } from '../../actions/player';
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
        state: {},
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

                    const savedTracks = await this.props.getUserSavedTracks();

                    this.getTrackData(player);
                    const currentlyPlaying = await this.props.currentlyPlaying();

                    const uris = savedTracks.items.map(item => {
                        return item.track.uri;
                    })

                    // this.playSong({
                    //     uris,
                    //     playerInstance: player
                    // });

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

    playSong = ({
        uris,
        playerInstance: {
            _options: {
            getOAuthToken,
            id
            }
        }}) => {
            getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
                method: 'PUT',
                body: JSON.stringify({ uris }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                });
            });
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

    getCurrentState = () => {
        const { player } = this.state;

        (async () => {

            const state = await player.getCurrentState();
            const volume = await player.getVolume();

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
            }
        })()
    }

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

    togglePlay = () => {
        const { player } = this.state;

        player.togglePlay();
    }

    nextTrack = () => {
        const { player } = this.state;

        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
        });
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
                        getCurrentState={this.getCurrentState}
                        previousTrack={this.previousTrack} />

                    <div className="player__content">
                    <Switch>
                        <UserRoute path='/browse' component={Browse} />
                        <UserRoute path='/collection' component={Collection} />
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

export default connect(mapStateToProps, { getUserSavedTracks, currentlyPlaying, getPlayer, play, logout })(Player);