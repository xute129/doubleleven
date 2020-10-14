<template>
  <div class="mycard">
    <img src="../image/信息输入bg.png" class="image" />
    <div>
      <div class="user">
        <div><img :src="images" class="make" /></div>
        <div class="username">
          <div class="name">{{ name }}</div>
          <div class="phone">{{ phone }}</div>
        </div>
      </div>
      <div class="select">
        <input
          type="text"
          class="byname"
          v-model="username"
          placeholder="请输入被赠人姓名"
        />
        <input
          type="text"
          class="byphone"
          placeholder="请输入被赠人电话"
          v-model="userphone"
        />
      </div>
      <div class="footer">
        <div style="width: 50%">
          <van-field
            label-width="20px"
            readonly
            clickable
            label="省"
            :value="province"
            placeholder="选择省份"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" round position="bottom">
            <van-picker
              show-toolbar
              :columns="list"
              @cancel="showPicker = false"
              @confirm="onConfirms"
            />
          </van-popup>
        </div>
        <div style="width: 50%">
          <van-field
            label-width="30px"
            readonly
            clickable
            label="城市"
            :value="city"
            placeholder="选择城市"
            @click="show = true"
          />
          <van-popup v-model="show" round position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="show = false"
              @confirm="onConfirm"
            />
          </van-popup>
        </div>
        <div>
          <van-popup v-model="show1" round position="top">
            <van-search
              background="#4fc08d"
              v-model="storeAddress"
              placeholder="请输入搜索"
              @blur="search"
            />
            <van-cell
              v-for="item in listCard"
              :key="item"
              :title="item.storeName"
              @click="clickcell(item)"
            />
          </van-popup>
        </div>
        <!-- <select @click="getqueryNearStore" v-model="storeAddress">
          <option v-for="(item, index) in listCard" :key="index">
            {{ item.siteAddress }}
          </option>
        </select> -->
      </div>
      <div class="card" @click="sendCard">
        <img src="../image/发送卡片.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { Addactivities, queryNearStore, getSignature, queryShopInfo, queryListStore } from '../api/index'
import wx from 'weixin-js-sdk'
import axios from 'axios'

