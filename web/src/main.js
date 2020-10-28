import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import '@/assets/reset.css'
import 'amfe-flexible/index.js'

Vue.config.productionTip = false
import http from './http.js'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
