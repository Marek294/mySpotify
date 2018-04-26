import React, { Component } from 'react';
import { Redirect, Switch, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Featured from '../../components/Browse/Featured/Featured';
import Genres from '../../components/Browse/Genres/Genres';
import NewReleases from '../../components/Browse/NewReleases/NewReleases';
import Discover from '../../components/Browse/Discover/Discover';
import { getFeatured } from '../../actions/browse';

import './Browse.css';

function getPath(path) {
    return path.match(/\w+$/)[0];
}

class Browse extends Component {
    state = {
        featured: {}
    }

    componentDidMount() {
        ( async () => {

            const featured = await this.props.getFeatured();

            this.setState({
                featured
            });

        })()
    }

    render() {
        const { match, location } = this.props;
        const { featured } = this.state;

        const active = getPath(location.pathname);

        return (
            <div className='browse'>
               <ul className='browse__nav'>
                <li className='nav__item'><Link to={`${match.url}/featured`} className={classnames('item__link', active==='featured' && 'item__link--active')}>Wybrane</Link></li>
                <li className='nav__item'><Link to={`${match.url}/genres`} className={classnames('item__link', active==='genres' && 'item__link--active')}>Gatunki i nastroje</Link></li>
                <li className='nav__item'><Link to={`${match.url}/newreleases`} className={classnames('item__link', active==='newreleases' && 'item__link--active')}>Nowe wydania</Link></li>
                <li className='nav__item'><Link to={`${match.url}/discover`} className={classnames('item__link', active==='discover' && 'item__link--active')}>Odkrywaj</Link></li>
               </ul>
                <div className='browse__content'>
                    <Switch>
                        <Route exact path={`${match.url}/featured`} render={props => (<Featured {...props} featured={featured} />)} />
                        <Route exact path={`${match.url}/genres`} component={Genres} />
                        <Route exact path={`${match.url}/newreleases`} component={NewReleases} />
                        <Route exact path={`${match.url}/discover`} component={Discover} />
                        <Redirect to='/browse/featured' />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect(null, { getFeatured })(Browse);