import axios from 'axios'
import { Toast } from 'vant'
import { getToken, delToken } from '@/utils/storage.js'

import router from '@/router/index.js'
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5/', // api的base_url
  timeout: 5000 // request timeout
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getToken()}`
  // console.log(localStorage.getItem('my-token-vant-mobile'))
  // config.headers.Authorization = `Bearer ${localStorage.getItem('my-token-vant-mobile')}`
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  if (error.response.data.code === 401) {
    delToken()
    router.push('/login')
  } else {
    Toast.fail(error.response.data.message)
    // 对响应错误做点什么
    return Promise.reject(error)
  }
})
export default request
