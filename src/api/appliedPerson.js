// 代理商信息
import {
    get,
} from '../util/wancAxios';


export const getApplyPerson = parameters => get('/rest/activity/trydriveapplyed/list',parameters);

