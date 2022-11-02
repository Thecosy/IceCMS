import Vue from 'vue'
import App from './App'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)

// #ifdef MP
// #endif
const app = new Vue({
    store,
    ...App
})

// 引入请求封装
import request from './utils/request.js'
Vue.prototype.$H = request;

// 挂载Vuex
import store from './store';  
Vue.prototype.$store = store;

// config配置文件
import config from './utils/config.js';  
Vue.prototype.$c = config;

// 公共方法
// import fun from './utils/function.js';  
// Vue.prototype.$f = fun;


app.$mount()
