import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// create an axios instance
const service = axios.create({
  // baseURL: '/api/api', // url = base url + request url
  baseURL: '/api' + process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

service.interceptors.request.use(function(config) {
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  // 在发送请求之前做些什么
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const { success, data, message } = response.data
  if (success === false) {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
  return data
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    Message.error(error.response?.data?.message)
    // Message.error('登录已过期，请重新登录')
    store.dispatch('user/logout')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default service
