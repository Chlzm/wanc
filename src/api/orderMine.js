// 代理商信息
import {
    get,
    post
} from '../util/wancAxios';

export const getMyOrderList = params => get('/rest/my/order/list', params);

export const deleteOrder = params => get('/rest/my/order/del', params);

export const cancelOrder = params => get('/rest/my/order/Cancel', params);

export const payOrder = params => get('/rest/my/order/pay', params);

export const getOrderDetail = params => get('/rest/my/order/detail', params);



