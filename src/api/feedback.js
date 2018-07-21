// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const submitFeedback = params => post('/rest/default/feedback', params);


