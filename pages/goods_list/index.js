// pages/goods_list/index.js
import {request} from '../../request/index'
Page({
  QueryParams: {
    //查询参数
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 20
  },
  //总页数
  totalPages: 1,
  /**
   * 页面的初始数据
   */
  data: {
    titleList: [
      {
        id: 0, text: "综合"
      }, {
        id: 1, text: "销量"
      }, {
        id: 2, text: "价格"
      }
    ],
    currentIndex: 0,
    goodsList: []
  },
  handleChangeIndex(e) {
    console.log(e.detail)
    let {index} = e.detail
    this.setData({
      currentIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
  const {cid} = options;
  this.QueryParams.cid = cid;
    // console.log(this.QueryParams)
    this.getGoodsList()
  },
  getGoodsList(){
    request({
      url: '/goods/search',
      data: this.QueryParams
    }).then(res=>{
      console.log(res)
      let newGoodsList = res.data.message.goods;
      const oldGoodsList = this.data.goodsList
      const total = res.data.message.total;
      this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
      this.setData({
        goodsList: [...oldGoodsList,...newGoodsList]
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
    // console.log('jajjajjaj')
    if (this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
        duration: 2000
      })
    }else {
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
