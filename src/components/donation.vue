<template>
  <div class="donation">
    <div class="image">
      <div class="list">
        <div class="header" v-for="(item, index) in listCard" :key="index">
          <div class="card" :style="{ background: color }"></div>
          <div class="textCard" :style="{ color: color }">
            {{ item.cardType }}
          </div>
          <div class="border" :style="{ color: receive }">
            {{ item.cardStatus }}
          </div>
          <div class="zeng">
            赠予<span>{{ item.doneeName }}</span>
          </div>
          <div class="phone">
            <img src="" />
            <span>{{ item.doneePhone }}</span>
          </div>
          <div class="footer">
            <div>
              门店地址：<span>{{ item.store.storeAddress }}</span>
            </div>
            <div>
              门店电话：<span>{{ item.store.storePhone }}</span>
            </div>
          </div>
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
      doneePhone: '',
      color: '',
    }
  },
  computed: {
    receive () {
      let list = this.listCard
      let color = ''
      for (let index = 0; index < list.length; index++) {
        color = list[index].cardStatus
        color === '未领用' ? '#38ADF1' : '#8D96A7'
      }
      return color
    }
  },
  created () {
    this.getdonation()
  },
  methods: {
    //根据条件查询信息
    getdonation () {
      let cardStatus = ''
      let cardType = ''
      let data = {
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
        console.log(this.color)
        this.listCard = list
      })
    }
  }
}
</script>
<style scoped>
.donation {
  width: 100%;
  display: flex;
  flex-wrap: wrap-reverse;
}
.image {
  background-image: url("../image/ping.jpg");
  width: 100%;
  height: 100%;
}
.list {
  height: 98vh;
  overflow-y: auto;
}
.header {
  width: 351px;
  height: 170px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: 11px;
  position: relative;
  left: 12px;
  top: 0px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.card {
  width: 5px;
  height: 30px;
  background: #ff9b43;
  opacity: 1;
  border-radius: 4px 0px 0px 0px;
}
.textCard {
  width: 51px;
  height: 21px;
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 21px;
  color: #ff9b43;
  opacity: 1;
  margin-left: 8px;
  margin-top: 4px;
}
.border {
  width: 50px;
  height: 20px;
  border: 1px solid #38adf1;
  opacity: 1;
  border-radius: 2px;
  margin-top: 4px;
  margin-left: 232px;
  font-size: 13px;
  line-height: 20px;
  color: #38adf1;
  text-align: center;
}

.zeng {
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 21px;
  color: #babfc8;
  opacity: 1;
  margin-top: 15px;
  margin-left: 12px;
}
.zeng span {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 25px;
  color: #333944;
  opacity: 1;
  margin-left: 11px;
}
.phone {
  position: relative;
  top: -32px;
}
.phone img {
  opacity: 1;
  border-radius: 4px;
  margin-left: 59px;
  position: relative;
  top: 16px;
}
.phone span {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 25px;
  color: #333944;
  opacity: 1;
  position: relative;
  top: 12px;
}
.footer {
  width: calc(100% - 20px);
  height: 82px;
  background: #f5f8f9;
  border-radius: 4px;
  position: relative;
  top: -23px;
  left: 0px;
  margin: 0;
  margin-left: 10px;
}
.footer div {
  font-size: 15px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 19px;
  color: #8d96a7;
  opacity: 1;
  margin-left: 9px;
  margin-top: 8px;
}
</style>