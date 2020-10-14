

//请求的接口
export default {
    addCard: '/card/addCard',   //添加卡券
    queryCard: '/card/queryCard',   //查詢卡券
    updateCard: '/card/updateCard',  //修改卡券
    WxUserInfo: '/wx/getWxUserInfo', //微信授权
    Signature: '/wx/wechat/getSignature', //微信分享
    queryNearStore: '/store/queryNearStore', //查询附近门店
    queryShopInfo: '/store/queryShopInfo', //根据省市查询门店信息
    queryListStore: '/store/queryListStore', //查询所有门店
    queryShopProvinceOrCity: '/store/queryShopProvinceOrCity' //查询省市
}