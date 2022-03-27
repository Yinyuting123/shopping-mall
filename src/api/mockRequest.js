import axios from 'axios';
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css";

// 封装axios实例
const request = axios.create({
    baseURL: '/mock',
    timeout: 6000
})

// 请求拦截器
request.interceptors.request.use(config => {
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

