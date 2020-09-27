<template>
  <div class="activities">
    <van-form>
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
      <van-field
        v-model="message"
        rows="4"
        autosize
        label="留言"
        type="textarea"
        placeholder="请输入留言"
      />
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
    </div>
  </div>
</template>
<script>
import { Addactivities } from '../api/index'
export default {
  data () {
    return {
      radio: '1',
      shop: '',
      username: '',
      userphone: '',
      message: '',
      givename: '',
      givephone: '',
      id: ''
    }
  },
  methods: {
    save () {
      if (this.shop === '') {
        this.$toast('请输入门店');
        return false
      } else if (this.username === '') {
        this.$toast('请输入亲爱的');
        return false
      } else if (this.userphone === '') {
        this.$toast('请输入手机号');
        return false
      } else if (this.givename === '') {
        this.$toast('请输入姓名');
        return false
      } else if (this.givephone === '') {
        this.$toast('请输入手机号');
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
  margin-top: 30px;
}
.but {
  position: absolute;
  bottom: 0;
  left: 30px;
}
.but button {
  width: 100px;
  margin-left: 40px;
  margin-bottom: 10px;
}
</style>