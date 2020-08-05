// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: '全部',
        isActive: true
      },
      {
        id: 1,
        name: '待付款',
        isActive: false
      },
      {
        id: 2,
        name: '待收货',
        isActive: false
      },
      {
        id: 3,
        name: '退货/退款',
        isActive: false
      }
    ]

  },
  
  onShow() {
    // onshow 中没有 options 参数 要获取页面传过来的参数 用 getCurrentPage
    // 获取小程序页面栈数组   最多回溯10个页面、
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    const {type} = currentPage.options
    const index = type - 1
    this.changeTitleByIndex(index)
    this.getOrder(type)
  },

  // 根据 type 获取订单
  getOrder(type) {

  },

  // 点击 tab 切换 title
  handleTabsItemChange(e) {
    const {index} = e.detail
    this.changeTitleByIndex(index)
    this.getOrder(index + 1)
  },

  // 根据 index 和 type 决定激活的 title
  changeTitleByIndex(index) {
    const {tabs} = this.data
    tabs.forEach((v,i) => {
      i === index ? v.isActive = true :v.isActive = false
    });
    this.setData({
      tabs
    })
  }

})