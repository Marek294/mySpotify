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
            const scrollDirection = 'scrollLeft';

            const name = e.target.innerHTML;
            e.target.innerHTML = name + ' ' + name;

            const duration = 1000/49.6 * (element.scrollWidth - element.offsetWidth);  //49.6px per sec

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
        const { trackData } = this.props;
    
        let images,
            artists,
            displayArtists,
            name,
            display = true;

        if(Object.keys(trackData).length > 0) {
            ({ images, artists, name } = trackData)
        } else display = false;

        displayArtists = 
            artists ? artists.map((item,i) => {
                return item.name;
            }) : null;

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