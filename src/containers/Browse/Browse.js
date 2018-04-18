import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from '../Player/Player';
import Loader from '../../components/Loader/Spinner';
import { getPlayer, play, currentlyPlaying } from '../../actions/player';
import { logout } from '../../actions/auth';
import { getUserSavedTracks } from '../../actions/tracks';

import classes from './Browse.css';

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

class Browse extends Component {
    state = {
        player: {},
        device_id: '',
        state: {},
        volume: 0,
        trackTimer: ''
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
                // if( state.paused ) this.stopTimer();
                // else this.startTimer();

                this.setState({
                    state
                });
            });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);


                (async () => {

                    const savedTracks = await this.props.getUserSavedTracks();
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
                        volume: player._options.volume*100,
                        currentlyPlaying
                    })
                })();
         
            });

            // Connect to the player!
            player.connect();

          })();
    }
    

    // playSong = (body) => {
    //     this.props.play(body);
    // }

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
      
    startTimer = () => {
        const { trackTimer } = this.state;

        if(!trackTimer) {
            this.setState({
                trackTimer: setInterval(this.getCurrentState, 1000)
            })
        }
    }

    stopTimer = () => {
        const { trackTimer } = this.state;

        clearInterval(trackTimer);

        this.setState({
            trackTimer: ''
        })
    }

    getCurrentState = () => {
        const { player } = this.state;

        const p1 = player.getCurrentState()
        const p2 = player.getVolume()

        Promise.all([p1, p2])
            .then(values => {
                if (!values[0]) {
                    console.error('User is not playing music through the Web Playback SDK');
                    return;
                  } else {
                      this.setState({
                          state: values[0],
                          volume: values[1]*100
                      });
                  }
            })

        // player.getCurrentState().then(state => {
        //     if (!state) {
        //       console.error('User is not playing music through the Web Playback SDK');
        //       return;
        //     } else {
        //         this.setState({
        //             state
        //         });
        //     }
        //   });
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
        const { player, state, volume, currentlyPlaying } = this.state;

        return (
            <React.Fragment>

            { Object.keys(player).length === 0 ? <Loader /> : 
                <div className={classes.Browse}>
                    <Player
                        state={state}
                        player={player}
                        setVolume={this.setVolume}
                        seek={this.seek}
                        togglePlay={this.togglePlay}
                        nextTrack={this.nextTrack}
                        previousTrack={this.previousTrack}
                        volume={volume}
                        currentlyPlaying={currentlyPlaying} />
                </div> }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.token.accessToken
    }
}

export default connect(mapStateToProps, { getUserSavedTracks, currentlyPlaying, getPlayer, play, logout })(Browse);