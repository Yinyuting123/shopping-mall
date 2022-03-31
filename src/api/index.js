import request from './request';
import mockRequest from './mockRequest'

export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });

// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequest.get('/banner')

//获取floor数据
export const reqGetFloorList = () => mockRequest.get('/floor');

// 获取搜索结果
export const reqGetSearchList = (params) => request({
    url: '/list',
    method: 'post',
    data: params
})

// 获取商品详情
export const reqGetGoodInfo = (skuId) => request({
    url: `/item/${skuId}`,
    method: 'get'
})

// 添加到购物车
export const reqAddToCart = (params) => request({
    url: `/cart/addToCart/${params.skuId}/${params.skuNum}`,
    method: 'post'
})

// 获取购物车列表
export const reqGetShopcartList = () => request({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车商品
export const reqDeleteCart = (skuId) => request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 切换商品选中状态
export const reqUpdateChecked = (params) => request({
    url: `/cart/checkCart/${params.skuId}/${params.isChecked}`,
    method: 'get'
})

// 获取验证码
export const reqGetCode = (phone) => request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 注册用户
export const reqRegisterUser = (data) => request({
    url: `/user/passport/register`,
    method: 'post',
    data
})

// 登录
export const reqLogin = (data) => request({
    url: '/user/passport/login',
    method: 'post',
    data
})

// 获取用户信息
export const reqGetUserInfo = () => request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

// 退出登录
export const reqLogout = () => request({
    url: '/user/passport/logout',
    method: 'get'
})

// 获取用户地址信息
export const reqGetUserAddressList = () => request({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

// 获取订单交易页信息
export const reqGetTradeInfo = () => request({
    url: '/order/auth/trade',
    method: 'get'
})

// 提交订单
export const reqSubmitOrder = (params, data) => request({
    url: '/order/auth/submitOrder',
    method: 'post',
    params,
    data
})

//获取支付信息
export const reqGetPayInfo = (orderId)=>request({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
});


//获取支付订单状态
export  const reqGetPayStatus = (orderId)=>request({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
});

//获取个人中心的数据
export const reqMyOrderList = (page,limit)=>request({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
});

