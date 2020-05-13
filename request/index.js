/**
 * 用Promise来封装微信请求
 * @param params
 * @returns {Promise<unknown>}
 */
let requestTimes = 0;
export const request = (params)=>{
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  requestTimes++
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url: baseUrl+params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete : () => {
        requestTimes--
        requestTimes===0&&wx.hideLoading()
      }
    });

  })
}
