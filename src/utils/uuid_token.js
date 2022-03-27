// 封装游客身份模块UUID,生成随机字符串
import {v4 as uuidv4} from 'uuid'

// 要生成随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先从本地获取，没有则生成
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}