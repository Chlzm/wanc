import axios from 'axios';
import qs from 'qs';
import {Toast} from 'antd-mobile'

axios.defaults.baseURL = '';
//axios.defaults.baseURL = '//app.wantrack-nj.com';
axios.interceptors.request.use(function (request) {
    let token = localStorage.getItem('wanchi-ACCESS-TOKEN')
    let userName = localStorage.getItem('wanchi-ACCESS-USER')
    request.headers.common["wanchi-ACCESS-TOKEN"] = token || ''
    request.headers.common["wanchi-ACCESS-USER"] = userName || ''
    if (request.url.indexOf('login') != -1 && request.url.indexOf('getcode') != -1) { // 非登录接口
        if (!token || !userName) {
            location.href = "/login";
        }

    }
    return Promise.resolve(request);
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    /*if(response.config.url.indexOf('login') != -1){
        Toast.info(response.data.msg);
    }else */
    try{
        if (response.data.code == "E1005") {
            localStorage.clear();
            if(response.config.url.indexOf('login') == -1){
                location.href = "/login";
            }
            Toast.info(response.data.msg)
        } else if (response.data.code != "00000" && response.data.msg != null) {
            Toast.info(response.data.msg);
        }
    }catch (e) {
        console.log(e)
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