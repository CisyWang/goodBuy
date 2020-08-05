
Page({
  data: {
    tabs: [
      {
        id: 0,
        name: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        name: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        name: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        name: '浏览足迹',
        isActive: false
      }
    ]
  },

  handleTabsItemChange(e) {
    const {index} = e.detail
    const {tabs} = this.data
    tabs.forEach((v,i) => {
      i === index ? v.isActive = true :v.isActive = false
    });
    this.setData({
      tabs
    })
  }
})