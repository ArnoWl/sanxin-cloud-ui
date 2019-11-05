import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getLanguage, getToken } from '@/utils/auth'

const defaultConfig = require('../api/globalconfig.js')

// create an axios instance
const service = axios.create({
  baseURL: defaultConfig.baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      var language = getLanguage()
      if (language == null || language === '' || language === 'null' || language === 'undefined' || language === undefined) {
        language = 'CN'
      }
      config.headers.common['languageToken'] = language
      config.headers.common['sanxinToken'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (!res.status) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === '1001') {
        // to re-login
        MessageBox.confirm('Please login again,' + res.msg, 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'warning',
          duration: 1.5 * 1000
        })
        return Promise.reject(res.msg || 'Error')
      }
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
