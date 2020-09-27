<template>
  <div class="donation">
    <div class="header" v-for="(item, index) in listCard" :key="index">
      <div class="list">
        <img src="../assets/logo.png" style="width: 80px; height: 80px" />
      </div>
      <div class="right">
        <div class="left">被赠人：{{ item.doneeName }}</div>
        <div class="left" style="margin-left: 5px">
          联系方式：{{ item.doneePhone }}
        </div>
        <div class="left" style="color: #999">{{ item.cardStatus }}</div>
        <div style="font-size: 12px">赠送卡类型：{{ item.cardType }}</div>
        <div style="font-size: 10px">使用门店地址：{{ item.storeAddress }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDonation } from '../api/index'
export default {
  data () {
    return {
      listCard: [],
      doneePhone: ''
    }
  },
  watch: {
    doneePhone (val) {
      val = this.doneePhone
      this.getdonation(val)
    }
  },
  mounted () {
    this.doneePhone = this.$route.query.doneePhone
  },
  methods: {
    getdonation (doneePhone) {
      let cardStatus = ''
      let cardType = ''
      let data = {
        doneePhone: doneePhone,
        giverPhone: this.$route.query.giverPhone
      }
      getDonation(data).then(res => {
        console.log(res.data)
        let list = []

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
      })
    }
  }
}
</script>
<style scoped>
.donation {
  margin-top: 20px;
  margin: 0 10px;
  font-size: 8px;
  line-height: 24px;
}
.donation .header {
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #999999;
}
.donation .list {
  float: left;
}
.right {
  position: relative;
  left: 10px;
}
.donation .right .left {
  display: inline-block;
  vertical-align: bottom;
}
</style>