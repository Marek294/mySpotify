import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import './Sidebar.css';

function getPath(path) {
    return path.match(/\w+/)[0];
}

class Sidebar extends Component {
    render() {
        const { location } = this.props;

        const active = getPath(location.pathname);

        return (
            <div className='sidebar'>
                <img src='Spotify_Icon_RGB_White.png' alt='' className='sidebar__icon' />
                <div className='sidebar__breakline' ></div>
                <Link to='/search' name='search' className={classnames('sidebar__link sidebar__link--bold', active==='search' && 'sidebar__link--active')} >Szukaj</Link>
                <div className='sidebar__breakline' ></div>
                <ul className='sidebar__list'>
                    <li className='list__item'><Link to='/browse' name='home' className={classnames('sidebar__link sidebar__link--bold', active==='browse' && 'sidebar__link--active')} >Home</Link></li>
                    <li className='list__item'><Link to='/collection' name='mymusic' className={classnames('sidebar__link sidebar__link--bold', active==='collection' && 'sidebar__link--active')} >Twoja muzyka</Link></li>
                </ul>
                <div className='sidebar__breakline' ></div>
                <p className='sidebar__title'>Ostatnio odtwarzane</p>
            </div>
        );
    }
}

export default Sidebar;