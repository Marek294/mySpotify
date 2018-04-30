import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, pause, previous, next } from '../../actions/player';
import isMobile from '../../utils/isMobile';
import Mobile from './Mobile/Mobile';
import Desktop from './Desktop/Desktop';

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

    togglePlay = () => {
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

        const props = {
            volume_percent,
            progress_ms,
            duration_ms,
            is_playing,
            trackData,
            previousTrack: this.previousTrack,
            nextTrack: this.nextTrack,
            togglePlay: this.togglePlay,
            changePosition: this.changePosition,
            seek: this.seek,
            displayTime: this.displayTime,
            changeVolume: this.changeVolume
        }

        return (
            isMobile() ? <Mobile {...props} /> : <Desktop {...props} />
        );
    }
}

export default connect(null, { play, pause, previous, next })(Playback);