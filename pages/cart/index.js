// pages/cart/index.js
import {getSetting,openSetting,getAddress} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    }catch (e) {
      console.log(e)
    }


  },
  handleGetUserInfo(e){
    console.log(e)
  },
  handleGetAuth(){
    wx.getSetting({
      complete: (res) => {
        console.log(res);

      },
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
