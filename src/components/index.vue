<template>
  <div class="hello">
    <div class="img">
      <img src="../assets/logo.png" />
    </div>

    <div class="but">
      <van-button type="primary" to="/activities">参与活动</van-button>
      <van-button type="primary" @click="isShow = true">我的转赠</van-button>
    </div>
    <div class="popups">
      <van-overlay :show="isShow" @click="isShow = false">
        <div class="wrapper">
          <div class="block" @click.stop>
            <van-field
              v-model="giverPhone"
              center
              clearable
              label="电话号码"
              placeholder="请核对手机号码"
            >
              <template #button>
                <van-button size="small" type="primary" @click="getdonation"
                  >确定</van-button
                >
              </template>
            </van-field>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import { getDonation } from '../api/index'
export default {
  data () {
    return {
      isShow: false,
      giverPhone: ''
    }
  },
  methods: {
    getdonation () {
      let data = {
        giverPhone: this.giverPhone
      }
      console.log(data)
      getDonation(data).then(res => {
        let list = []
        list = res.data.data
        console.log(list)
        let giverPhone = this.giverPhone
        for (let i = 0; i < list.length; i++) {
          console.log(list[i].giverPhone)
          if (list[i].giverPhone === giverPhone) {
            this.$router.push({ path: '/donation', query: { giverPhone: this.giverPhone } })
          } else {
            this.$toast('请输入正确的手机号');
          }
        }


      })
    }
  }
}
</script>

<style scoped>
.hello {
  text-align: center;
}
.hello .img {
  height: 600px;
  background: chocolate;
}
.hello .but {
  position: absolute;
  bottom: 0;
  left: 30px;
}
.hello .but button {
  margin-left: 50px;
  margin-bottom: 10px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
