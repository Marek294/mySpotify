import React, { Component } from 'react';
import { connect } from 'react-redux';
import Range from '../../components/Range/Range';
import CurrentlyPlaying from '../../components/CurrentlyPlaying/CurrentlyPlaying';
import { play, pause, previous, next } from '../../actions/player';

import './Playback.css';

class Playback extends Component {
    state = {
        is_playing: '',
        volume_percent: 0,
        progress_ms: 0,
        duration_ms: 0,
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

    displayTime(time_ms) {
        const minute = 1000 * 60;
        const seconds = parseInt(time_ms % minute / 1000, 10);
        const minutes = parseInt(time_ms / minute, 10);

        return seconds < 10 ? minutes+':0'+seconds : minutes+':'+seconds;
    }

    changeProgress = () => {
        const { progress_ms } = this.state;

        this.setState({
            progress_ms: progress_ms+200
        })
    }

    startTimer = () => {
        const { trackTimer } = this.state;

        if(!trackTimer) {
            this.setState({
                trackTimer: setInterval(this.changeProgress, 200)
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
        const { volume_percent, progress_ms, duration_ms, is_playing } = this.state;
        const { trackData } = this.props;

        return (
            <div className='playback'>
                <div className='playback__leftside'>
                    <CurrentlyPlaying trackData={trackData} />
                </div>
                <div className='playback__center'>
                    <div className='center__buttons'>
                        <button onClick={this.previousTrack} className='buttons__button'><i className="button__icon fas fa-step-backward"></i></button>
                        { !is_playing && <button onClick={this.tooglePlay} className='buttons__button buttons__button--play'><i className="button__icon fas fa-play"></i></button>}
                        { is_playing && <button onClick={this.tooglePlay} className='buttons__button buttons__button--play'><i className="button__icon fas fa-pause"></i></button>}
                        <button onClick={this.nextTrack} className='buttons__button'><i className="button__icon fas fa-step-forward"></i></button>
                    </div>
                    <div className='center__timer'>
                    <p className='timer__time'>{this.displayTime(progress_ms)}</p>
                    <Range max={duration_ms} width='100%' value={progress_ms} onChange={this.changePosition} onMouseUp={this.seek} />
                    <p className='timer__time'>{this.displayTime(duration_ms)}</p>
                    </div>
                </div>
                <div className='playback__rightside'>
                    <i className='rightside__volumeIcon fas fa-volume-up'></i>
                    <Range max={100} width='150px' value={volume_percent} onChange={this.changeVolume} />
                </div>
            </div>
        );
    }
}

export default connect(null, { play, pause, previous, next })(Playback);