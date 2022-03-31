import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 三级联动组件---注册成全局组件
import TypeNav from '@/components/TypeNav';
import Carsousel from '@/components/Carsousel';
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

import {Dialog, Button, Message} from 'element-ui'
Vue.component(Dialog.name, Dialog)
Vue.component(Button.name, Button)
Vue.component(Message.name, Message)

// 引入mockServer.js-----mock数据
import '@/mock/mockServer';

// 引入vue-lazyload实现图片懒加载
import VueLazyload from 'vue-lazyload'
import loadingImg from '@/assets/loading.gif'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: loadingImg
})

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入api
import * as api from '@/api'

Vue.config.productionTip = false

// 引入表单校验插件
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  beforeCreate() {
    // 配置全局事件总线$bus
    Vue.prototype.$bus = this
    Vue.prototype.$api = api
    Vue.prototype.$message = Message
  },
  router,
  store
}).$mount('#app')
