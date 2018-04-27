import { combineReducers } from 'redux';

import token from './reducers/token';
import playerState from './reducers/playerState';

export default combineReducers({
    token,
    playerState
});