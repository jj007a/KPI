import axios from 'axios';
import qs from 'qs';
import message from 'element-ui'
import store from '../vuex/store';
import vue from 'vue';
// import router from '../router';

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000   ,               // 请求超时时间
    headers: {"Content-Type":"application/json"}
});

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    message.Message({
        message: error,
        type: 'error'
    });
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => response,
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `未知错误${error.response.status}`;
            }
        } else {
            error.message = "连接到服务器失败";
        }
        message.Message({
            // showClose: true,
            message: error.message,
            type: 'error'
        });
        return Promise.reject(error);
    }
)
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        console.log(params)
        service({
            url: url,
            method: 'get',
            params: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        service({
            url: url,
            method: 'post',
            data: data 
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}
export default {
    service,
    post,
    get,
    
}
