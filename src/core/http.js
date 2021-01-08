import axios from 'axios'
import message from 'element-ui'
// let params = {appppp:1}
// axios.defaults.params = Object.assign({}, params)
// console.log(axios.defaults);
// axios.defaults.baseURL = 'http://192.168.2.1:3000/'
// axios.defaults.baseURL = 'http://10.10.16.110:3400/api/'
const httpService = axios.create({
    timeout: 3000
})
axios.interceptors.response.use((response) => {
    if(response){
        if (response.status == 200) {
            return response.data
        }
        if (response.status == 304) {
            console.log('没权限');
            return response
        }
        if(response.state == '0'){
            message.Message({
                showClose: true,
                message: '请求失败',
                type: 'error'
            });
        }
    }
    return response;
}, function (error) {
    message.Message({
        showClose: true,
        message: '网络原因，请求失败，请检查网络设置',
        type: 'error'
    });
    if (error.response) {
        // console.error(error);
    }else{
        // console.error(error.message);
    }
    return {}
});

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            params: params,
            method: 'get'
        }).then(response => {
            resolve(response)
        }).catch(erro => {
            reject(erro)
        })
    })
}
export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            params: params,
            method: 'post'
        }).then(response => {
            resolve(response)
        }).catch(erro => {
            reject(erro)
        })
    })
}

export default axios