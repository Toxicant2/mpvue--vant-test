<template>
    <div>
        {{userId}}
        <button size="mini" type="primary" @click="backToHome">返回首页</button>
        <button type="warn" open-type="openSetting">打开设置页</button>
        <button open-type="share">转发</button>
        <button open-type="getUserInfo">获取用户信息</button>
        <button @click="getWeRunData">获取微信步数</button>
    </div>
</template>

<script>
import {
    mpSession
} from '@/api/miniprogram'

import getRowData from '@/utils/getRowData'
export default {
    data() {
        return {
            userId: null
        }
    },
    onLoad(option) {
        this.userId = option.userId
        // console.log(option)
        // console.log(this.$root.$mp.query)
    },
    methods: {
        backToHome() {
            const url = '../index/main'
            if (mpvuePlatform === 'wx') {
                mpvue.switchTab({ url })
            } else {
                mpvue.navigateTo({ url })
            }
        },

        getWeRunData() {
            mpvue.getWeRunData({
                success(res) {
                    const encryptedData = res.encryptedData
                    const iv = res.iv
                    mpSession().then(d => {
                        if (d.STATUS === 1) {
                            console.log(getRowData(encryptedData, iv, d.ITEMS))
                        }
                    })
                }
            })
        }
    },

    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res)
        }
        return {
            title: '自定义转发标题',
            path: '/pages/user?id=123'
        }
    }
}
</script>
