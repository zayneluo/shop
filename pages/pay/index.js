// pages/cart/index.js
import {getSetting, openSetting, getAddress,showToast,showModal} from '../../request/index'

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
  handleOrderPay (){
    //跳转到auth页面进行用户授权操作
    wx.navigateTo({
      url: '/pages/auth/index'
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
