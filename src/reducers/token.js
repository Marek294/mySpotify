import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken
            }
        case USER_LOGGED_OUT:
            return {};
        default:
            return state;
    }
};