// 代理商信息
import {
    get,
} from '../util/wancAxios';

//export const getData = parameters => get('/api/uri1',{data:parameters});

export const readNotice = parameters => get('/rest/my/notice/read',parameters);

export const getNoticeList = parameters => get('/rest/my/notice/list',parameters);


