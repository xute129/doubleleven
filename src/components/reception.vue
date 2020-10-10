<template>
  <div class="reception">
    <div v-for="(list, index) in listCard" :key="index" class="header">
      <div>
        亲爱的 {{ list.doneeName }}({{ list.doneePhone }})赠送你一张{{
          list.cardType
        }}：
      </div>
    </div>
    <van-swipe class="my-swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="img" />
      </van-swipe-item>
    </van-swipe>

    <div class="but">
      <van-button type="primary" to="/">取消</van-button>
      <van-button type="primary" @click="confirm">接受</van-button>
    </div>
    <!-- <div class="popups">
      <van-overlay :show="isShow" @click="isShow = false">
        <div class="wrapper">
          <div class="block" @click.stop>
            <van-field
              v-model="doneePhone"
              center
              clearable
              label="电话号码"
              placeholder="请核对手机号码"
            >
              <template #button>
                <van-button size="small" type="primary" @click="confirm"
                  >确定领券</van-button
                >
              </template>
            </van-field>
          </div>
        </div>
      </van-overlay>
    </div> -->
  </div>
</template>
<script>
import { getDonation, updateCard } from '../api/index'
export default {
  data () {
    return {
      message: '',
      listCard: [],
      isShow: false,
      doneePhone: '',
      images: [
        require('../assets/image/闺蜜文案.jpg'),
        require('../assets/image/品牌介绍.jpg'),
        require('../assets/image/活动套餐.jpg'),
        require('../assets/image/使用规则2.jpg'),
      ],
      tel: ''
    }
  },
  mounted () {
    this.getdonation()
  },
  methods: {
    //根据二维码返回的电话号码查询信息
    getdonation () {
      let data = {
        id: this.$route.query.id
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
          this.giverPhone = list[i].giverPhone
        }
        this.listCard = list
        console.log(this.listCard)
      })
    },

    //确定领券
    confirm () {
      let data = {
        id: this.$route.query.id
      }
      updateCard(data).then(res => {
        console.log(res)

      })
    }
  }
}
</script>
<style scope>
.reception {
  margin: 20px 15px;
}
.header {
  z-index: 1;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  height: 500px;
}
.img {
  width: 355px;
  height: 500px;
  max-width: 100%;
  max-height: 100%;
  margin-top: 12px;
}
.but {
  position: absolute;
  bottom: 0;
  left: 30px;
}
.but button {
  width: 100px;
  margin-left: 35px;
  margin-bottom: 10px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  margin: 0 15px;
}
</style>