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