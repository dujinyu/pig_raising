// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入初始化样式和防止边框在高清手机显示问题的边框样式
import './common/css/reset.css'
import './common/css/border.css'

//fastclick：处理移动端click事件300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

//全局挂载axios，不用挨个引入
import Axios from '@/common/axios'
Vue.prototype.$axios = Axios

//路由router
import router from './router'

//vuex,Store
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
