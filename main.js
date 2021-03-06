
import Vue from 'vue'
import App from './App'
import store from './store' 
// 全局组件引用
// vuex
// 公用的utl
import url from './components/service.js'
import topbar from './components/top_bar/top_bar.vue'


import more from './components/more/more.vue'
// 地址控件
// 剪裁头像
import avatar from "./components/yq-avatar/yq-avatar.vue";
// 地址控件
import wangding_pickerAddress from './components/wangding-pickerAddress/wangding-pickerAddress.vue'
Vue.component('wangding-pickerAddress',wangding_pickerAddress)
// Vue.prototype.$url = url
Vue.component('avatar',avatar)
Vue.component('topbar',topbar)
Vue.component('more',more)
Vue.prototype.$store = store  
App.mpType = 'app' 

const app = new Vue({
	store,
  ...App
})
app.$mount()
