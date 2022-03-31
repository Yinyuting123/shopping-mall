// 登录与注册模块
import { reqGetCode, reqRegisterUser, reqLogin, reqGetUserInfo, reqLogout } from "@/api"
import { setUserToken, getUserToken, removeUserToken } from "@/utils/token"

const state = {
    code: '',
    userInfo: {},
    userToken: getUserToken()
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGIN(state, userToken) {
        state.userToken = userToken
    },
    CLEAR(state) {
        state.userToken = ''
        state.userInfo = {}
        // 本地存储数据清空
        removeUserToken()
    }
}
const actions = {
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone)
        if(result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async registerUser({commit}, params) {
        let result = await reqRegisterUser(params)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 登录
    async login({commit}, params) {
        let result = await reqLogin(params)
        if(result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setUserToken(result.data.token)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqGetUserInfo()
        if(result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },

    // 退出登录
    async logout({commit}) {
        let result = await reqLogout()
        // actions里不能操作state,提交mutation修改state
        if(result.code == 200) {
            // 清理token以及用户信息
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
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