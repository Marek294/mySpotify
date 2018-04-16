import api from '../api';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';

export const userLoggedIn = (data) => ({
    type: USER_LOGGED_IN,
    data
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

export const login = () => dispatch => {
    return api.User.login().then(data => {
        localStorage.mySpotifyAccessToken = data.accessToken;
        localStorage.mySpotifyRefreshToken = data.refreshToken;
        setAuthorizationToken(data.accessToken)
        return dispatch(userLoggedIn(data));
    })
}

export const logout = () => dispatch => {
    localStorage.removeItem('mySpotifyAccessToken');
    localStorage.removeItem('mySpotifyRefreshToken');
    setAuthorizationToken();
    return dispatch(userLoggedOut());
}