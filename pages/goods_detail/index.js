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
    this.getGoodsDetail(goods_id)

  },
  async getGoodsDetail(goods_id){
    const res = await request({url: '/goods/detail', data: {goods_id}})
    this.setData({
      goodsDetail: res
    })
  },
  handleImagePreview(e) {
    const {goodsDetail} = this.data;
    const urls = goodsDetail.pics.map(v => v.pics_mid_url)
    const current = e.currentTarget.dataset.current
    wx.previewImage({
      urls,
      current
    })
  },
  handleCartAdd() {
    const {goodsDetail} = this.data
    //本地存储购物车的数据 对象数组 需要判断新增的商品是否已存在
    let cartList = wx.getStorageSync('carts') || []
    const index = cartList.findIndex(v => v.goods_id === goodsDetail.goods_id)
    if (index === -1) {
      cartList.push({
        goods_id: goodsDetail.goods_id,
        goods_name: goodsDetail.goods_name,
        goods_price: goodsDetail.goods_price,
        goods_small_logo: goodsDetail.goods_small_logo,
        num: 1,
        //为购物车是否选中新增一个属性
        checked : true
      })
    } else {
      console.log('else')
      cartList[index].num++

    }
    wx.setStorageSync('carts', cartList)
    wx.showToast({
      title: '添加成功',
      mask: true,
      duration: 500
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
