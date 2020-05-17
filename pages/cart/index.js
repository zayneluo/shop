// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetAddress(){
    wx.getSetting({
      success(res1){
        //拿到用户授权状态 true、false、undefined
        const auth = res1.authSetting['scope.address']
        //如果之前的授权状态是拒绝，打开设置页，让用户同意
        if (auth === false) {
          wx.openSetting({
            success(res2){
              wx.chooseAddress({
                success(res3){
                  console.log(res3)
                }
              })
            }
          })
        } else {
          wx.chooseAddress({
            success(res4){
              console.log(res4)
            }
          })
        }
      }
    })
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
