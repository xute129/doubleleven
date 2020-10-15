<template>
  <div class="admin">
    <input type="text" v-model="storeNum" placeholder="请输入门店编号" />
    <div><van-button type="primary" @click="query">查询</van-button></div>
    <div class="footer">
      操作说明:
      <div>1.输入门店编号查询相应门店的活动详情。</div>
      <div>2.找到与顾客提供信息相同的条目。</div>
      <div>3.记录相关信息即可开始护理。</div>
    </div>
  </div>
</template>
<script>
import { getDonation } from '../api/index'
export default {
  data () {
    return {
      storeNum: ''
    }
  },
  methods: {
    query () {
      console.log(this.storeNum);
      this.$router.push({ path: '/details', query: { storeNum: this.storeNum } })
    }
  }
}
</script>
<style scoped>
.admin input {
  width: 327px;
  height: 48px;
  font-size: 17px;
  background: #f5f7f9;
  border-radius: 4px;
  border: 0px;
  margin-left: 24px;
  margin-top: 31px;
  text-align: center;
}
.admin button {
  width: 327px;
  height: 48px;
  background: #f9cb5d;
  opacity: 1;
  border-radius: 6px;
  border: 0px;
  margin-left: 24px;
  margin-top: 24px;
}
.footer {
  width: 327px;
  height: 156px;
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 26px;
  color: #333944;
  opacity: 1;
  margin-left: 24px;
  margin-top: 24px;
}
</style>