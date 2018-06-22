// 代理商信息
import {
    get
} from '../util/gd-axios';

export const getUri1 = parameters => get('/api/uri1',{data:parameters});

export const getUri2 = parameters => get('/api/uri2');

export const getUri3 = parameters => get('/api/uri3');