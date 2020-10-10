<template>
  <div class="activities">
    <div class="image">
      <div v-if="num === '1'">
        <img src="../assets/image/闺蜜文案.jpg" />
      </div>
      <div v-else-if="num === '2'">
        <img src="../assets/image/朋友感恩文案.jpg" />
      </div>
      <div v-else>
        <img src="../assets/image/美妈文案.jpg" />
      </div>
    </div>
    <div class="colorCard">
      <!-- <van-field name="radio" label="亲友卡">
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
      </van-field> -->
      <button class="card" @click="card('1')">闺蜜卡</button>
      <button class="card" @click="card('2')" style="background: #ffcd04">
        感恩卡
      </button>
      <button class="card" @click="card('3')" style="background: #ff8ea9">
        美妈卡
      </button>
    </div>
    <div class="select">
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
    <div>
      <van-button class="but" type="primary" to="/">取消</van-button>
      <button
        class="but"
        style="background: #f9cb5d; color: #ffffff"
        @click="save"
      >
        立即赠送
      </button>
    </div>
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
      images: [
        require('../assets/image/闺蜜文案.jpg'),
        require('../assets/image/品牌介绍.jpg'),
        require('../assets/image/活动套餐.jpg'),
        require('../assets/image/使用规则2.jpg'),
      ],
      radio: '1',
      username: '',  //送卡人名字
      userphone: '', //送卡人电话
      givename: '',  //被赠人名字
      givephone: '', //被赠人电话
      storeAddress: '', //门店地址
      storePhone: '', //门店电话
      storeNum: '' //门店编号
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
    card (value) {
      this.radio = value
      console.log(this.radio)
    },
    //添加信息
    save () {
      if (this.username === '') {
        this.$toast('请输入亲爱的');
        return false
      } else if (this.userphone === '') {
        this.$toast('请输入手机号');
        return false
      } else if (this.givename === '') {
        this.$toast('请输入被赠人姓名');
        return false
      } else if (this.givephone === '') {
        this.$toast('请输入被赠人姓名手机号');
        return false
      }
      let data = {
        cardType: this.radio,
        doneeName: this.username,
        doneePhone: this.userphone,
        giverName: this.givename,
        giverPhone: this.givephone,
        storeNum: '8200'
      }
      Addactivities(data).then(res => {
        console.log(res)
        this.$router.push({ path: '/givecode', query: { id: res.data.data } })
      })
    }
  }


}
</script>
<style scoped>
.activities {
  width: 375px;
  background: #ffffff;
  opacity: 1;
}
.image {
  margin-left: 12px;
  margin-top: 13px;
}
.image img {
  height: 400px;
  width: 350px;
}
.colorCard {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.card {
  width: 107px;
  height: 58px;
  background: #ff9b43;
  opacity: 1;
  border-radius: 4px;
  margin-left: 14px;
  margin-top: 10px;
  border: 0px;
  color: #ffffff;
}

.select {
  width: 375px;
  height: 163px;
  background: #ffffff;
  opacity: 1;
}
.select .text {
  font-size: 15px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 19px;
  color: #5e5e5e;
  opacity: 1;
  margin-left: 13px;
  margin-top: 8px;
}
.select .name {
  width: 148px;
  height: 48px;
  background: #f5f7f9;
  opacity: 1;
  border-radius: 4px;
  border: 0px;
}
.select .user {
  margin-left: 12px;
  margin-top: 16px;
}
.select .user img {
  position: relative;
  left: 152px;
  top: -80px;
}
.footer {
  width: 375px;
  height: 250px;
  background: #ffffff;
  opacity: 1;
  margin-top: 8px;
}
.shopText {
  width: 60px;
  height: 19px;
  font-size: 15px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 19px;
  color: #5e5e5e;
  opacity: 1;
  margin-left: 13px;
}
.shop input,
textarea {
  width: 351px;
  height: 48px;
  background: #f5f7f9;
  opacity: 1;
  border-radius: 4px;
  border: 0px;
  margin-left: 13px;
  margin-top: 16px;
}
.but {
  width: 170px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #dedede;
  opacity: 1;
  border-radius: 4px;
  margin-top: 24px;
  margin-left: 13px;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 25px;
  color: #a8a8a8;
  margin-bottom: 12px;
}
</style>