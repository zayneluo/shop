// pages/cart/index.js
import {getSetting,openSetting,getAddress} from '../../request/index'
import lodash from '../../utils/lodash'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  handleTap(){
    this.getUserAddress()
  },
  async getUserAddress(){
    try {
      const res = await getSetting();
      if (res.authSetting["scope.address"] === false ){
        await openSetting()
      }
      const res2 = await getAddress()
      res2.detailAddress = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
      // console.log(res2)
      this.setData({
        address : res2
      })
      wx.setStorageSync('address',res2)
    }catch (e) {
      console.log(e)
    }
  },
  countData(carts){
    //计算购物车全选，总件数，总价格
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    carts.forEach((item)=>{
      if (item.checked){
        totalPrice += item.goods_price*item.num
        totalNum += item.num
      }else {
        allChecked = false
      }
    })
    this.setData({
      allChecked,
      totalPrice,
      totalNum
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
    const carts = wx.getStorageSync('carts')
    this.setData({
      carts,address
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
