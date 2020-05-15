// pages/goods_detail/index.js
import {request} from "../../request/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    // console.log(goods_id)
    request({url: '/goods/detail', data: {goods_id}}).then(res => {
      // console.log(res)
      this.setData({
        goodsDetail: res.data.message
      })
    })
  },
  handleImagePreview(e){
    const {goodsDetail} = this.data;
    const urls = goodsDetail.pics.map(v=>v.pics_mid_url)
    const current = e.currentTarget.dataset.current
    wx.previewImage({
      urls,
      current
    })
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
