// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const modifyBaseInfo = params => post('/rest/my/modify', params);


