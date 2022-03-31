import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import search from './modules/search'
import detail from './modules/detail'
import shopcart from './modules/shopcart'
import user from './modules/user'
import trade from './modules/trade'


Vue.use(Vuex)

//对外暴露store的一个实例
export default new Vuex.Store({
    state:{},
    mutations:{},
    actions:{
    },
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
    
})
