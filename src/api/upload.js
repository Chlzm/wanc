// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const uploadImage = params => post('/rest/my/modify/head', params);


