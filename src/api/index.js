/*
    包含N个接口请求函数的模块
    函数的返回值：promise对象
*/

import requset from '../service/request'
import apiUrl from '../service/apiUrl'

//添加信息
export const Addactivities = (data) => {
    return requset({
        url: apiUrl.addCard,
        method: 'post',
        data
    })
}

//查询卡券
export const getDonation = (data) => {
    return requset({
        url: apiUrl.queryCard,
        method: 'post',
        data
    })
}

//修改卡券
export const updateCard = (data) => {
    return requset({
        url: apiUrl.updateCard,
        method: 'post',
        data
    })
}

//微信授权
export const getWxUserInfo = (data) => {
    return requset({
        url: apiUrl.WxUserInfo,
        method: 'post',
        data
    })
}

//微信分享
export const getSignature = (data) => {
    return requset({
        url: apiUrl.Signature,
        method: 'post',
        data
    })
}

//经纬度查询门店
export const queryNearStore = (data) => {
    return requset({
        url: apiUrl.queryNearStore,
        method: 'post',
        data
    })
}

//省市查询门店
export const queryShopInfo = (data) => {
    return requset({
        url: apiUrl.queryShopInfo,
        method: 'post',
        data
    })
}

//查询所有门店
export const queryListStore = (data) => {
    return requset({
        url: apiUrl.queryListStore,
        method: 'post',
        data
    })
}