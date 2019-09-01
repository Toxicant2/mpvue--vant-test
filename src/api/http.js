/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, data, header) {
    return requestAll(url, data, header, 'GET')
}

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data, header) {
    return requestAll(url, data, header, 'POST')
}

/**
 * 封装put方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data, header) {
    return requestAll(url, data, header, 'PUT')
}

/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deleteHttp(url, data, header) {
    return requestAll(url, data, header, 'DELETE')
}

function requestAll(url, data = {}, header, method) {
    const app = getApp()
    const baseURL =
        process.env.ENV_CONFIG === 'dev'
            ? 'http://localhost:3000'
            : process.env.API_ROOT
    const defaultHeaders = {
        'Content-Type': 'application/json'
    }
    if (url.indexOf('/auth/oauth/token') > -1) {
        defaultHeaders['Authorization'] =
            'Basic Y3Rycy11aTpjdHJzLXVpLWNsaWVudA=='
    } else {
        defaultHeaders['Authorization'] = `Bearer ${app.globalData.clientToken}`
    }
    header = header ? Object.assign(defaultHeaders, header) : defaultHeaders
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + url,
            data,
            header,
            method,
            success(res) {
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    reject(res.errMsg)
                }
            },
            fail(res) {
                reject(res.errMsg)
            }
        })
    })
}
