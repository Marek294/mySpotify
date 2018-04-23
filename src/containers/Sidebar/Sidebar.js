import React, { Component } from 'react';
import classnames from 'classnames';

import './Sidebar.css';

class Sidebar extends Component {
    state = {
        active: 'home'
    }

    onClick = e => {
        this.setState({ active: e.target.name })
    }

    render() {
        const { active } = this.state;
        console.log(active);
        return (
            <div className='sidebar'>
                <img src='Spotify_Icon_RGB_White.png' alt='' className='sidebar__icon' />
                <div className='sidebar__breakline' ></div>
                <a name='search' className={classnames('sidebar__link sidebar__link--bold', active==='search' && 'sidebar__link--active')} onClick={this.onClick} >Szukaj</a>
                <div className='sidebar__breakline' ></div>
                <ul className='sidebar__list'>
                    <li className='list__item'><a name='home' className={classnames('sidebar__link sidebar__link--bold', active==='home' && 'sidebar__link--active')} onClick={this.onClick} >Home</a></li>
                    <li className='list__item'><a name='mymusic' className={classnames('sidebar__link sidebar__link--bold', active==='mymusic' && 'sidebar__link--active')} onClick={this.onClick} >Twoja muzyka</a></li>
                </ul>
                <div className='sidebar__breakline' ></div>
                <p className='sidebar__title'>Ostatnio odtwarzane</p>
            </div>
        );
    }
}

export default Sidebar;