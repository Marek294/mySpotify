import React, { Component } from 'react';
import querystring from 'querystring';
import Background from '../../components/Background/Background';

import classes from './HomePage.css';

class HomePage extends Component {
    // generateRandomString(length) {
    //     var text = '';
    //     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
    //     for (var i = 0; i < length; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     return text;
    // };

    login = () => {
        // const state = this.generateRandomString(16);

        // your application requests authorization
        var scope = 'user-read-private user-read-email user-read-playback-state';
        window.location = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: '01d4a52817f5479885eaa683dfb61d87',
                scope: scope,
                redirect_uri: 'http://localhost:3000/callback',
                // state: state
            });
    }

    render() {
        return (
            <section className={classes.HomePage} >
                <Background />
                <div className={classes.Content}>
                    <h1>Muzyka bliżej ciebie</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <a href="http://localhost:8888/login"><button>Zaloguj się</button></a>
                </div>
            </section>
        );
    }
}

export default HomePage;