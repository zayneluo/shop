// pages/cart/index.js
import {getSetting, openSetting, getAddress,showToast,showModal} from '../../request/index'

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
  handleTap() {
    this.getUserAddress()
  },
  async getUserAddress() {
    try {
      const res = await getSetting();
      if (res.authSetting["scope.address"] === false) {
        await openSetting()
      }
      const res2 = await getAddress()
      res2.detailAddress = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
      // console.log(res2)
      this.setData({
        address: res2
      })
      wx.setStorageSync('address', res2)
    } catch (e) {
      console.log(e)
    }
  },
  selectAll(){
    let {allChecked,carts} = this.data
    carts.forEach(v=>v.checked = !allChecked)
    this.setData({
      carts
    })
    this.countData(carts)
  },
  countData(carts) {
    //计算购物车全选，总件数，总价格
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    carts.forEach((item) => {
      if (item.checked) {
        totalPrice += item.goods_price * item.num
        totalNum += item.num
      } else {
        allChecked = false
      }
    })
    //解决商品删完后全选按钮checked =false
    allChecked = carts.length === 0 ? false : allChecked
    this.setData({
      allChecked,
      totalPrice,
      totalNum
    })
  },
  //商品单选功能
  handleItemChange(e) {
    //获取要修改的索引
    const {index} = e.target.dataset
    const {carts} = this.data
    //对应元素属性取反
    carts[index].checked = !carts[index].checked

    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts)
    //重新计算
    this.countData(carts)
  },
  //商品数量编辑
  async handleNumEdit(e) {
    const {operation, index} = e.target.dataset
    // console.log(operation,index)
    const {carts} = this.data
    let _this = this
    if (operation === 'minus') {
      if (carts[index].num === 1) {

        // wx.showModal({
        //   title: '提示',
        //   content: '你确定要删除该商品吗？',
        //   success(res) {
        //     if (res.confirm) {
        //       carts.splice(index, 1)
        //       // debugger
        //       _this.setData({
        //         carts
        //       })
        //       _this.countData(carts)
        //       wx.setStorageSync('carts', carts)
        //     } else {
        //       carts[index].num = 1
        //     }
        //   }
        // })
       let res =  await showModal({title: '提示',content: '你确定要删除该商品吗？'})
        // console.log(res)
        if (res.confirm){
          carts.splice(index,1)
          this.setData({
            carts
          })
          this.countData(carts)
          wx.setStorageSync('carts',carts)
        }
      } else {
        carts[index].num--
      }

    } else {
      carts[index].num++
    }

    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts)
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
    const carts = wx.getStorageSync('carts')
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
