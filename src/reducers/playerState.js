import { STATE_PUSHED } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case STATE_PUSHED:
            return action.state
        default:
            return state;
    }
};