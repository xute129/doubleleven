/**
 *ajax请求函数模块
 *返回值：promise对象  
 */

import axios from 'axios'


//创建axios请求
const service = axios.create({
    //请求接口域名
    baseURL: 'http://8.129.22.13:30102',
    //baseURL: 'http://172.16.10.21:30101'
})

//添加请求拦截器
service.interceptors.request.use(request => {
    //设置请求头的信息
    request.headers = {
        'Content-Type': 'application/json;charset=utf-8',
        // token : ''    //请求添加的token
    }
    return request
},
    error => {
        Promise.reject(error)
    }
)

//添加响应拦截器
service.interceptors.response.use(response => {
    return response
},
    error => {
        Promise.reject(error)
    }
)

export default service