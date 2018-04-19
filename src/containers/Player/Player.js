import React, { Component } from 'react';
import { connect } from 'react-redux';
import Range from '../../components/Range/Range';
import CurrentlyPlaying from '../../components/CurrentlyPlaying/CurrentlyPlaying';
import { play, pause, previous, next } from '../../actions/player';

import './Player.css';

class Player extends Component {
    state = {
        is_playing: '',
        volume_percent: 0,
        position: 0,
        duration: 0,
        trackTimer: ''
    }

    componentDidMount() {
        const { trackData } = this.props;

        if(Object.keys(trackData).length > 0) {
            const { 
                is_playing, 
                volume_percent,
                progress_ms,
                duration_ms } = trackData;

            if(is_playing) this.startTimer();
            else this.stopTimer();

            this.setState({
                is_playing, 
                volume_percent,
                progress_ms,
                duration_ms
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { trackData } = nextProps;

        if(Object.keys(trackData).length > 0) {
            const { 
                is_playing, 
                volume_percent,
                progress_ms,
                duration_ms } = trackData;

            if(is_playing) this.startTimer();
            else this.stopTimer();

            this.setState({
                is_playing, 
                volume_percent,
                progress_ms,
                duration_ms
            });
        }
    }

    startTimer = () => {
        const { trackTimer } = this.state;

        if(!trackTimer) {
            this.setState({
                trackTimer: setInterval(this.props.getCurrentState, 200)
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

    changeVolume = value => {
        this.setState({
            volume_percent: value
        })

        this.props.setVolume(value);
    }

    changePosition = value => {
        this.stopTimer();

        this.setState({
            progress_ms: value
        })
    }

    seek = () => {
        const { progress_ms } = this.state;

        this.props.seek(progress_ms);

        this.startTimer();
    }

    tooglePlay = () => {
        this.props.togglePlay();
    }

    nextTrack = () => {
        this.props.nextTrack();
    }

    previousTrack = () => {
        this.props.previousTrack();
    }

    render() {
        const { volume_percent, progress_ms, duration_ms } = this.state;
        const { trackData } = this.props;

        return (
            <div className='player'>
                <div className='player__leftside'>
                    <CurrentlyPlaying trackData={trackData} />
                </div>
                <div className='player__center'>
                    <div className='center__buttons'>
                        <button onClick={this.previousTrack} className='buttons__button'><i className="button__icon fas fa-step-backward"></i></button>
                        <button onClick={this.tooglePlay} className='buttons__button buttons__button--play'><i className="button__icon fas fa-play"></i></button>
                        <button onClick={this.nextTrack} className='buttons__button'><i className="button__icon fas fa-step-forward"></i></button>
                    </div>
                    <Range max={duration_ms} width='100%' value={progress_ms} onChange={this.changePosition} onMouseUp={this.seek} />
                </div>
                <div className='player__rightside'>
                    <Range max={100} width='200px' value={volume_percent} onChange={this.changeVolume} />
                </div>
            </div>
        );
    }
}

export default connect(null, { play, pause, previous, next })(Player);