import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import './MobileNav.css';

function getPath(path) {
    return path.match(/\w+/)[0];
}

class MobileNav extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerOpenedHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    render() {
        const { location } = this.props;

        const active = getPath(location.pathname);

        return (
            <div className='mobile__player__nav'>
                <Link to='/browse' className={classnames('player__nav__item', active==='browse' && 'player__nav__item--active')} >
                    <i className='player__nav__item__icon fas fa-home'></i>
                    <p className='player__nav__item__name'>Home</p>
                </Link>
                <Link to='/collection' className={classnames('player__nav__item', active==='collection' && 'player__nav__item--active')} >
                    <i className='player__nav__item__icon fas fa-music'></i>
                    <p className='player__nav__item__name'>Twoja muzyka</p>
                </Link>
                <Link to='/search' className={classnames('player__nav__item', active==='search' && 'player__nav__item--active')} >
                    <i className='player__nav__item__icon fas fa-search'></i>
                    <p className='player__nav__item__name'>Szukaj</p>
                </Link>
            </div>
        );
    }
}

export default MobileNav;