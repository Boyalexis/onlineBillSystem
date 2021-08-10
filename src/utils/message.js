import Vue from 'vue'
import { Message } from 'element-ui'

// Vue.use(Message)
Vue.component(Message.name, Message)
Vue.prototype.$message = Message