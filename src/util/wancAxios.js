import axios from 'axios';
import qs from 'qs';
import {Toast} from 'antd-mobile'
import pubsub from '../util/pubsub'
import {isWeiXin} from "./util";

//axios.defaults.baseURL = '';
axios.defaults.baseURL = location.host == 'wanchi.xiechangqing.cn' ? 'http://wanchi.xiechangqing.cn' : 'http://wc.xiechangqing.cn';
if (location.host.indexOf('192') > -1) {
    axios.defaults.baseURL = '';
}
axios.interceptors.request.use(function (request) {
    let token = localStorage.getItem('wanchi-ACCESS-TOKEN')
    let userName = localStorage.getItem('wanchi-ACCESS-USER')
    request.headers.common["wanchi-ACCESS-TOKEN"] = token || ''
    request.headers.common["wanchi-ACCESS-USER"] = userName || ''
    if (/\/(login|smslogin)$/.test(request.url)) {
        delete request.headers.common["wanchi-ACCESS-TOKEN"];
        delete request.headers.common["wanchi-ACCESS-USER"];
    }
    if (request.url.indexOf('login') != -1 && request.url.indexOf('getcode') != -1) { // 非登录接口

        if (!token || !userName) {
            if (isWeiXin()) {
                location.href = "/login"
            } else {
                pubsub.publish('gotoLogin', true);
            }
        }

    }
    return Promise.resolve(request);
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.code == "E1005" || response.data.code == "E1001") {
        localStorage.clear();
        if (response.config.url.indexOf('login') == -1) {
            if (isWeiXin()) {
                location.href = "/login"
            } else {
                pubsub.publish('gotoLogin', true);
            }
            return;
        }
        Toast.info(response.data.msg, 1.5)
    } else if (response.data.code != "00000" && response.data.msg != null) {
        Toast.info(response.data.msg, 1.5);
    }
    return Promise.resolve(response.data);
}, function (error) {
    return Promise.reject(error);
});

export default class marsAxios {
    constructor(options = {}) {
        this.options = options;
    }

    request(options) {
        return axios.request(options);
    }

    get(url, options = {}) {
        return this.request({
            url,
            params: {
                ...options
            }
        })
    }

    post(url, data, options = {}) {
        data = qs.stringify(data)
        return this.request({
            method: 'post',
            url,
            data,
            ...options
        });
    }
}

const instanceAxios = new marsAxios;
export const request = instanceAxios.request.bind(instanceAxios);
export const get = instanceAxios.get.bind(instanceAxios);
export const post = instanceAxios.post.bind(instanceAxios);