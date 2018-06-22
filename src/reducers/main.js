import {
    GET_REGIONS,
    GET_TEACHERS,
    GET_COURSES,
    GET_URI1,
    FETCH_SUCCESS
} from '../actions/main'
import {handleActions} from 'redux-actions'


export const GetExam = (state = {value: false,data:{}}, action) => {
    switch (action.type) {
        case GET_REGIONS:
            return Object.assign({},state,{value:action.data});
            break;
        case FETCH_SUCCESS:
            return Object.assign({},state,{data:action.data});
            break;
        case `${GET_REGIONS}_LOADING`:
            return Object.assign({},state,{value:1});
        case `${GET_REGIONS}_SUCCESS`:
            const Examlist = action.payload.result;
            return Object.assign({}, state, Examlist);
        case `${GET_REGIONS}_ERROR`:
            return state;
        default:
            return state;
    }
}

