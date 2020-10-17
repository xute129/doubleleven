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
        require('../image/1-1(5).jpg'),
        require('../assets/image/1-2.jpg'),
        require('../image/4(5).jpg'),
        require('../assets/image/1-4.jpg'),
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

      var local = 'http://wx.fawa1988.com/double11/' // 获取页面url
      var appid = 'wx722feb97ad2ad6ef'
      if (!sessionStorage.getItem('mycode')) {
        const code = this.getUrlCode().code
        if (code) {
          sessionStorage.setItem('mycode', code)
          this.execWx()
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
    // 获取经纬度
    async execWx () {
      //根据微信规则获取经纬度
      const urls = location.href.split('#')[0]  // 动态获取当前页面链接,用于向后端获取签名location.href.split('#')[0]
      const data = {
        url: urls
      }
      console.log(data)
      await getSignature(data).then(res => { // 这是向后端发的请求,返回微信分享接口需要的签名
        console.log(res)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxce2648786b0f1843', // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
        })
        let _thes = this
        window.share_config = {
          share: {
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              _thes.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              _thes.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              _thes.speed = res.speed; // 速度，以米/每秒计
              _thes.accuracy = res.accuracy; // 位置精度
              console.log(res, 'rrrr');
              console.log(_thes.latitude, '纬度')
              sessionStorage.setItem('shareAddress', JSON.stringify(res))
            }
          }
        }
        wx.ready(function () {
          wx.getLocation(share_config.share); //获取地理位置
        });
      })
        .catch(function (error) {
          console.log(error);
        });
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
