import { reqGetUserAddressList, reqGetTradeInfo, reqSubmitOrder } from "@/api"

const state = {
    userAddressList: [],
    tradeInfo: {}
}

const mutations = {
    USERADDRESSLIST(state, userAddressList) {
        state.userAddressList = userAddressList
    },
    GETTRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
}

const actions = {
    async getUserAddressList({commit}) {
        let result = await reqGetUserAddressList()
        if(result.code == 200) {
            commit('USERADDRESSLIST', result.data)
        }
    },
    async getTradeInfo({commit}) {
        let result = await reqGetTradeInfo()
        if(result.code == 200) {
            commit('GETTRADEINFO', result.data)
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}