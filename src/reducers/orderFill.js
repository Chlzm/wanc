import {
    SET_PAY_MONEY,
    SET_APPLY_END_TIME,
    SET_APPLY_USERNAME,
    SET_CAR_MODEL,
    SET_NAME,
    SET_PHONE,
    SET_TIME,
    SET_USER_COUNT,
} from '../actions/orderFill';
import format from "format-datetime";


export const fill = (state = {
    s4name: '',
    time: new Date,
    applyusername: '',
    phone: '',
    carbrandid: 1,
    carbrandname: '',
    carmodel: '',
    usercount: 1,
    paymoney: 0,
    applyendtime: format(new Date, 'yyyy-MM-dd HH:mm') + ':00',
}, action) => {
    switch (action.type) {
        case SET_NAME:
            return Object.assign({}, state, {s4name: action.data});
            break;
        case SET_APPLY_USERNAME:
            return Object.assign({}, state, {applyusername: action.data});
            break;
        case SET_PHONE:
            return Object.assign({}, state, {phone: action.data});
            break;
        case SET_CAR_MODEL:
            return Object.assign({}, state, {carmodel: action.data});
            break;
        case SET_USER_COUNT:
            return Object.assign({}, state, {usercount: action.data});
            break;
        case SET_TIME:
            return Object.assign({}, state, {time: action.data});
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

