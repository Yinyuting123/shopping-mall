import { reqGetShopcartList, reqDeleteCart, reqUpdateChecked } from "@/api"

const state = {
    shopCartList: []
}

const mutations = {
    GETSHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}

const actions = {
    async getShopcartList({commit}) {
        let result = await reqGetShopcartList()
        if(result.code == 200) {
            commit('GETSHOPCARTLIST', result.data)
        }
    },
    async deleteCart({commit}, payload) {
        let result = await reqDeleteCart(payload)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async updateCartChecked({commit}, payload) {
        let result = await reqUpdateChecked(payload)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    updateAllChecked({dispatch, state}, isChecked) {
        // 数组
        let promiseAll = []
        state.shopCartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCartChecked', {
                skuId: item.skuId,
                isChecked: isChecked
            })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    deleteAllChecked({dispatch, getters}) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let promiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked ?dispatch('deleteCart', item.skuId) : ''
            promiseAll.push(promise)
        })
        //只要全部的p1|p2....都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartList(state) {
        return state.shopCartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}