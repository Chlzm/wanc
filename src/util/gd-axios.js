import axios from 'axios';

axios.defaults.baseURL = '//127.0.0.1:3000';

axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
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