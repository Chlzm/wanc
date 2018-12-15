// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';


export const getRunningDetail = params => post('/rest/activity/runningdetail', params);

export const getKartDetail = params => post('/rest/activity/toycardetail', params);

//export const getBicycleDetail = params => post('/rest/activity/bikedetail', params);

export const getTrackDetail = params => post('/rest/activity/trackdetail', params);

export const getKartList = params => post('/rest/activity/toycarlist', params);

export const getBicycleList = params => post('/rest/activity/bikelist', params);

export const getRunningList = params => post('/rest/activity/runninglist', params);

export const getTrackList = params => post('/rest/activity/tracklist', params);

export const get4SList = params => post('/rest/activity/4slist', params);

export const apply4S = params => post('/rest/activity/4s/apply', params);

export const get4SDetail = params => get('/rest/activity/detail', params);

export const activityApply = params => post('/rest/activity/activity/apply', params);

export const getConfirmDetail = params => post('/rest/activity/detail', params);

export const s4Detail = params => get('/rest/activity/s4apply/detail', params);






