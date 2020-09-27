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