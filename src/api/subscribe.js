// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const getOrderDetail = params => get('/rest/my/order/detail', params);

export const submitPay = params => post('/rest/pay/submitpay/web', params);

export const submitAPP = params => post('/rest/pay/submitpay/app', params);

export const getPayResult = params => get('/rest/pay/order/payresult', params);








