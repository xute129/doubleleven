<template>
  <div class="admin">
    <input type="text" placeholder="请输入门店编号" />
    <div><van-button type="primary">查询</van-button></div>
    <div class="footer">
      操作说明: <br />1.输入门店编号查询相应门店的活动详情。
      2.找到与顾客提供信息相同的条目。<br />
      3.记录相关信息即可开始护理。
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      shop: ''
    }
  }
}
</script>
<style scope>
.admin input {
  width: 327px;
  height: 48px;
  background: #f5f7f9;
  opacity: 1;
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