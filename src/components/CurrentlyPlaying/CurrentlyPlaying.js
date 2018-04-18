import React, { Component } from 'react';
import scrollTo from '../../utils/scrollToAnimate';

import './CurrentlyPlaying.css';

class CurrentlyPlaying extends Component {
    state = {
        animateTitle: false
    }

    onMouseOver = e => {
        const { animateTitle } = this.state;

        if(e.target.scrollWidth > e.target.offsetWidth && !animateTitle) {
            this.setState({
                animateTitle: true
            })

            const element = e.target;
            const to = e.target.scrollWidth;
            const duration = 5000;
            const scrollDirection = 'scrollLeft';

            const name = e.target.innerHTML;
            e.target.innerHTML = name + ' ' + name;

            scrollTo({
                element,
                to,
                duration,
                scrollDirection
            }).then(element => {
                element.innerHTML = name;
                element.scrollLeft = 0;

                this.setState({
                    animateTitle: false
                })
            })
        }
    }

    render() {
        const { currentlyPlaying, state } = this.props;
    
        let item,
            display = true;

        if(currentlyPlaying) ({ item } = currentlyPlaying);
        if(state.track_window) item = state.track_window.current_track;
        if(!currentlyPlaying && !state.track_window) display = false;


        let displayArtists;
        let name, artists;
        let images;

        if(display) {
            ({ name, artists, album: { images } } = item);

            displayArtists = artists ? artists.map((item,i) => {
                return item.name;
            }) : null;

        }

        return (
            display ?
            <div className='currentlyplaying'>
                <img src={images[0].url} alt="" className='currentlyplaying__image' />
                <div className='currentlyplaying__track' >
                <p className='track__name' onMouseOver={this.onMouseOver}>{name}</p>
                <p className='track__artists'>{displayArtists.join(', ')}</p>
                </div>
            </div> : null
        );
    }
}

export default CurrentlyPlaying;