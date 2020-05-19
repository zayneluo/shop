// pages/cart/index.js
import {getSetting, openSetting, getAddress,showToast,showModal,request,payment} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
    totalPrice: 0,
    totalNum: 0
  },
  countData(carts) {
    //计算购物车全选，总件数，总价格
    let totalPrice = 0
    let totalNum = 0
    carts.forEach((item) => {
      if (item.checked) {
        totalPrice += item.goods_price * item.num
        totalNum += item.num
      }
    })
    //解决商品删完后全选按钮checked =false
    this.setData({
      totalPrice,
      totalNum
    })
  },
  async handleOrderPay (){
    const token = wx.getStorageSync('token')
    if (!token){
      //跳转到auth页面进行用户授权操作
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return
    }
    //构造订单参数
    const {totalPrice,address,carts} = this.data
    const order_price = totalPrice;
    const consignee_addr = address.detailAddress
    const goods = carts.map(value => {
      return {
        goods_id: value.goods_id,
        goods_number: value.num,
        goods_price: value.goods_price
      }
    })
    const orderParams = {order_price,consignee_addr,goods}
    //开始创建订单
    const {order_number} = await request({url: '/my/orders/create',method: 'post',data:orderParams,header:{Authorization:token}})
    //获取支付参数
    const {pay} = await request({url: '/my/orders/req_unifiedorder',method: 'post',data:{order_number},header:{Authorization:token}})
    await payment(pay)
    //查询订单状态
    const message = await request({url: '/my/orders/chkOrder',method: 'post',data:{order_number},header:{Authorization:token}})
    await showToast({
      title: message
    })
    //更新购物车数据
    // this.setData({
    //   carts: carts.filter(v=>!v.checked)
    // })
    let localCarts = wx.getStorageSync('carts')
    wx.setStorageSync('carts',localCarts.filter(v=>!v.checked))
    wx.navigateTo({
      url: '/pages/order/index'
    })
  },
  async handleBalance(){
    //需要有选中的商品并且有收货地址 再跳转到支付页面
    const {totalNum,address} = this.data
    if (!totalNum) {
      await showToast({title: '您没有选中商品',duration: 500,icon: 'none'})
      return
    }
    if (!address.cityName){
      await showToast({title: '您没有收货地址',duration: 500,icon: 'none'})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address')
    // this.setData({address})
    //获取缓存中购物车数据
    let carts = wx.getStorageSync('carts')
    //筛选购物车中没有选中的商品
    carts = carts.filter(v=>v.checked)
    this.setData({
      carts, address
    })
    this.countData(carts)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
