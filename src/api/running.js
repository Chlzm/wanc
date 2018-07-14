// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const getRunningList = params => get('/rest/activity/runninglist', params);

export const getRunningDetail = params => post('/rest/activity/runningdetail', params);

export const getKartDetail = params => post('/rest/activity/toycardetail', params);

export const getBicycleDetail = params => post('/rest/activity/bikedetail', params);

export const getTrackDetail = params => post('/rest/activity/trackdetail', params);


