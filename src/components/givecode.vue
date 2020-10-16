<template>
  <div>
    <div class="qrcodes" id="qrcode"></div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
// import wx from 'weixin-js-sdk'
export default {
  mounted () {
    console.log(this.link)
    this.qrcode();
  },

  data () {
    return {
      //根据添加的信息生成二维码返回对应的信息
      link: `http://wx.fawa1988.com/double11/#/admin`
    }
  },

  methods: {
    //  生成二维码
    qrcode () {
      let qrcode = new QRCode('qrcode', {
        width: 300,
        height: 300,        // 高度
        text: this.link,   // 二维码内容
        render: 'canvas',   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: '#f0f',   // 背景色
        foreground: '#ff0'    // 前景色
      })
    },
  },
}
</script>
<style scope>
.qrcodes {
  display: flex;
  justify-content: center;
  position: relative;
  top: 200px;
}
</style>