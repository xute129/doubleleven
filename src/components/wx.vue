<template>
  <div>
    <img src="../image/我的卡(1).jpg" class="wx" />
    <div v-for="(item, index) in listCard" :key="index">
      <div class="card">{{ item.cardType }}</div>
      <div class="select">
        <div class="shop">
          <img src="../image/dizhi.png" style="width: 18px; height: 18px" />
          {{ item.store.storeName }}
        </div>
        <div class="address">
          <img src="../image/图标.png" style="width: 18px; height: 18px" />
          {{ item.store.storeAddress }}
        </div>
        <div class="phone">
          <img src="../image/电话.png" style="width: 18px; height: 18px" />
          {{ item.store.storePhone || "无" }}
        </div>
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
    }
  },
  mounted () {
    this.getdonation()
  },
  methods: {
    //根据分享id查询信息
    getdonation () {
      let data = {
        id: this.$route.query.id
      }
      getDonation(data).then(res => {
        let list = []
        let cardType = ''
        list = res.data.data
        for (let i = 0; i < list.length; i++) {
          if (list[i].cardType === 1) {
            cardType = '闺蜜卡'
          } else if (list[i].cardType === 2) {
            cardType = '美妈卡'
          } else {
            cardType = '好友卡'
          }
          list[i].cardType = cardType
        }
        this.listCard = list
        console.log(this.listCard)
      })
    },
  }
}
</script>
<style  scoped>
.wx {
  width: 100%;
  height: 100%;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.card {
  font-size: 26px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 46px;
  color: #99cceb;
  position: absolute;
  top: 69px;
  left: 28px;
}
.select {
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 30px;
  color: #99cceb;
  position: absolute;
  left: 28px;
  top: 139px;
}
.address {
  width: 291px;
  text-align: left;
}
.select img {
  vertical-align: middle;
}
</style>