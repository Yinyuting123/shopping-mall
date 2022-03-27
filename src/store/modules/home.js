// home模块的小仓库

import {reqCategoryList, reqGetBannerList, reqGetFloorList} from '@/api'

const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
// 唯一修改state的地方
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    async getCategoryList({commit}) {
        let result = await reqCategoryList();
        if(result.code == 200) {
            commit('GETCATEGORYLIST', result.data)
        }
    },
    // 获取轮播图数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        if(result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({commit}) {
        let result = await reqGetFloorList();
        if(result.code == 200) {
            commit('GETFLOORLIST', result.data)
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