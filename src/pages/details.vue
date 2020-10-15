<template>
  <div class="donation">
    <div class="image">
      <div class="list">
        <div class="header" v-for="(item, index) in listCard" :key="index">
          <div class="card"></div>
          <div class="textCard">
            {{ item.cardType }}
          </div>
          <div class="border">
            {{ item.cardStatus }}
          </div>
          <div class="user">
            <div class="zeng">
              <div class="name">{{ item.doneeName }}</div>
              <div class="phone">{{ item.doneePhone }}</div>
            </div>
            <div>
              <img src="../image/组件 14 – 1.png" />
            </div>
            <div class="zeng">
              <div>{{ item.doneeName }}</div>
              <div>{{ item.doneePhone }}</div>
            </div>
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
      listCard: []
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      getDonation({ storeNum: this.$route.query.storeNum }).then(res => {
        console.log(res.data.data);
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
            cardType = '美妈卡'
          } else {
            cardType = '好友卡'
          }
          list[i].cardStatus = cardStatus
          list[i].cardType = cardType
        }
        this.listCard = res.data.data
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
  height: 25vh;
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
.user {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 2%;
}
.zeng {
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 30px;
  margin: 0 5%;
  color: #babfc8;
  text-align: center;
}
.name {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.footer {
  width: calc(100% - 20px);
  height: 82px;
  background: #f5f8f9;
  border-radius: 4px;
  margin: 0 2.5%;
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