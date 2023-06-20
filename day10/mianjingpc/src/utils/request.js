import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    if (error.response.data.code === 400 || error.response.data.code === 401) {
      Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)
export default service
