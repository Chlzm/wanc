// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const login = params => post('/rest/account/smslogin', params);

export const accountLogin = params => post('/rest/account/login', params);

export const getCode = params => post('/rest/account/getcode', params);
