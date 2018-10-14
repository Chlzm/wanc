import {Icon} from 'antd-mobile'

export const SET_TITLE = 'SET_TITLE'
export const SET_LEFT_ICON = 'SET_LEFT_ICON'

//
export const setTitle = (data, showLeftIcon = true, icon) => {
    let leftIcon = icon || <Icon type="left"/>
    document.title = data;
    return {
        type: SET_TITLE,
        data,
        showLeftIcon,
        leftIcon,
    }
}

export const setLeftIcon = data => {
    return {
        type: SET_LEFT_ICON,
        data
    }
}