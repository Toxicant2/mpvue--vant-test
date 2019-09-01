import { fetch } from './http'

// 小程序wx.login
export const mpLogin = code => {
    return fetch(`/mp/login/${code}`)
}

// 获取后端session
export const mpSession = code => {
    return fetch('/mp/session')
}

