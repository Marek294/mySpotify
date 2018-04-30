import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Browse from '../../Browse/Browse';
import Collection from '../../Collection/Collection';
import Playback from '../../Playback/Playback';
import Playlist from '../../Playlist/Playlist';
import MobileNav from '../../../components/Navigation/MobileNav/MobileNav';

import './Mobile.css';

const Mobile = (props) => {
    const { location, trackData, playSong, playContext } = props;

    return (
        <div className='mobile__player'>
            <MobileNav location={location} />
            <Playback
                trackData={trackData}
                setVolume={props.setVolume}
                seek={props.seek}
                togglePlay={props.togglePlay}
                nextTrack={props.nextTrack}
                previousTrack={props.previousTrack} />

            <div className='mobile__player__content'>
            <Switch>
                <Route path='/browse' render={props => <Browse {...props} playContext={playContext} />} />
                <Route path='/collection' component={Collection} />
                <Route path='/user/spotify/playlist/:id' render={props => <Playlist {...props} playSong={playSong} />} />
                <Redirect to='/browse' />
            </Switch>
            </div>
        </div>
    );
};

export default Mobile;