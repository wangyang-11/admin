import axios from 'axios'
import Vue from 'vue'
import router from './router'
// 创建一个实例，baseURL指向接口地址
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

// 给所有的请求头加一个请求头（拦截器）
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 加请求头localStorage.token
  // 先判断localStorage.token是否存在
  if (localStorage.token) {
    // Authorization标准的请求头，可以用来给授权的时候加
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//全局响应拦截器
// http.interceptors.request.use(){}

// 给全局响应拦截器
http.interceptors.response.use(res => {
  // 正常请求进入这里
  return res
}, err => {
  if (err.response.data.message) {
    // 引用vue的prototype.$message去弹出这个错误
    // Vue.prototype.$message.error(err.response.data.message)
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if(err.response.status === 401){
      router.push('/login')
    }
  }
  // 处理大于等于400的请求   err.response.data.message客户端显示的内容
  // console.log(err.response.data.message)
  return Promise.reject(err)
})



export default http;