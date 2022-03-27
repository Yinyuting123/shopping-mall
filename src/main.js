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

// 引入mockServer.js-----mock数据
import '@/mock/mockServer';

// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 配置全局事件总线$bus
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
