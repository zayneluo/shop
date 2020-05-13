// pages/index/index.js
//需要将路径补全
import {request} from "../../request/index.js"

// console.log(request)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catList: [],
    floorList: []
  },
  getSwiperData() {
    request({
      url: '/home/swiperdata'
    }).then(res => {
      this.setData({
        swiperList: res.data.message
      })
    })
  },
  getCatItems() {
    request({
      url: '/home/catitems'
    }).then(res => {
      this.setData({
        catList: res.data.message
      })
    })
  },
  getFloorData(){
    request({
      url: '/home/floordata'
    }).then(res => {
      this.setData({
        floorList: res.data.message
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperData()
    this.getCatItems()
    this.getFloorData()
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
