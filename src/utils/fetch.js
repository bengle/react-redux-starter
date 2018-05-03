require('es6-promise').polyfill();
import 'url-search-params-polyfill';
import axios from 'axios';

let count = 1;
//封装好的get和post接口，调用方法情况action文件
export const instance = axios.create({
    // baseURL: API_URL, //设置默认api路径
    timeout: 10000, //设置超时时间
    headers: {
        'X-Custom-Header': 'dtuic'
    },
    withCredentials:true
});
let blobInstance = axios.create({
    timeout: 10000, //设置超时时间
    headers: {
        'X-Custom-Header': 'dtuic'
    },
    withCredentials:true,
    responseType:'blob'
});
// 拦截器，统一处理请求
instance.interceptors.request.use(
    config => {       
        //  console.log('interceptor request:',config);
         return config;
    },
    error => {
        console.log('request error:',error);
           return Promise.reject(err);
    });
// 拦截器，统一处理未登录或者没有权限的情况
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        
        switch(error.response.status){
            case 401:
                if(count>0){
                    if(window.location.href.indexOf('login')<0){
                        toastr.error('您还没有登录或登录已过期，请登录！');
                        count--;
                        window.location.href='/#/login';
                        setTimeout(function(){
                            count = 1;
                        },3000)
                    }
                }
                break;
            case 403:
                if(count>0){
                        toastr.error('您没有权限！');
                        count--;
                        setTimeout(function(){
                            count = 1;
                        },3000)
                }
            case 610:
                $('#J_TenantModal').modal();
                break;
        }
        return Promise.reject(error.response.data)
        // 返回接口返回的错误信息
    });

export const getData = (url, param) => {
    return instance.get(`${url}`, {params: param})
}

/**
 * 后端需要莫名其妙的post格式
 * @param {String} url 
 * @param {Obj} param 
 */
export const postData = (url, param) => {
    let formParams = new URLSearchParams()
    for(let p in param){
        formParams.append(p,param[p]);
    }
    return instance.post(`${url}`, formParams)
}
/**
 * 传统post方式 
 * @param {String} url 
 * @param {Obj} param 
 */
export const postJsonData = (url, param) => {
    return instance.post(`${url}`, param)
}

export const getMultiData = (getFuncArr) => {
    return axios.all(getFuncArr)
}