import Vue from 'vue'
import { MessageBox } from 'element-ui'

// Vue.use(Message)
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$confirm = MessageBox