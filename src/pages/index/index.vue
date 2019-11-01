<template>
    <div>
        <div class="userinfo" @click="bindViewTap">
            <open-data type="userAvatarUrl" lang="zh_CN"></open-data>
            <open-data type="userNickName" lang="zh_CN"></open-data>
            <open-data type="userGender" lang="zh_CN"></open-data>
        </div>
        <van-search :value="value" placeholder="请输入搜索关键词" />
    </div>
</template>

<script>
import {
    mpLogin
} from '@/api/miniprogram.js'

import card from '@/components/card'

export default {
    data() {
        return {
            value: ''
        }
    },

    components: {
        card
    },

    methods: {
        bindViewTap() {
            // const url = '../logs/main'
            // if (mpvuePlatform === 'wx') {
            //     mpvue.switchTab({ url })
            // } else {
            //     mpvue.navigateTo({ url })
            // }
            mpvue.navigateTo({
                url: `../mine/main?userId=what a fuck daty`
            })
        }
    },

    // vue 生命周期函数
    created() {
        console.log('index created')
    },

    onLoad() {
        console.log('index load')
    },

    onShow() {
        console.log('index show')
    },

    mounted() {
        console.log('index mounted')
        const that = this
        mpvue.checkSession({
            success() {
                // 登录状态保持
                console.log('session_key未过期')
            },
            fail() {
                mpvue.login({
                    success(d) {
                        if (d.code) {
                            mpLogin(d.code).then(res => {
                                if (res.STATUS === 1) {
                                    const openid = res.ITEMS.openid
                                    that.$globalData.openid = openid
                                    wx.setStorageSync('openid', openid)
                                }
                            })
                        } else {
                            console.log('登录失败！' + d.errMsg)
                        }
                    }
                })
            }
        })
    }
}
</script>

<style scoped>
.userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
}

.userinfo-nickname {
    color: #aaa;
}
</style>
