import React, { Component } from 'react';
import { connect } from 'react-redux';
import { play, pause, previous, next } from '../../actions/player';

import classes from './Player.css';

class Player extends Component {
    state = {
        isPlaying: '',
        volume: 0,
        position: 0,
        duration: 0
    }

    componentWillReceiveProps(nextProps) {
        let { volume } = nextProps;
        const { position, duration } = nextProps.state;

        this.setState({
            position,
            duration,
            volume,
        })
    }

    changeVolume = e => {
        this.setState({
            volume: e.target.value
        })

        this.props.setVolume(e.target.value);
    }

    changePosition = e => {
        this.setState({
            position: parseInt(e.target.value, 10)
        })
    }

    seek = () => {
        const { position } = this.state;

        this.props.seek(position);
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
        const { volume, position, duration } = this.state;

        return (
            <div className={classes.Player}>
                <button onClick={this.previousTrack}>Previous</button>
                <button onClick={this.tooglePlay}>Play/Pause</button>
                <button onClick={this.nextTrack}>Next</button>
                <input name="volume" type="range" onChange={this.changeVolume} value={volume} />
                <input name="progress" type="range" min="0" max={duration} onChange={this.changePosition} onMouseUp={this.seek} value={position} />
            </div>
        );
    }
}

export default connect(null, { play, pause, previous, next })(Player);