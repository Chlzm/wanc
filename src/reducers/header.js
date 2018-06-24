import {
    SET_TITLE,
} from '../actions/header'


export const header = (state = {title: '万驰'}, action) => {
    switch (action.type) {
        case SET_TITLE:
            return Object.assign({},state,{title:action.data});
            break;
        /*case FETCH_SUCCESS:
            return Object.assign({},state,{data:action.data});
            break;
        case `${GET_REGIONS}_LOADING`:
            return Object.assign({},state,{value:1});
        case `${GET_REGIONS}_SUCCESS`:
            const Examlist = action.payload.result;
            return Object.assign({}, state, Examlist);
        case `${GET_REGIONS}_ERROR`:
            return state;*/
        default:
            return state;
    }
}

