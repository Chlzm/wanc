// 代理商信息
import {
    get,
    post,
} from '../util/wancAxios';

export const getUri1 = parameters => get('/api/uri1',{data:parameters});

export const getUri2 = parameters => get('/api/uri2');

export const getUri3 = parameters => get('/api/uri3');

export const getBannerList = params => get('/rest/index/trydrivelist');

export const getCycleList = params => get('/rest/index/cyclelist');

export const get4SList = params => get('/rest/activity/4slist');