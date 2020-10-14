<template>
  <div class="activities">
    <div>
      <div class="sel">
        <div class="image">
          <a @click="card('1')"><img src="../image/送闺蜜.png" alt="" /></a>
          <a @click="card('2')"><img src="../image/送美妈.png" alt="" /></a>
          <a @click="card('3')"><img src="../image/送好友.png" alt="" /></a>
        </div>
      </div>
      <div v-if="num === '1'">
        <div class="images1"></div>
        <!-- <van-image width="100%" :src="images" /> -->
      </div>
      <div v-else-if="num === '2'">
        <div class="images2"></div>
        <!-- <van-image width="100%" :src="images2" /> -->
      </div>
      <div v-else>
        <div class="images3"></div>
        <!-- <van-image width="100%" :src="images1" /> -->
      </div>
      <div class="footer" @click="send">
        <a>
          <img src="../image/发送卡片.png" alt="" />
        </a>
      </div>
      <div>
        <!-- <button class="card" @click="card('1')">闺蜜卡</button>
        <button class="card" @click="card('2')" style="background: #ffcd04">
          感恩卡
        </button>
        <button class="card" @click="card('3')" style="background: #ff8ea9">
          美妈卡
        </button> -->
      </div>
    </div>
    <!-- <div class="colorCard">
      <van-field name="radio" label="亲友卡">
        <template #input>
          <van-radio-group
            v-model="radio"
            direction="horizontal"
            icon-size="15"
          >
            <van-radio name="1">闺蜜卡</van-radio>
            <van-radio name="2">感恩卡</van-radio>
            <van-radio name="3">美妈卡</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <button class="card" @click="card('1')">闺蜜卡</button>
      <button class="card" @click="card('2')" style="background: #ffcd04">
        感恩卡
      </button>
      <button class="card" @click="card('3')" style="background: #ff8ea9">
        美妈卡
      </button>
    </div> -->
    <!-- <div class="select">
      <div class="text">赠送信息</div>
      <div class="user">
        <input type="text" class="name" v-model="username" />
        <input
          type="text"
          class="name"
          placeholder="被赠人姓名"
          style="margin-left: 45px"
          v-model="givename"
        />
        <div style="margin-top: 8px">
          <input type="text" class="name" v-model="userphone" />
          <input
            type="text"
            class="name"
            placeholder="被赠人电话"
            style="margin-left: 45px"
            v-model="givephone"
          />
        </div>
        <img src="../image/组件 14 – 2.png" />
      </div>
    </div>
    <div class="footer">
      <div class="shopText">门店信息</div>
      <div class="shop">
        <input type="text" placeholder="购买门店" style="width: 303px" />
        <input type="text" placeholder="门店电话" v-model="storePhone" />
        <textarea
          name="textarea"
          placeholder="门店地址"
          style="height: 96px"
          v-model="storeAddress"
        />
      </div>
    </div>
    <div> -->
    <!-- <van-button class="but" type="primary" to="/">取消</van-button> -->
    <!-- <van-button
        class="but"
        style="background: #f9cb5d; color: #ffffff"
        @click="save"
      >
        立即赠送
      </van-button>
    </div> -->
    <!-- <van-form>
      <van-field name="radio" label="亲友卡">
        <template #input>
          <van-radio-group
            v-model="radio"
            direction="horizontal"
            icon-size="15"
          >
            <van-radio name="1">闺蜜卡</van-radio>
            <van-radio name="2">感恩卡</van-radio>
            <van-radio name="3">美妈卡</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="shop"
        name="购买门店"
        label="购买门店"
        placeholder="给爷整个门店编码"
        :rules="[{ required: true, message: '请填写购买门店' }]"
      />
      <van-field
        v-model="username"
        name="亲爱的"
        label="亲爱的"
        placeholder="要送给谁捏"
        :rules="[{ required: true, message: '请填写亲爱的' }]"
      />
      <van-field
        v-model="userphone"
        name="联系方式"
        label="联系方式"
        placeholder="留下TA的联系方式"
        :rules="[{ required: true, message: '请填写联系方式' }]"
      />
      <div v-if="num === '1'">
        <van-image width="100%" height="270" :src="src" />
      </div>
      <div v-else-if="num === '2'">
        <van-image
          width="100%"
          height="270"
          src="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
      </div>
      <div v-else>
        <van-image
          width="100%"
          height="270"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <van-field
        v-model="givename"
        name="赠送人"
        label="赠送人"
        placeholder="请留下您的姓名"
        :rules="[{ required: true, message: '请填写赠送人' }]"
      />
      <van-field
        v-model="givephone"
        name="联系方式"
        label="联系方式"
        placeholder="请留下您的联系方式"
        :rules="[{ required: true, message: '请填写联系方式' }]"
      />
    </van-form>
    <div class="but">
      <van-button type="primary" size="small" to="/">取消</van-button>
      <van-button type="primary" size="small" @click="save"
        >立即赠送</van-button
      >
    </div> -->
  </div>
</template>
<script>
import { Addactivities } from '../api/index'
export default {
  data () {
    return {
      show: false,
      images: require('../image/6.jpg'),
      images1: require('../assets/image/朋友感恩文案.jpg'),
      images2: require('../assets/image/美妈文案.jpg'),
      radio: '1',
    }
  },
  computed: {
    num () {
      let radio = this.radio
      console.log(radio)
      return radio
    }
  },
  methods: {
    //显示对应的卡片
    card (value) {
      this.radio = value
      console.log(this.radio)
    },

    //发送卡片
    send () {
      sessionStorage.setItem('num', JSON.stringify(this.num))
      this.$router.push({ path: '/mycard', query: { num: this.num } })
    },
  }


}
</script>
<style scoped>
.images1 {
  width: 100%;
  height: 100vh;
  background: url(../image/6.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.images2 {
  width: 100%;
  height: 100vh;
  background: url(../image/8.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.images3 {
  width: 100%;
  height: 100vh;
  background: url(../image/7.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.activities {
  background: #ffffff;
  opacity: 1;
  width: 100%;
}
.sel {
  width: 100%;
  margin-top: 15px;
  position: absolute;
  z-index: 999;
}
.image {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.footer {
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  margin: 0%;
}
</style>