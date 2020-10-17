<template>
  <div class="mycard">
    <img :src="image" class="image" />
    <div>
      <div class="user">
        <div><img :src="images" class="make" /></div>
        <div class="username">
          <div class="name">{{ name }}</div>
          <div class="phone">{{ phone }}</div>
        </div>
      </div>
      <div class="content">
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
          <div>
            <van-field
              readonly
              clickable
              label="城市"
              :value="province + ',' + city"
              placeholder="请选择城市"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" round position="bottom">
              <van-picker
                show-toolbar
                :columns="areaColumns"
                @cancel="showPicker = false"
                @confirm="onConfirms"
              />
            </van-popup>
          </div>
          <div>
            <van-field
              readonly
              clickable
              label="门店"
              :value="storeName"
              placeholder="请选择门店"
              @click="show1 = true"
            />
          </div>
          <div v-if="storePhone">
            <van-field readonly label="门店号码" v-model="storePhone" />
          </div>
          <!-- <div v-if="storeAddress">
            <van-field
              readonly
              label="详细地址"
              v-model="storeAddress"
              type="textarea"
              autosize
            />
          </div> -->
        </div>
        <div>
          <van-popup v-model="show1" round position="bottom">
            <van-search
              background="#4fc08d"
              v-model.trim="searchVal"
              placeholder="请输入搜索"
              @blur="search"
              v-if="showSearch"
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
import { Addactivities, queryNearStore, getSignature, queryShopInfo, queryListStore, queryShopProvinceOrCity } from '../api/index'
// import wx from 'weixin-js-sdk'
import axios from 'axios'

export default {
  data () {
    return {
      image: require('../image/xinxi(6).jpg'),
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
      columns: [],
      list: [],
      list1: [],
      show1: false,
      areaColumns: [],
      showSearch: false,
      searchVal: '',
      shareAddress: {}
    }
  },

  created () {
    //初始化微信授权获取的code信息
    if (sessionStorage.getItem('listUsername')) {
      this.list1 = JSON.parse(sessionStorage.getItem('listUsername'))
    }
    //初始化经纬度
    if (sessionStorage.getItem('shareAddress')) {
      this.shareAddress = JSON.parse(sessionStorage.getItem('shareAddress'))

    }
    this.num = this.$route.query.num
  },

  mounted () {
    this.openid = this.list1.openid
    this.name = this.list1.name
    this.phone = this.list1.phone
    this.images = this.list1.headimgurl
    if (sessionStorage.getItem('num')) {
      this.num = JSON.parse(sessionStorage.getItem('num'))
    }

    // this.getqueryListStore()
    this.getProvince()
    this.getqueryNearStore()
  },


  methods: {

    // 查询省
    async getProvince () {
      let areaColumns = []
      const res = await queryShopProvinceOrCity()
      console.log(res)
      let provinces = res.data.data
      for (let text of provinces) {
        areaColumns.push({
          text,
          children: []
        })
      }
      const allRes = await Promise.all(provinces.map(province => this.getCitys({ province })))
      console.log(allRes)
      allRes.forEach((item, index) => {
        let arr = []
        for (let city of item.data.data) {
          arr.push({ text: city })
        }
        areaColumns[index].children = arr
      })
      this.areaColumns = areaColumns
      console.log(this.areaColumns)
    },
    // 查询市
    getCitys (data = {}) {
      return queryShopProvinceOrCity(data)
    },
    //搜索门店
    search () {
      let data = {
        province: this.province,
        city: this.city,
        storeName: this.searchVal
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
      this.show1 = false
    },
    //选中市
    onConfirm (value) {
      this.city = value;
      this.show = false;
      this.show1 = true
      this.getqueryShopInfo();
    },
    onConfirms (value) {
      this.province = value[0] || ''
      this.city = value[1] || ''
      this.search()
      this.showPicker = false
      this.showSearch = true
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
    getqueryNearStore () {
      console.log(this.shareAddress, 'shareAddress');
      // let latitude = this.latitude
      // let longitude = this.longitude
      const data = {
        latitude: this.shareAddress.latitude,
        longitude: this.shareAddress.longitude,
        count: 5,
        offset: 0
      }
      console.log(data)
      queryNearStore(data).then(res => {
        let list = res.data.data
        let all = {}
        //console.log(list);
        list.forEach(el => {
          if (el.siteAddress === this.storeAddress) {
            this.storePhone = el.telephoneNo
            this.storeNum = el.siteNo
          }
        });
        console.log(this.storeAddress, this.storePhone, this.storeNum)
        let arr = []
        if (res.data.data.length > 0) {
          this.province = res.data.data[0].province || ''
          this.city = res.data.data[0].city || ''
        }
        res.data.data.forEach(item => {
          arr.push({
            storeNum: item.siteNo,
            storePhone: item.telephoneNo || '',
            storeAddress: item.siteAddress || '',
            storeName: item.siteName
          })
        })
        this.listCard = arr
        console.log(this.listCard)

      })
    },
    checkPhone (phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        return false;
      }
      return true
    },
    //添加信息
    sendCard () {
      let num = this.num
      let openid = this.openid
      let name = this.name
      let phone = this.phone
      if (!this.username) {
        alert('请填写用户名')
        return
      }
      if (!this.userphone) {
        alert('请填写手机号码')
        return
      } else if (!this.checkPhone(this.userphone)) {
        alert('手机号填写有误！')
        return false
      }

      if (!this.storeName) {
        alert('请填写门店')
        return
      }

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
.content {
  position: absolute;
  width: 70%;
  top: 27%;
  left: 15%;
}
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
}
.byname {
  width: 100%;
  background: #ffffff;
  border: 0;
  border-bottom: 1px solid #99cceb;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  line-height: 25px;
  color: #99cceb;
}
.byphone {
  width: 100%;
  background: #ffffff;
  border: 0;
  border-bottom: 1px solid #99cceb;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 25px;
  color: #babfc8;
}
.footer {
  border: 1px solid #99cbea;
  width: 100%;
  margin-top: 15px;
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