/*import {
    getRegionsData,
    getTeachersData,
    getCoursesData
} from '../api/main'*/

// type类型定义
export const GET_REGIONS = 'GET_REGIONS'
export const GET_TEACHERS = 'GET_TEACHERS'
export const TRIGGER_TAKE_EXAMPLE = 'TRIGGER_TAKE_EXAMPLE'
export const GET_REGIONS_ASYNC = 'GET_REGIONS_ASYNC'
export const CANCEL_TASK3 = 'CANCEL_TASK3'
export const USER_INPUT = 'USER_INPUT'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const USER_REQUESTED = 'USER_REQUESTED'


// 常量

// action函数
export const getRegions = (data) => {
    return {
        type: GET_REGIONS,
        data
    }
}

export const getTeachers = (data) => {
    return {
        type: GET_REGIONS_ASYNC,
        value: 1
    }
}
export const triggerTakeExample = (data) => {
    return {
        type: TRIGGER_TAKE_EXAMPLE,
        data
    }
}

export const cancelTask3 = (data) => {
    return {
        type: CANCEL_TASK3
    }
}

export const onChange = (data) => {
    return {
        type: USER_INPUT,
        data,
    }
}
export const fetchRequest = data => {
    return {
        type: FETCH_SUCCESS,
        data,
    }
}

export const userInput = data => {
    return {
        type: USER_REQUESTED,
        data,
    }
}