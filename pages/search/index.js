import { request } from '../../request/index'
Page({
  data: {
    goods: [],
    isFocus: false,
    inputValue: ''
  },
  timeId: -1,

  handleInput(e) {
    // 获取输入框的值
    const {value} = e.detail
    // 检验合法性
    if (!value.trim()) {
      this.setData({
        goods:[],
        isFocus: false
      })
      return
    }
    this.setData({isFocus: true})
    // 发送请求 防抖动
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.searchGoods(value)
    },1000)
  },

  async searchGoods(query) {
    const res = await request({url:'/goods/search',data:{query}})
    this.setData({
      goods: res.data.message.goods
    })
  },

  handleCancel() {
    this.setData({
      goods: [],
      isFocus: false,
      inputValue: ""
    })
  }
})