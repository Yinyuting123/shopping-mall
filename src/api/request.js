import axios from 'axios';
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css";

// 引入store
import store from '../store'
import { getUserToken } from '@/utils/token';

// 封装axios实例
const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
    // if(store.state.detail.uuid_token) {
    //     // 给请求头添加字段:和后台沟通好
    //     config.headers.userTempId = store.state.detail.uuid_token
    // }
    if(getUserToken()) {
        config.headers.token = getUserToken()
    }
    // 请求开始
    nprogress.start()
    return config
})

// 响应拦截器
request.interceptors.response.use(res => {
    // 进度条结束
    nprogress.done()
    return res.data
// eslint-disable-next-line no-unused-vars
}, (error) => {
    return Promise.reject(new Error('failure'))
})

export default request

