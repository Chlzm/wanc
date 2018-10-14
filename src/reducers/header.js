import {
    SET_TITLE,
    SET_LEFT_ICON,
} from '../actions/header'
import {Icon} from 'antd-mobile'

export const header = (state = {title: '万驰', showLeftIcon: true, leftIcon: <Icon type="left"/>}, action) => {
    switch (action.type) {
        case SET_TITLE:
            return Object.assign({}, state, {title: action.data,showLeftIcon:action.showLeftIcon,leftIcon:action.leftIcon});
        case SET_LEFT_ICON:
            return Object.assign({}, state, {showLeftIcon: action.data.showLeftIcon, leftIcon: action.data.leftIcon});
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

