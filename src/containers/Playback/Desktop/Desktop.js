import React from 'react';
import Range from '../../../components/Range/Range';
import CurrentlyPlaying from '../../../components/CurrentlyPlaying/CurrentlyPlaying';

import './Desktop.css';

const Desktop = (props) => {
    const { trackData, duration_ms,progress_ms, volume_percent, is_playing } = props;

    return (
        <div className='desktop__playback'>
            <div className='desktop__playback__leftside'>
                <CurrentlyPlaying trackData={trackData} />
            </div>
            <div className='desktop__playback__center'>
                <div className='desktop__center__buttons'>
                    <button onClick={props.previousTrack} className='desktop__buttons__button'><i className='desktop__button__icon fas fa-step-backward'></i></button>
                    { !is_playing && <button onClick={props.togglePlay} className='desktop__buttons__button desktop__buttons__button--play'><i className='desktop__button__icon fas fa-play'></i></button>}
                    { is_playing && <button onClick={props.togglePlay} className='desktop__buttons__button desktop__buttons__button--play'><i className='desktop__button__icon fas fa-pause'></i></button>}
                    <button onClick={props.nextTrack} className='desktop__buttons__button'><i className='desktop__button__icon fas fa-step-forward'></i></button>
                </div>
                <div className='desktop__center__timer'>
                <p className='desktop__timer__time'>{props.displayTime(progress_ms)}</p>
                <Range max={duration_ms} width='100%' value={progress_ms} onChange={props.changePosition} onMouseUp={props.seek} />
                <p className='desktop__timer__time'>{props.displayTime(duration_ms)}</p>
                </div>
            </div>
            <div className='desktop__playback__rightside'>
                <i className='desktop__rightside__volumeIcon fas fa-volume-up'></i>
                <Range max={100} width='150px' value={volume_percent} onChange={props.changeVolume} />
            </div>
        </div>
    );
};

export default Desktop;