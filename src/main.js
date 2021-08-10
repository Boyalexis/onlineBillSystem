import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './utils/message.js'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: {
    eventHub: new Vue()   // 添加空的Vue示例，将通信事件挂载在该示例上
  },
  render: h => h(App)
}).$mount('#app')
