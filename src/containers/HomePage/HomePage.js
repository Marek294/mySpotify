import React, { Component } from 'react';
import Background from '../../components/Background/Background';

import classes from './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className={classes.HomePage}>
                <Background />
                <div className={classes.Content}>
                    <h1>Muzyka bliżej ciebie</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button>Zaloguj się</button>
                </div>
            </div>
        );
    }
}

export default HomePage;