<template>
  <div class="details">
    <div class="image">
      <div class="header">
        <div class="card"></div>
        <div class="textCard">闺蜜卡</div>
        <div class="border"><span>未领取</span></div>
        <div class="zeng"><span>臧紫宜</span><br />13188656331</div>
        <div class="zeng" style="margin-left: 106px">
          <span>臧紫宜</span><br />13188656331
        </div>
        <div class="footer">
          <div>门店地址：<span>广州市天河区猎德街道珠江东路6号</span></div>
          <div>门店电话：<span>18678471296</span></div>
        </div>
        <img src="" />
      </div>

      <div class="header">
        <div class="card"></div>
        <div class="textCard">闺蜜卡</div>
        <div class="border"><span>未领取</span></div>
        <div class="zeng"><span>臧紫宜</span><br />13188656331</div>
        <div class="zeng" style="margin-left: 106px">
          <span>臧紫宜</span><br />13188656331
        </div>
        <div class="footer">
          <div>门店地址：<span>广州市天河区猎德街道珠江东路6号</span></div>
          <div>门店电话：<span>18678471296</span></div>
        </div>
        <img src="" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.details {
  display: flex;
  flex-wrap: wrap-reverse;
}
.image {
  background-image: url("../image/ping.jpg");
  width: 100%;
  height: 667px;
}
.header {
  width: 351px;
  height: 208px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 4px;
  position: relative;
  left: 12px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 12px;
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
}
.border span {
  width: 39px;
  height: 16px;
  font-size: 13px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 16px;
  color: #38adf1;
  padding-top: 2px;
  margin-left: 6px;
  opacity: 1;
}
.zeng {
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 30px;
  color: #babfc8;
  opacity: 1;
  margin-top: 15px;
  margin-left: 12px;
  text-align: center;
}
.zeng span {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  line-height: 25px;
  color: #333944;
  opacity: 1;
  margin-left: 8px;
}

.footer {
  width: 335px;
  height: 82px;
  background: #f5f8f9;
  opacity: 1;
  border-radius: 4px;
  margin-left: 8px;
  margin-top: 8px;
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
img {
  position: relative;
  left: 152px;
  top: -150px;
  width: 50px;
  height: 50px;
}
</style>