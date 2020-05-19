/**
 * 用Promise来封装微信请求
 * @param params
 * @returns {Promise<Function>}
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
        // resolve(result)
        if (result.data.meta && result.data.meta.status === 200){
          resolve(result.data.message)
        }else{
          reject(result)
        }

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
/**
 * 封装微信获取设置
 * @returns {Promise<Function>}
 */
export const getSetting = () => {
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(reject)
      }
    })
  })
}
/**
 * 封装微信获取地址
 * @returns {Promise<Function>}
 */
export const getAddress = () => {
  return new Promise((resolve, reject)=>{
    wx.chooseAddress({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(reject)
      }
    })
  })
}
/**
 * 封装微信打开设置
 * @returns {Promise<unknown>}
 */
export const openSetting = () =>{
  return new Promise((resolve, reject)=>{
    wx.openSetting({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(reject)
      }
    })
  })
}

export const showToast = (params) => {
  return new Promise((resolve, reject)=>{
    wx.showToast(
      {
        ...params,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      }
    )
  })
}
export const showModal = (params) => {
  return new Promise((resolve, reject)=>{
    wx.showModal(
      {
        ...params,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      }
    )
  })
}

export const login = ()=>{
  return new Promise((resolve, reject) => {
    wx.login({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
