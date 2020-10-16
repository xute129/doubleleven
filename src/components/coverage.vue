<template>
  <div class="container"></div>
</template>

<script>
// import html2canvas from "html2canvas";
// import Canvas2Image from "canvas2image";
import { getSignature } from '../api/index'
// import wx from 'weixin-js-sdk'
export default {
  props: {
    index: {
      type: Number
    }
  },
  data () {
    return {
      isOver: true,
    };
  },

  mounted () {
    console.log(this.$route.query.id)
    if (this.getUrlCode().share) {
      location.replace(`http://wx.fawa1988.com/double11/#/reception?id=${this.$route.query.id}`)
    }
    setTimeout(() => {
      this.auth()
    }, 100)
  },
  methods: {
    async auth () {
      let self = this
      try {
        // const link_urls = '' // 自定义分享的链接
        const urls = location.href.split('#')[0]  // 动态获取当前页面链接,用于向后端获取签名location.href.split('#')[0]
        //alert(urls)
        const data = {
          url: urls
        }
        console.log(data)
        //alert(JSON.stringify(this.$route.query))
        //alert(location.href)
        let res = await getSignature(data)
        if (!res.data.data.timestamp) {
          alert('签名失败')
          return
        }
        console.log(res)
        //alert(JSON.stringify(res))
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx722feb97ad2ad6ef', // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        })
        var share_config = {
          share: {
            imgUrl:
              "http://tools.fwh1988.cn/images/logo.jpg", //分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
            desc: "您的好友给您送来一份“水亮”豪礼，详情请戳↓↓↓",//摘要,如果分享到朋友圈的话，不显示摘要。
            title: "樊文花双11豪礼抢先享", //分享卡片标题
            link: `http://wx.fawa1988.com/double11/?share=share&id=${self.$route.query.id}#/reception?id=${self.$route.query.id}`, //分享出去后的链接，这里可以将链接设置为另一个页面。
            success: function () {
              // console.log("设置微信url成功");
              //alert('调用成功')
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          }
        }
        wx.ready(function () {
          //alert('开始调用微信转发接口')
          wx.onMenuShareAppMessage(share_config.share); //分享给好友
        });
        wx.error(function (err) {
          alert(JSON.stringify(err))
        })
      } catch (error) {
        alert('js代码有误,捕获异常')
        alert(JSON.stringify(error))
      }
    },
    // 截取url中的code方法
    getUrlCode () {
      var url = location.search
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
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("../image/abcd.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.arrow {
  width: 0.8rem;
  position: absolute;
  top: 0;
  right: 7%;
}
.box {
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  border: #e5f1ee 2px dotted;
  border-radius: 30px;
  height: 1.2rem;
  width: 4rem;
  text-align: center;
  line-height: 1.2rem;
  color: #00584a;
  font-size: 0.3rem;
}
</style>
