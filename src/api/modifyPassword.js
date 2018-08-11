// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const modifyPassword = params => get('/rest/account/updatepwd', params);

export const validateCode = params => post('/rest/account/validatecode', params);

export const modifyPhone = params => post('/rest/account/modifyphone', params);







