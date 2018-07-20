// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mintUI from 'mint-ui'
import '../static/css/style.css'
import title from './plugin/title'


Vue.config.productionTip = false
Vue.use(mintUI)
Vue.use(title)
import {api_post} from './ajax/api.js'; //引入
Vue.prototype.$api_post = api_post //挂载
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
