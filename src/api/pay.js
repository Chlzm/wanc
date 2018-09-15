// 代理商信息
import {
    get, post,
} from '../util/wancAxios';

export const submitPay = params => post('/rest/pay/submitpay/web', params);


