import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './style.css'

Vue.config.productionTip = false
// 挂载到vue实例属性（原型）上之后可以在任意页面中使用this.$http访问这个数据请求接口
Vue.prototype.$http = http
import http from './http'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
