// 代理商信息
import {
    get,
} from '../util/wancAxios';


export const readNotice = parameters => get('/rest/my/notice/read',parameters);

export const getNoticeList = parameters => get('/rest/my/notice/list',parameters);

export const getNoticeCount = parameters => get('/rest/my/notice/newscount',parameters);




