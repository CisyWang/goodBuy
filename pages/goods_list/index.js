import { request } from '../../request/index'
Page({
  data: {
    tabs: [
      {
        id: 0,
        name: '综合',
        isActive: true
      },
      {
        id: 1,
        name: '销量',
        isActive: false
      },
      {
        id: 2,
        name: '价格',
        isActive: false
      },
    ],
    goodsList:[]
  },

  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  totalList: 1,
  pagenum: 1,

  onLoad: function (options) {
    console.log(options)
    this.queryParams.cid = options.cid
    this.getGoodsList()
  },

  // 获取商品列表
  async getGoodsList() {
    const res = await request({url: '/goods/search',data: this.queryParams})     
    const goodsList= res.data.message.goods
    const totalList= res.data.message.total
    const pagenum= res.data.message.pagenum
    this.totalList = totalList
    this.pagenum = pagenum
    this.setData({
      goodsList: [...this.data.goodsList,...goodsList]
    })
    wx.stopPullDownRefresh()
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
  },

  // 滚动条触底事件 \
  // 判断是否还有数据，有则加载
  onReachBottom() {
    // 总页数
    const totalPage = Math.ceil(this.totalList / this.queryParams.pagesize)
    if (this.pagenum < totalPage) {
      this.queryParams.pagenum++
      this.getGoodsList()
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      });
    }
  },

  // 上拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList:[]
    })
    this.queryParams.pagenum = 1
    this.getGoodsList()
  }

})