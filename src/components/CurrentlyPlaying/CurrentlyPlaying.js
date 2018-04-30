import React, { Component } from 'react';
import scrollTo from '../../utils/scrollToAnimate';
import isMobile from '../../utils/isMobile';
import Mobile from './Mobile/Mobile';
import Desktop from './Desktop/Desktop';

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

        const props = {
            images,
            displayArtists,
            name
        }

        return (
            display &&
                (isMobile() ? <Mobile {...props} /> : <Desktop {...props} />)
        );
    }
}

export default CurrentlyPlaying;