// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSummernote from 'vue-summernote'
import axios from 'axios'
import VueAxios from 'vue-axios'
import process from "shelljs";
Vue.use(VueAxios, axios)

let ROOT;
if (process.env.NODE_ENV === 'development') {
  ROOT = "/api";//开发环境下的代理地址，解决本地跨域
} else {
  ROOT = 'http://localhost:8080/somewords_war_exploded/';    //生产环境下的地址
}
axios.defaults.baseURL = ROOT;

// 载入bootstrap.js
require('bootstrap')

// 载入bootstrap以及summernote的样式
// 这里需要你的脚手架工具具有加载css的能力
require('bootstrap/dist/css/bootstrap.min.css')
require('summernote/dist/summernote.css')

// 这里设置summernote的初始化选项
// 可参考 http://summernote.org/deep-dive/#initialization-options
Vue.use(VueSummernote, {
  dialogsFade: true
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
