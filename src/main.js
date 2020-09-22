import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './style.css'

Vue.config.productionTip = false

import http from './http'
// 挂载到vue实例属性（原型）上之后可以在任意页面中使用this.$http访问这个数据请求接口
Vue.prototype.$http = http


// minxin代码块
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return{
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
