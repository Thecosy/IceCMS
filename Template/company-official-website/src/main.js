console.log([
    "%c",
    "      写字楼里写字间，写字间里程序员；",
    "      程序人员写程序，又拿程序换酒钱。",
    "      酒醒只在网上坐，酒醉还来网下眠；",
    "      酒醉酒醒日复日，网上网下年复年。",
    "      但愿老死电脑间，不愿鞠躬老板前；",
    "      奔驰宝马贵者趣，公交自行程序员。",
    "      别人笑我忒疯癫，我笑自己命太贱；",
    "      不见满街漂亮妹，哪个归得程序员？",
].join('\n'), 'color:green')


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss' // global css

import md5 from 'md5'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$md5 = md5


import './permission' // permission control

import piugin from './components/index'  //导入全局组件
Vue.use(piugin)

Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
