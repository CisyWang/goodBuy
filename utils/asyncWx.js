export const getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const showModel = ({content}) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}

export const wxlogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}