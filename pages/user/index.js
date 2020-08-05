
Page({
  data: {
    userInfo: {},
    collect: []
  },

  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo') || {};
    let collect = wx.getStorageSync('collect') || [];
    this.setData({
      userInfo,
      collect
    })
  },

  handleImgTap() {
    wx.navigateTo({
      url: '/pages/login/index'
    });
  }
})