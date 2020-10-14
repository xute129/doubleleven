<template>
  <div class="container">
    <van-overlay :show="isOver">
      <div class="wrapper" @click.stop>
        <img src="../image/箭头.png" alt class="arrow" />
        <div class="box">点击右上角分享到好友</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// import html2canvas from "html2canvas";
// import Canvas2Image from "canvas2image";
import { getSignature } from '../api/index'
import wx from 'weixin-js-sdk'
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

  created () {
    console.log(this.$route.query.id)
    // const link_urls = '' // 自定义分享的链接
    const urls = location.href.split('#')[0]  // 动态获取当前页面链接,用于向后端获取签名location.href.split('#')[0]
    const data = {
      url: urls
    }
    console.log(data)
    getSignature(data).then(res => { // 这是向后端发的请求,返回微信分享接口需要的签名
      console.log(res)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxce2648786b0f1843', // 必填，公众号的唯一标识
        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
        signature: res.data.data.signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
      })
      window.share_config = {
        share: {
          imgUrl:
            "http://tools.fwh1988.cn/images/logo.png", //分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
          desc: "您的好友给您送来一份“水亮”豪礼，详情请戳↓↓↓",//摘要,如果分享到朋友圈的话，不显示摘要。
          title: "樊文花双11豪礼抢先享", //分享卡片标题
          link: `http://tools.fwh1988.cn/active1111/#/reception?id=${this.$route.query.id}`, //分享出去后的链接，这里可以将链接设置为另一个页面。
          success: function () {
            // console.log("设置微信url成功");
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        }
      }
      wx.ready(function () {
        wx.updateAppMessageShareData(share_config.share); //分享给好友
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  // background-image: url("../../assets/img/three/06.png");
  /deep/ .van-overlay {
    // background-color: #00584a !important;
    background-image: none;
    background-size: 100% 100%;
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
      color: white;
      font-size: 0.26rem;
      color: #99cceb;
    }
  }
}
</style>
