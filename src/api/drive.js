// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const getTryDriveDetail = params => get('/rest/activity/s4apply/detail', params);


