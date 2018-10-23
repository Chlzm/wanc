import {
    GET_COUNT,
} from '../actions/message';

export const message = (state = {
    count: 0,
}, action) => {
    switch (action.type) {
        case `${GET_COUNT}_SUCCESS`:
            return Object.assign({}, state, {count: action.payload.body});
            break;
        default:
            return state;
    }
}

