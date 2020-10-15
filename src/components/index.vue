<template>
  <div class="hello">
    <div class="img">
      <van-swipe
        class="my-swipe"
        :loop="false"
        vertical
        :style="'height: 100vh;'"
      >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" class="img" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator"></div>
        </template>
      </van-swipe>
      <div class="but">
        <div @click="activity">
          <a>
            <img
              src="../image/参加活动.png"
              style="width: 170px; height: 60px"
            />
          </a>
        </div>
        <div class="zeng" @click="make">
          <span>我的转赠</span>
          <div class="bor"></div>
        </div>
      </div>
    </div>

    <!-- <div class="popups">
      <van-overlay :show="isShow" @click="isShow = false">
        <div class="wrapper">
          <div class="block" @click.stop>
            <van-field
              v-model="giverPhone"
              center
              clearable
              label="电话号码"
              placeholder="请核对手机号码"
            >
              <template #button>
                <van-button size="small" type="primary" @click="getdonation"
                  >确定</van-button
                >
              </template>
            </van-field>
          </div>
        </div>
      </van-overlay>
    </div> -->
  </div>
</template>

<script>
import { getWxUserInfo, getDonation } from '../api/index'
// import wx from 'weixin-js-sdk'
import axios from 'axios'
export default {
  data () {
    return {
      isShow: false,
      giverPhone: '',
      images: [
        require('../image/主画面.png'),
        require('../assets/image/活动套餐.jpg'),
        require('../image/4(5).jpg'),
        require('../assets/image/品牌介绍.jpg'),
      ],
      code: '',
      list: {},
      height: 0
    }
  },
  created () {
    // this.height = this.calcHeight()
    this.getCode()
  },

  methods: {
    calcHeight () {
      return document.body.clientHeight
    },
    getCode () { // 非静默授权，第一次有弹框
      console.log('code', this.code)

      var local = 'http://tools.fwh1988.cn/active1111/' // 获取页面url
      var appid = 'wxce2648786b0f1843'
      if (!sessionStorage.getItem('mycode')) {
        const code = this.getUrlCode().code
        if (code) {
          sessionStorage.setItem('mycode', code)
          this.init()
        } else {
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=111#wechat_redirect`
        }
      }
    },
    init () {
      const data = {
        code: sessionStorage.getItem('mycode')
      }
      getWxUserInfo(data).then(res => {
        console.log(res.data)
        console.log(res.data.message);
        if (res.data.statusCode !== 200) {
          alert(res.data.message)
        } else {
          this.list = res.data.data
          sessionStorage.setItem('listUsername', JSON.stringify(res.data.data))
        }
      })
    },
    // 截取url中的code方法
    getUrlCode () {
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        var strs = str.split("&")
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
        }
      }
      return theRequest
    },

    //参与活动
    activity () {
      if (sessionStorage.getItem('listUsername')) {
        this.$router.push({ path: '/activities' })
      }
    },

    //我的转赠
    make () {
      console.log(sessionStorage.getItem('listUsername'))
      if (sessionStorage.getItem('listUsername')) {
        let list = JSON.parse(sessionStorage.getItem('listUsername'))
        console.log(list)
        const data = {
          giverPhone: list.phone
        }
        getDonation(data).then(res => {
          console.log(res)
          this.$router.push({ path: '/donation', query: { giverPhone: list.phone } })
        })
      }
    },
  }
}
</script>
<style  scoped>
.hello .img img {
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
}
.hello {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.but {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0px;
}
.zeng {
  font-size: 15px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 19px;
  color: #00584a;
  position: relative;
  top: -8px;
}

.bor {
  width: 60px;
  height: 0px;
  border: 1px solid #00584a;
  position: relative;
}
.zeng img {
  vertical-align: middle;
  margin-top: 3px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
