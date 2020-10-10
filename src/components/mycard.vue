<template>
  <div>
    <div class="mycard" v-for="(item, index) in listCard" :key="index">
      <div class="text">{{ item.cardType }}</div>
      <div class="address" style="margin-top: 42px; margin-left: 12px">
        <img src="../image/地址.png" />
        <span>{{ item.store.storeAddress }}</span>
      </div>
      <div class="address">
        <img src="../image/电话1.png" alt="" /><span>{{
          item.store.storePhone
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getDonation } from '../api/index'
export default {
  data () {
    return {
      listCard: []
    }
  },
  created () {
    this.getdonation()
  },
  methods: {
    getdonation () {
      let data = {
        doneePhone: '12345678901'
      }
      getDonation(data).then(res => {
        let list = []
        let cardStatus = ''
        let cardType = ''
        list = res.data.data
        for (let i = 0; i < list.length; i++) {
          if (list[i].cardStatus === true) {
            cardStatus = '已领用'
          } else {
            cardStatus = '未领用'
          }
          if (list[i].cardType === 1) {
            cardType = '闺蜜卡'
          } else if (list[i].cardType === 2) {
            cardType = '感恩卡'
          } else {
            cardType = '美妈卡'
          }
          list[i].cardStatus = cardStatus
          list[i].cardType = cardType
        }
        this.listCard = list
        console.log(this.listCard)
      })
    }
  }
}
</script>
<style scoped>
.mycard {
  width: 351px;
  height: 202px;
  background: #ff9b43;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 4px;
  margin-left: 12px;
  margin-top: 9px;
}
.text {
  width: 108px;
  height: 46px;
  font-size: 36px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 46px;
  color: #ffffff;
  opacity: 1;
  padding-top: 21px;
  margin-left: 16px;
}
.address {
  margin-top: 9px;
  margin-left: 12px;
}
.address img {
  position: relative;
  top: 6px;
}
.address span {
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 20px;
  color: #ffffff;
  opacity: 1;
  margin-left: 4px;
  vertical-align: middle;
}
</style>