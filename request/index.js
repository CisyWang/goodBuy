let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) =>{
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err)
      },
      complete:() => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          wx.hideLoading()
        }
      }
    });

  })
}