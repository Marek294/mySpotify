import React, { Component } from 'react';
import { Redirect, Switch, Link } from 'react-router-dom';
import classnames from 'classnames';
import UserRoute from '../../routes/UserRoute';
import Featured from './Featured/Featured';
import Genres from './Genres/Genres';
import NewReleases from './NewReleases/NewReleases';
import Discover from './Discover/Discover';

import './Browse.css';

function getPath(path) {
    return path.match(/\w+$/)[0];
}

class Browse extends Component {
    render() {
        const { match, location } = this.props;

        const active = getPath(location.pathname);

        return (
            <React.Fragment>
            <div className='browse'>
               <ul className='browse__nav'>
                <li className='nav__item'><Link to={`${match.url}/featured`} className={classnames('item__link', active==='featured' && 'item__link--active')}>Wybrane</Link></li>
                <li className='nav__item'><Link to={`${match.url}/genres`} className={classnames('item__link', active==='genres' && 'item__link--active')}>Gatunki i nastroje</Link></li>
                <li className='nav__item'><Link to={`${match.url}/newreleases`} className={classnames('item__link', active==='newreleases' && 'item__link--active')}>Nowe wydania</Link></li>
                <li className='nav__item'><Link to={`${match.url}/discover`} className={classnames('item__link', active==='discover' && 'item__link--active')}>Odkrywaj</Link></li>
               </ul>
            </div>
            <Switch>
                <UserRoute exact path={`${match.url}/featured`} component={Featured} />
                <UserRoute exact path={`${match.url}/genres`} component={Genres} />
                <UserRoute exact path={`${match.url}/newreleases`} component={NewReleases} />
                <UserRoute exact path={`${match.url}/discover`} component={Discover} />
                <Redirect to='/browse/featured' />
            </Switch>
            </React.Fragment>
        );
    }
}

export default Browse;