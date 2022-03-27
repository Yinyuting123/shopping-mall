import { reqGetSearchList } from '@/api'

const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 第二个参数params默认是空对象
    async getSearchList({commit}, params = {}) {
        let result = await reqGetSearchList(params)
        if(result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    // 当前形参state是当前模块仓库中的state，并非大仓库中的state
    goodsList(state) {
        // 这样书写是有问题的
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
