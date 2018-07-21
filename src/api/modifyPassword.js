// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const modifyPassword = params => get('/rest/account/updatepwd', params);


