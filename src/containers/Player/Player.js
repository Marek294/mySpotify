import React, { Component } from 'react';
import { connect } from 'react-redux';
import Range from '../../components/Range/Range';
import CurrentlyPlaying from '../../components/CurrentlyPlaying/CurrentlyPlaying';
import { play, pause, previous, next } from '../../actions/player';

import './Player.css';

class Player extends Component {
    state = {
        isPlaying: '',
        volume: 0,
        position: 0,
        duration: 0
    }

    componentDidMount() {
        let { volume, state, currentlyPlaying } = this.props;
        let position, duration;

        if(state) ({ position, duration } = state);
        if(currentlyPlaying) {
            const { progress_ms } = currentlyPlaying;
            position = progress_ms;

            const { item: { duration_ms} } = currentlyPlaying;
            duration = duration_ms;
        }

        this.setState({
            position,
            duration,
            volume,
        })
    }

    componentWillReceiveProps(nextProps) {
        let { volume, state, currentlyPlaying } = nextProps;
        let position, duration;

        if(state) ({ position, duration } = state);
        if(currentlyPlaying) {
            const { progress_ms } = currentlyPlaying;
            position = progress_ms;

            const { item: { duration_ms} } = currentlyPlaying;
            duration = duration_ms;
        }

        this.setState({
            position,
            duration,
            volume,
        })
    }

    changeVolume = value => {
        this.setState({
            volume: value
        })

        this.props.setVolume(value);
    }

    changePosition = value => {
        this.setState({
            position: value
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
        const { currentlyPlaying, state } = this.props;

        console.log(position, duration, currentlyPlaying);

        return (
            <div className='player'>
                <div className='player__leftside'>
                    <CurrentlyPlaying currentlyPlaying={currentlyPlaying} state={state} />
                </div>
                <div className='player__center'>
                    <div className='center__buttons'>
                        <button onClick={this.previousTrack} className='buttons__button'><i className="button__icon fas fa-step-backward"></i></button>
                        <button onClick={this.tooglePlay} className='buttons__button buttons__button--play'><i className="button__icon fas fa-play"></i></button>
                        <button onClick={this.nextTrack} className='buttons__button'><i className="button__icon fas fa-step-forward"></i></button>
                    </div>
                    <Range max={duration} width='100%' value={position} onChange={this.changePosition} onMouseUp={this.seek} />
                </div>
                <div className='player__rightside'>
                    <Range max={100} width='200px' value={volume} onChange={this.changeVolume} />
                </div>
            </div>
        );
    }
}

export default connect(null, { play, pause, previous, next })(Player);