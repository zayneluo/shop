// pages/category/index.js
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [],
    goodsList: [],
    currentIndex: 0,
    scrollTop : 0
  },
  Cates: [],
  handleTitleChane(e) {
    // console.log(e)
    let {index} = e.target.dataset
    const goodsList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      goodsList,
      scrollTop : 0
    })
  }
  ,


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates()
    this.loadData()
  },
  loadData(){
    //使用本地存储优化加载速度
    const localCate = wx.getStorageSync('cates')
    if (localCate){
      if ((Date.now() - localCate.time)>1000*60){
        this.getCates()
      }else {
        this.Cates = localCate.data
        const menuList = this.Cates.map((item) => {
          return item.cat_name
        })
        const goodsList = this.Cates[0].children
        this.setData({
          menuList,
          goodsList
        })
      }
    }else {
      this.getCates()
    }
  },
  getCates() {
    request({url: '/categories'}).then(res => {
      // console.log(res)
      this.Cates = res.data.message
      wx.setStorageSync('cates',{
        data: this.Cates,
        time: Date.now()
      })
      const menuList = this.Cates.map((item) => {
        return item.cat_name
      })
      const goodsList = this.Cates[0].children
      this.setData({
        menuList,
        goodsList
      })
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
