import React from 'react';
import Range from '../../../components/Range/Range';
import CurrentlyPlaying from '../../../components/CurrentlyPlaying/CurrentlyPlaying';

import './Mobile.css';

const Mobile = (props) => {
    const { trackData, duration_ms,progress_ms, volume_percent, is_playing } = props;

    return (
        <div className='mobile__playback'>
            <CurrentlyPlaying trackData={trackData} />
            <div className='mobile__playback__buttons'>
                <button onClick={props.previousTrack} className='mobile__buttons__button'><i className='mobile__button__icon fas fa-step-backward'></i></button>
                { !is_playing && <button onClick={props.togglePlay} className='mobile__buttons__button mobile__buttons__button--play'><i className='mobile__button__icon fas fa-play'></i></button>}
                { is_playing && <button onClick={props.togglePlay} className='mobile__buttons__button mobile__buttons__button--play'><i className='mobile__button__icon fas fa-pause'></i></button>}
                <button onClick={props.nextTrack} className='mobile__buttons__button'><i className='mobile__button__icon fas fa-step-forward'></i></button>
            </div>
            <div className='mobile__playback__timer'>
            <p className='mobile__timer__time'>{props.displayTime(progress_ms)}</p>
            <Range max={duration_ms} width='100%' value={progress_ms} onChange={props.changePosition} onMouseUp={props.seek} />
            <p className='mobile__timer__time'>{props.displayTime(duration_ms)}</p>
            </div>
        </div>
    );
};

export default Mobile;