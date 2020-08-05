import { request } from "../../request/index";
Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,

    scrollTop: 0
  },
  Cates: [],
  
  onLoad: function(options){
    //  缓存  判断本地中是否存有数据
    //  没有数据，则发送请求
    //  有数据并且数据没有过期，则直接使用
    // 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates()
    } else {
      // 1 min 过期
      if (Date.now() - Cates.time > 1000 * 60) {
        this.getCates()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 获取所有商品分类数据
  async getCates() {
    const result = await request({url: '/categories'})
    this.Cates = result.data.message
    // 将数据存入本地存储中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    });
  // 左侧菜单栏
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })

  },

  handleItemTap(e) {
    const {index} = e.currentTarget.dataset
    // 根据左侧菜单栏的不同索引，渲染右侧数据
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
});
