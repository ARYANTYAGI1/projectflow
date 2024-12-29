import axios from 'axios'
import store from '@/state/store'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    config.headers['Accept-Language'] = 'it-IT,it;q=0.9'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log(error, 'Error')
    if (error.response.status === 401 && error.response.data.ermessage === 'loginError') {
      ElMessage({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error.response.data)
    } else if (error.response.status === 401 && error.response.data.message === 'Failed to authenticate token') {
      ElMessage({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
      return Promise.reject(error.response.data)
    } else {
      // ElMessage({
      //   message: error.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(error.response.data)
    }
  }
)

export default service
