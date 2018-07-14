// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const validateCode = params => post('/rest/account/validatecode', params);

export const findPassword = params => post('/rest/account/findpwd', params);

