import {getNoticeCount} from "../api/message";

export const GET_COUNT = 'GET_COUNT'

export const setMessageCount = data => {
    return {
        type: GET_COUNT,
        payload: getNoticeCount()
    }
}

