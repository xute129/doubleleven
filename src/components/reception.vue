<template>
  <div class="reception">
    <div class="img">
      <van-swipe
        class="my-swipe"
        style="height: 100vh"
        vertical
        :loop="false"
        @change="showIs"
      >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" class="img" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator"></div>
        </template>
      </van-swipe>
    </div>
    <div v-if="show">
      <div class="header" v-for="(item, index) in listCard" :key="index">
        <div class="love">
          亲爱的{{ item.doneeName }}({{ item.doneePhone }}):
        </div>
        <div class="love">
          {{ item.giverName }}({{ item.giverPhone }})送你一张{{ item.cardType }}
        </div>
      </div>
    </div>
    <div class="but" @click="confirm">
      <a><img src="../image/接收赠卡.png" /></a>
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
        require('../assets/image/活动套餐.jpg'),
        require('../image/5(5).jpg'),
        require('../assets/image/品牌介绍.jpg'),
      ],
      tel: '',
      show: true
    }
  },

  mounted () {
    this.getdonation()
  },
  methods: {
    showIs (index) {
      if (index === 0) {
        this.show = true
      } else {
        this.show = false
      }
    },
    //根据分享id查询信息
    getdonation () {
      let data = {
        id: parseInt(this.$route.query.id)
      }
      getDonation(data).then(res => {
        if (res.data.statusCode !== 200) {
          alert('未获取到用户信息')
        }
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
          this.giverPhone = list[i].giverPhone
        }
        this.listCard = list
        console.log(this.listCard)
        this.image1()
      })
    },

    //确定领券
    confirm () {
      let data = {
        id: this.$route.query.id
      }
      updateCard(data).then(res => {
        console.log(res)
        this.$router.push({ path: '/wx', query: { id: this.$route.query.id } })
      })
    },
    image1 () {
      let image1 = ''
      let cardType = ''
      let list = this.listCard
      list.forEach(el => {
        cardType = el.cardType
        console.log(el.cardType);
      });

      if (cardType === '闺蜜卡') {
        image1 = require('../image/收卡-闺蜜文案(1).jpg')
      } else if (cardType === '美妈卡') {
        image1 = require('../image/收卡-美妈文案(1).jpg')
      } else {
        image1 = require('../image/收卡-朋友文案(1).jpg')
      }
      this.images.splice(0, 0, image1)
      console.log(this.images);
    }
  }
}
</script>
<style scope>
.reception {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  position: absolute;
  top: 60px;
  left: 29px;
  z-index: 999;
}
.love {
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 25px;
  color: #216452;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
.img {
  width: 100%;
}
.but {
  position: absolute;
  bottom: 20px;
  margin: 0 120px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>