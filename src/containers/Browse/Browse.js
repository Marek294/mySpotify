import React, { Component } from 'react';

import classes from './Browse.css';

class Browse extends Component {
    constructor(props) {
        super(props);

        const params = this.getHashParams();
        console.log(params);

        this.state = {
            loggedIn: !!params.access_token,
            accessToken: params.access_token
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    render() {
        const { loggedIn, accessToken } = this.state;
        console.log(this.state);
        return (
            <div>
                <h1>Hello from Spotify</h1>
                <p>Logged in: {`${loggedIn}`}</p>
                <p>Access token: {accessToken}</p>
            </div>
        );
    }
}

export default Browse;