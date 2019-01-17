import Axios from 'axios'
import { querystring } from "vux"

Axios.defaults.timeout = 10000;
// Axios.defaults.baseURL = "http://www.z-xu.com";
// Axios.defaults.baseURL = "http://10.141.84.26:8889"
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
Axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前干点什么
        return config
    },
    function (error) {
        // 对错误请求做点什么
        console.log("请求错误，被拦截！")
        return Promise.reject(error)
    }
)
// 响应拦截器
Axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

// 封装get请求
export function get(url) {
    return new Promise((resolve, reject) => {
        Axios.get("/api" + url)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

// 封装post请求
export function post(url, data={}) {
    return new Promise((resolve, reject) => {
        Axios.post("/api" + url, querystring.stringify(data))
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}