export default {
  data () {
    return {
      num: '',
      openid: '',
      name: '',
      phone: '',
      username: '',
      userphone: '',
      images: '',
      id: '',
      latitude: 0,
      longitude: 0,
      speed: '',
      accuracy: '',
      storeName: '',
      storeAddress: '',
      storePhone: '',
      storeNum: '',
      listCard: [],
      province: '',
      city: '',
      show: false,
      showPicker: false,
      columns: ['郑州市', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      list: ['河南省', '湖南省', '广东省'],
      list1: [],
      show1: false,
    }
  },

  created () {
    //初始化微信授权获取的code信息
    this.list1 = JSON.parse(sessionStorage.getItem('listUsername'))
    this.num = this.$route.query.num
  },

  mounted () {
    this.openid = this.list1.openid
    this.name = this.list1.name
    this.phone = this.list1.phone
    this.images = this.list1.headimgurl
    this.num = JSON.parse(sessionStorage.getItem('num'))
    // this.getqueryListStore()
  },
  // mounted () {
  //   //根据微信规则获取经纬度
  //   const urls = location.href.split('#')[0]  // 动态获取当前页面链接,用于向后端获取签名location.href.split('#')[0]
  //   const data = {
  //     url: urls
  //   }
  //   console.log(data)
  //   getSignature(data).then(res => { // 这是向后端发的请求,返回微信分享接口需要的签名
  //     console.log(res)
  //     wx.config({
  //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //       appId: 'wxce2648786b0f1843', // 必填，公众号的唯一标识
  //       timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
  //       nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
  //       signature: res.data.data.signature, // 必填，签名
  //       jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
  //     })
  //     let _thes = this
  //     window.share_config = {
  //       share: {
  //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  //         success: function (res) {
  //           _thes.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
  //           _thes.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
  //           _thes.speed = res.speed; // 速度，以米/每秒计
  //           _thes.accuracy = res.accuracy; // 位置精度
  //           console.log(res, 'rrrr');
  //           console.log(_thes.latitude, '纬度')
  //           _thes.getqueryNearStore()
  //         }
  //       }
  //     }
  //     wx.ready(function () {
  //       wx.getLocation(share_config.share); //获取地理位置
  //     });
  //   })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },

  methods: {
    //搜索门店
    search () {
      let data = {
        province: this.province,
        city: this.city,
        storeName: this.storeAddress
      }
      queryShopInfo(data).then(res => {
        console.log(res.data.data);
        this.listCard = res.data.data
      })
    },
    //门店选中
    clickcell (item) {
      this.storeNum = item.storeNum
      this.storeName = item.storeName
      this.storePhone = item.storePhone
      this.storeAddress = item.storeAddress
      console.log(this.storeAddress, "ss");
    },
    //选中市
    onConfirm (value) {
      this.city = value;
      this.show = false;
      this.show1 = true
      this.getqueryShopInfo();
    },
    onConfirms (value) {
      this.province = value;
      this.showPicker = false;
    },
    showPopup () {
      this.show = true
    },
    //查询省市
    getqueryShopInfo (storeName) {
      let data = {
        province: this.province,
        city: this.city,
        storeName: storeName
      }
      queryShopInfo(data).then(res => {
        console.log(res.data.data);
        let list = res.data.data
        list.forEach(el => {
          //console.log(el.storeName);
        });
      })
    },
    //查询门店
    getqueryListStore () {
      console.log('132132');
      queryListStore().then(res => {
        console.log(res);
      })
    },
    //根据经纬度获取地址
    // getqueryNearStore () {
    //   let latitude = this.latitude
    //   let longitude = this.longitude
    //   const data = {
    //     latitude: latitude,
    //     longitude: longitude,
    //     count: 5,
    //     offset: 0
    //   }
    //   console.log(data)
    //   queryNearStore(data).then(res => {
    //     let list = res.data.data
    //     let all = {}
    //     //console.log(list);
    //     list.forEach(el => {
    //       if (el.siteAddress === this.storeAddress) {
    //         this.storePhone = el.telephoneNo
    //         this.storeNum = el.siteNo
    //       }
    //     });
    //     console.log(this.storeAddress, this.storePhone, this.storeNum)
    //     this.listCard = res.data.data
    //     console.log(this.listCard)

    //   })
    // },
    //添加信息
    sendCard () {
      let num = this.num
      let openid = this.openid
      let name = this.name
      let phone = this.phone
      const data = {
        cardType: num,
        openid: openid,
        giverName: name,
        giverPhone: phone,
        doneeName: this.username,
        doneePhone: this.userphone,
        storeName: this.storeName,
        storeAddress: this.storeAddress,
        storeNum: this.storeNum,
        storePhone: this.storePhone
      }
      console.log(data);
      Addactivities(data).then(res => {
        console.log(res)
        this.id = res.data.data
        console.log(this.id, 'id')
        this.$router.push({ path: '/coverage', query: { id: this.id } })
      })
    }
  }
}
</script>
<style scoped>
.mycard {
  width: 100%;
}
.image {
  width: 100%;
  height: 100vh;
}
.user {
  width: 100%;
  position: absolute;
  left: 17%;
  top: 10%;
}
.make {
  width: 1rem;
  height: 1rem;
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  position: absolute;
}
.username {
  width: 136px;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  line-height: 35px;
  color: #99cceb;
  position: absolute;
  left: 30%;
}
.select {
  position: absolute;
  width: 70%;
  top: 28%;
  left: 15%;
}
.byname {
  width: 100%;
  height: 8%;
  background: #ffffff;
  border: 0;
  border-bottom: 1px solid #99cceb;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  line-height: 25px;
  color: #99cceb;
}
.byphone {
  width: 100%;
  height: 8%;
  background: #ffffff;
  border: 0;
  border-bottom: 1px solid #99cceb;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 25px;
  color: #babfc8;
}
.footer {
  width: 70%;
  height: 25%;
  border: 1px solid #99cbea;
  position: absolute;
  top: 47%;
  left: 15%;
  display: flex;
  flex-direction: row;
}

.shop {
  width: 100%;
  height: 41px;
  border-bottom: 1px solid #99cbea;
  height: 21px;
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  line-height: 21px;
  color: #99cceb;
  display: flex;
  justify-content: center;
}
.footer select {
  font-size: 17px;
  color: #99cceb;
  width: 240px;
  height: 40px;
  position: relative;
  top: 10px;
  left: 10px;
  border: 0;
  opacity: 0.5;
}

.card {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
}
</style>